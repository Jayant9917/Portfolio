import { Technology } from "@/types/project";

type TechCategory = Technology['category'];

/**
 * Gets the category for a technology based on its name
 */
const getTechCategory = (name: string): TechCategory => {
  const normalized = name.toLowerCase();
  
  // Frontend technologies
  if (['react', 'next', 'gatsby', 'svelte', 'vue', 'angular', 'sveltekit', 'remix', 'astro'].some(tech => normalized.includes(tech))) {
    return 'frontend';
  }
  
  // Backend technologies
  if (['node', 'express', 'nest', 'fastify', 'django', 'flask', 'laravel', 'spring', 'dotnet', 'aspnet'].some(tech => normalized.includes(tech))) {
    return 'backend';
  }
  
  // Database technologies
  if (['mongo', 'postgres', 'mysql', 'sqlite', 'redis', 'prisma', 'typeorm', 'sequelize'].some(tech => normalized.includes(tech))) {
    return 'database';
  }
  
  // DevOps technologies
  if (['docker', 'kubernetes', 'github', 'gitlab', 'jenkins', 'aws', 'azure', 'gcp', 'vercel', 'netlify'].some(tech => normalized.includes(tech))) {
    return 'devops';
  }
  
  // Design tools
  if (['figma', 'sketch', 'adobe', 'xd', 'framer', 'webflow'].some(tech => normalized.includes(tech))) {
    return 'design';
  }
  
  return 'other';
};

/**
 * Validates and normalizes an array of technologies
 */
export const validateTechnologies = (technologies: (string | Technology)[]): Technology[] => {
  const techMap = new Map<string, Technology>();
  
  technologies.forEach(tech => {
    if (!tech) return;
    
    if (typeof tech === 'string') {
      const normalized = tech.trim();
      if (!normalized) return;
      
      const category = getTechCategory(normalized);
      techMap.set(normalized.toLowerCase(), {
        name: normalized,
        category,
        icon: normalized.toLowerCase()
      });
    } else {
      // Ensure the technology has all required fields
      const normalizedName = tech.name.trim();
      if (!normalizedName) return;
      
      techMap.set(normalizedName.toLowerCase(), {
        name: normalizedName,
        category: tech.category || getTechCategory(normalizedName),
        icon: tech.icon || normalizedName.toLowerCase()
      });
    }
  });
  
  return Array.from(techMap.values());
};

/**
 * Extracts technologies from a GitHub repository's package.json
 */
export const extractTechFromGitHub = async (githubUrl: string): Promise<Technology[]> => {
  try {
    const repoUrl = new URL(githubUrl);
    if (repoUrl.hostname !== 'github.com') return [];
    
    const packageJsonUrl = `https://raw.githubusercontent.com${repoUrl.pathname}/main/package.json`;
    const response = await fetch(packageJsonUrl);
    
    if (!response.ok) return [];
    
    const packageJson = await response.json();
    const dependencies = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {})
    };
    
    return validateTechnologies(Object.keys(dependencies));
  } catch (error) {
    console.error('Error extracting technologies from GitHub:', error);
    return [];
  }
};
