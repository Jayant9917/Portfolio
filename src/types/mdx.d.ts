declare module '*.mdx' {
  import { MDXProps } from 'mdx/types';
  
  interface Frontmatter {
    title: string;
    description: string;
    date: string;
    author?: string;
    category?: string;
    readTime?: string;
    tags?: string[];
  }

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export const frontmatter: Frontmatter;
  export default MDXComponent;
}

declare module '@content/posts/*.mdx' {
  import { MDXProps } from 'mdx/types';
  
  interface Frontmatter {
    title: string;
    description: string;
    date: string;
    author?: string;
    category?: string;
    readTime?: string;
    tags?: string[];
  }

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export const frontmatter: Frontmatter;
  export default MDXComponent;
}
