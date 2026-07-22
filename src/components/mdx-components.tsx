import type { MDXComponents } from 'mdx/types';
import React from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/ui/code-block';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return '';
}

function getHeadingId(children: React.ReactNode) {
  return getNodeText(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Define base components with proper types
const components: MDXComponents = {
  // Headers
  h1: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 id={id ?? getHeadingId(children)} className={cn('text-3xl font-bold mt-10 mb-6', className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id ?? getHeadingId(children)} className={cn('text-2xl font-bold mt-8 mb-4', className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id ?? getHeadingId(children)} className={cn('text-xl font-bold mt-6 mb-3', className)} {...props}>
      {children}
    </h3>
  ),
  
  // Text
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('text-base mb-4 leading-relaxed', className)} {...props} />
  ),
  
  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('list-disc pl-6 mb-6 space-y-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('list-decimal pl-6 mb-6 space-y-2', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mb-2', className)} {...props} />
  ),
  
  // Links
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('text-foreground underline decoration-current/30 underline-offset-3 hover:decoration-current', className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  
  // Code blocks
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlockCode = Boolean(className?.includes("language-"));

    if (isBlockCode) {
      return (
        <code className={cn("font-mono block", className)} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className={cn(
          "border-border bg-muted/50 text-foreground rounded border px-1.5 py-0.5 text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  
  pre: (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <CodeBlock {...props}>{props.children}</CodeBlock>
  ),
  
  // Blockquotes
  blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn('border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4', className)}
      {...props}
    />
  ),
  
  // Tables
  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto">
      <table
        className={cn('min-w-full divide-y divide-gray-300', className)}
        {...props}
      />
    </div>
  ),
  
  thead: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn('bg-gray-50 dark:bg-gray-800', className)} {...props} />
  ),
  
  tbody: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      className={cn('divide-y divide-gray-200 dark:divide-gray-700', className)}
      {...props}
    />
  ),
  
  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
        className
      )}
      {...props}
    />
  ),
  
  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn('px-6 py-4 whitespace-nowrap text-sm', className)}
      {...props}
    />
  ),
  
  // Images
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      className={`rounded-lg object-cover w-full h-96 my-6 ${props.className ?? ""}`}
      alt={props.alt || "Image"}
    />
  ),
  
  // Horizontal rule
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={cn('my-8 border-t border-gray-200 dark:border-gray-700', className)}
      {...props}
    />
  ),
};

// Export the components for direct usage
export { components };

// Export the hook for MDXRemote
export function useMDXComponents(providedComponents: MDXComponents = {}): MDXComponents {
  return {
    ...components,
    ...providedComponents,
  };
}

export default components;
