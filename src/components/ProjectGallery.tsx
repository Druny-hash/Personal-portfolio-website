import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

interface ProjectGalleryProps {
  projects?: Project[];
}

const ProjectGallery = ({ projects = [] }: ProjectGalleryProps) => {
  // Default projects if none are provided
  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-featured online shopping platform with cart, checkout, and payment integration.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: "2",
      title: "Mobile Fitness App",
      description:
        "A fitness tracking application with workout plans, progress tracking, and social features.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      category: "Mobile Development",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      id: "3",
      title: "Data Visualization Dashboard",
      description:
        "Interactive dashboard for visualizing complex datasets with filtering and export capabilities.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Data Visualization",
      technologies: ["D3.js", "React", "TypeScript", "Node.js"],
    },
    {
      id: "4",
      title: "AI Content Generator",
      description:
        "An AI-powered tool that generates marketing content based on user inputs and preferences.",
      image:
        "https://images.unsplash.com/photo-1677442135136-760c813028c4?w=800&q=80",
      category: "AI/ML",
      technologies: ["Python", "TensorFlow", "OpenAI API", "React"],
    },
    {
      id: "5",
      title: "Portfolio Website",
      description:
        "A responsive portfolio website showcasing projects and skills with interactive elements.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      category: "Web Development",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "6",
      title: "Blockchain Wallet",
      description:
        "A secure cryptocurrency wallet with transaction history and multi-currency support.",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
      category: "Blockchain",
      technologies: ["Solidity", "Web3.js", "React", "Ethers.js"],
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  // Get unique categories from projects
  const categories = [
    "All",
    ...new Set(displayProjects.map((project) => project.category)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on selected category and search query
  const filteredProjects = displayProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of projects spanning various technologies and
            domains. Each project represents a unique challenge and solution.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;
