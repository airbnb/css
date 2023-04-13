import { readFile } from 'fs/promises';
import * as process from 'process';
import { Document } from 'langchain/document';
import { BaseDocumentLoader } from 'langchain/document_loaders';

export abstract class BufferLoader extends BaseDocumentLoader {
  constructor(public filePathOrBlob: string | Blob) {
    super();
  }

  protected abstract parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]>;

  public async load(): Promise<Document[]> {
    let buffer: Buffer;
    let metadata: Record<string, string>;

    if (typeof this.filePathOrBlob === 'string') {
      buffer = await readFile(this.filePathOrBlob);
      metadata = { source: this.filePathOrBlob };
    } else {
      buffer = await this.filePathOrBlob
        .arrayBuffer()
        .then((ab) => Buffer.from(ab));
      metadata = { source: 'blob', blobType: this.filePathOrBlob.type };
    }

    return this.parse(buffer, metadata);
  }
}

export class RawDocumentLoader extends BufferLoader {
  private readonly logger = console;

  public async parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]> {
    const parsed = raw.toString('utf-8');

    this.logger.debug(`Loaded ${metadata.source}`);

    // replace current directory with https://mate-academy.github.io/style-guides/
    const source = metadata.source
      .replace(process.cwd(), 'https://mate-academy.github.io/style-guides')
      .replace(/\.md$/, '.html');

    this.logger.debug(`Path changed to ${source}`);

    return [
      new Document({
        pageContent: parsed,
        metadata: {
          ...metadata,
          source,
        },
      }),
    ];
  }
}
