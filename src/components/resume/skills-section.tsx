'use client';

import { motion } from 'framer-motion';

type SkillItemProps = {
  skill: string;
  index: number;
};

const SkillItem = ({ skill, index }: SkillItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
  >
    <span className="text-gray-700 dark:text-gray-200">{skill}</span>
  </motion.div>
);

export function SkillsSection() {
  const skills = [
    'React.js', 
    'Next.js', 
    'TypeScript', 
    'Node.js', 
    'MongoDB', 
    'Tailwind CSS',
    'REST APIs', 
    'Git', 
    'Docker', 
    'AWS', 
    'GraphQL', 
    'Redux'
  ];

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Key Skills & Expertise
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <SkillItem key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
