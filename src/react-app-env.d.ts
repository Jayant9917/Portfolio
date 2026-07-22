/// <reference types="react-scripts" />

// This file is needed for TypeScript to recognize JSX in .tsx files
declare namespace JSX {
  type ElementType = React.JSXElementConstructor<unknown> | keyof JSX.IntrinsicElements;
  
  interface IntrinsicElements {
    [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
