"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects as defaultProjects } from '@/constants/projects';
import { Project } from '@/types/project';
import { SectionHeading } from "./section-heading";

interface ProjectsProps {
  projects?: Project[];
  showHeader?: boolean;
  showViewAll?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeInOut"
      }}
      className="group relative mb-4 overflow-hidden rounded-2xl"
    >
      <Link href={project.link} className="block w-full h-full">
        <div className="relative w-full h-full group overflow-hidden rounded-2xl">
          <motion.div
            className="w-full h-full"
            initial={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
            whileHover={{
              filter: "blur(30px) brightness(0.3)",
              opacity: 0.2,
              transition: { 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            <div className={`relative w-full h-full ${isLoading ? 'bg-gray-200 dark:bg-gray-800 animate-pulse' : ''} rounded-2xl`}>
              <Image 
                src={project.src} 
                alt={project.title} 
                width={500} 
                height={500}
                priority={index < 2}
                onLoad={() => setIsLoading(false)}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 rounded-2xl border-1 border-neutral-200 dark:border-neutral-800 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>
          </motion.div>
          <div className="absolute inset-0 flex bg-primary flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-2"
            >
              <motion.h2 
                className="text-white text-2xl font-medium tracking-tight"
                initial={{ x: -10 }}
                whileInView={{ x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {project.title}
              </motion.h2>
              <motion.div 
                className="w-12 h-0.5 bg-white/30 mb-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <motion.p 
                className="text-gray-300/90 text-sm leading-relaxed max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {project.description}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const Projects = ({ 
  projects = defaultProjects, 
  showHeader = false,
  showViewAll = false
}: ProjectsProps) => {
  return (
    <div className='py-10'>
      {showHeader && (
        <>
          <h4 className='text-primary dark:text-white/90 font-bold text-2xl'>Selected Work</h4>
          <SectionHeading delay={0.2}>
            Selected projects that show how I think about product engineering, AI systems, and useful interfaces.
          </SectionHeading>
        </>
      )}
      
      <div className='grid grid-cols-1 md:grid-cols-2 py-4 gap-4 mt-4'>
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>
      
      {showViewAll && (
        <div className="mt-6 flex justify-center">
          <Link
            href="/projects"
            className="text-secondary inline-flex items-center text-sm font-medium hover:underline"
          >
            <span className="hidden sm:inline">View all projects</span>
            <span className="sm:hidden">View all</span>
            <span className="ml-1">→</span>
          </Link>
        </div>
      )}
    </div>
  );
};
