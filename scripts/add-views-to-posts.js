const fs = require('fs');
const path = require('path');

const postsDir = path.join(process.cwd(), 'src/content/posts');

// Read all MDX files in the posts directory
const postFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));

postFiles.forEach(file => {
  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file already has a views field
  if (!content.includes('views:')) {
    // Add views field right before the closing --- of the frontmatter
    content = content.replace(/^---\n([\s\S]*?)^---/m, (match, frontmatter) => {
      // Add views: 0 before the closing ---
      return `---\n${frontmatter.trim()}\nviews: 0\n---`;
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} with views field`);
  } else {
    console.log(`${file} already has views field`);
  }
});

console.log('All blog posts have been processed!');
