import type { MDXComponents } from 'mdx/types';
import { HTMLAttributes, ReactNode } from 'react';

interface MDXComponentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  href?: string;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }: MDXComponentProps) => <h1 className="text-4xl font-bold my-6" {...props}>{children}</h1>,
    h2: ({ children, ...props }: MDXComponentProps) => <h2 className="text-3xl font-bold my-5" {...props}>{children}</h2>,
    h3: ({ children, ...props }: MDXComponentProps) => <h3 className="text-2xl font-semibold my-4" {...props}>{children}</h3>,
    p: ({ children, ...props }: MDXComponentProps) => <p className="my-4 leading-relaxed" {...props}>{children}</p>,
    ul: ({ children, ...props }: MDXComponentProps) => <ul className="list-disc pl-6 my-4 space-y-2" {...props}>{children}</ul>,
    ol: ({ children, ...props }: MDXComponentProps) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>{children}</ol>,
    li: ({ children, ...props }: MDXComponentProps) => <li className="my-1" {...props}>{children}</li>,
    code: ({ children, className, ...props }: MDXComponentProps) => {
      if (className) {
        const language = className.replace('language-', '');
        return (
          <pre className="bg-primary dark:bg-secondary text-neutral-100 dark:text-neutral-900 p-4 rounded-lg overflow-x-auto my-6">
            <code className={`language-${language} text-sm`} {...props}>
              {children}
            </code>
          </pre>
        );
      }
      return <code className="bg-gray-800 px-2 py-1 rounded text-sm" {...props}>{children}</code>;
    },
    pre: ({ children, ...props }: MDXComponentProps) => <div {...props}>{children}</div>,
    a: ({ children, href, ...props }: MDXComponentProps) => (
      <a href={href} className="text-blue-400 hover:underline" {...props}>
        {children}
      </a>
    ),
    table: ({ children, ...props }: MDXComponentProps) => (
      <div className="my-6 overflow-x-auto" {...props}>
        <table className="min-w-full divide-y divide-gray-700">
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: MDXComponentProps) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: MDXComponentProps) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300" {...props}>
        {children}
      </td>
    ),
    ...components,
  };
}