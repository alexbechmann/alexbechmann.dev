/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.mdx" {
  // https://www.npmjs.com/package/mdx-loader
  let MDXComponent: React.ComponentType;
  export default MDXComponent;

  export const frontMatter: any;
  export const tableOfContents: any;
}
