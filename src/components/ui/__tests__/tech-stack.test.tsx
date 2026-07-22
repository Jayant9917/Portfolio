import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TechStack } from '../tech-stack';
import { Technology } from '@/types/project';

// Mock the fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('TechStack', () => {
  const mockTechnologies: Technology[] = [
    { name: 'Next.js', category: 'frontend', icon: 'nextjs' },
    { name: 'TypeScript', category: 'frontend', icon: 'typescript' },
    { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwind' },
    { name: 'Node.js', category: 'backend', icon: 'nodejs' },
    { name: 'MongoDB', category: 'database', icon: 'mongodb' },
    { name: 'Figma', category: 'design', icon: 'figma' },
  ];

  it('renders without crashing', () => {
    render(<TechStack technologies={mockTechnologies} />);
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays all provided technologies', () => {
    render(<TechStack technologies={mockTechnologies} />);
    
    mockTechnologies.forEach(tech => {
      expect(screen.getByText(tech.name)).toBeInTheDocument();
    });
  });

  it('removes duplicate technologies', () => {
    const withDuplicates = [
      ...mockTechnologies,
      { name: 'Next.js', category: 'frontend' as const, icon: 'nextjs' },
      { name: 'TypeScript', category: 'frontend' as const, icon: 'typescript' },
    ];
    
    render(<TechStack technologies={withDuplicates} />);
    
    mockTechnologies.forEach(tech => {
      const elements = screen.getAllByText(tech.name);
      expect(elements).toHaveLength(1);
    });
  });

  it('handles empty technologies array', () => {
    const { container } = render(<TechStack technologies={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <TechStack technologies={mockTechnologies} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
