import * as path from 'path';
import * as process from 'process';

export interface StyleGuide {
  tag: string;
  files: string[];
}

export const STYLE_GUIDES: StyleGuide[] = [
  {
    tag: 'javascript-style-guides',
    files: [
      path.join(process.cwd(), 'javascript.md'),
    ],
  },
  {
    tag: 'html-css-style-guides',
    files: [
      path.join(process.cwd(), 'htmlcss.md'),
    ],
  },
  {
    tag: 'java-style-guides',
    files: [
      path.join(process.cwd(), 'java.md'),
    ],
  },
];
