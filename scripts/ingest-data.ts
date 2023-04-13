import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { pinecone } from '@/utils/pinecone-client';
import { RawDocumentLoader } from '@/utils/customDocumentLoader';
import { PINECONE_INDEX_NAME } from '@/config/pinecone';
import { STYLE_GUIDES } from '@/config/styleGuides';

const logger = console;

export const run = async () => {
  try {
    logger.debug('Loading documents...', STYLE_GUIDES);

    const rawDocs = await Promise.all(
      STYLE_GUIDES.map(async (styleGuide) => ({
        tag: styleGuide.tag,
        files: await Promise.all(
          styleGuide.files.map((file) => {
            const loader = new RawDocumentLoader(file);

            return loader.load().then((docs) => docs[0]);
          }),
        ),
      })),
    );

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 200,
    });

    const embeddings = new OpenAIEmbeddings();

    const index = pinecone.Index(PINECONE_INDEX_NAME);

    await Promise.all(rawDocs.map(async (doc) => {
      const { tag, files } = doc;

      logger.debug('Splitting documents... ', tag);

      const docs = await textSplitter.splitDocuments(files);

      logger.debug('Deleting old vectors... ', tag);

      await index.delete1({
        namespace: tag,
        deleteAll: true,
      });

      logger.debug('Creating embeddings... ', tag);

      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: tag,
        textKey: 'text',
      });
    }));
  } catch (error) {
    logger.error('error', error);

    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  logger.debug('ingestion complete');
})();
