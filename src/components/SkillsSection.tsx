import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  description: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

const defaultCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        level: 90,
        description:
          "Advanced knowledge of React, including hooks, context API, and performance optimization.",
      },
      {
        name: "TypeScript",
        level: 85,
        description:
          "Strong typing skills with TypeScript for building robust applications.",
      },
      {
        name: "CSS/SCSS",
        level: 80,
        description:
          "Proficient in creating responsive layouts and animations with CSS and SCSS.",
      },
      {
        name: "Next.js",
        level: 75,
        description:
          "Experience with server-side rendering and static site generation.",
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        level: 85,
        description:
          "Building RESTful APIs and microservices with Express and Node.js.",
      },
      {
        name: "PostgreSQL",
        level: 75,
        description: "Database design, optimization, and query writing.",
      },
      {
        name: "GraphQL",
        level: 70,
        description: "Schema design and implementation with Apollo Server.",
      },
      {
        name: "AWS",
        level: 65,
        description: "Experience with S3, Lambda, EC2, and other AWS services.",
      },
    ],
  },
  {
    name: "Design",
    skills: [
      {
        name: "Figma",
        level: 80,
        description: "UI/UX design, prototyping, and collaboration.",
      },
      {
        name: "Adobe XD",
        level: 70,
        description: "Creating wireframes and interactive prototypes.",
      },
      {
        name: "Photoshop",
        level: 65,
        description: "Image editing and manipulation for web assets.",
      },
      {
        name: "Illustrator",
        level: 60,
        description: "Vector graphics and icon creation.",
      },
    ],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories = defaultCategories,
}) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My Skills
        </h2>

        <Tabs defaultValue={categories[0].name} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium">{skill.name}</h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-muted-foreground hover:text-foreground transition-colors">
                                  <Info size={16} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>{skill.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Proficiency</span>
                            <span>{skill.level}%</span>
                          </div>
                          <Progress
                            value={skill.level}
                            className="h-2"
                            // Animate the progress bar filling up
                            style={{
                              transition: "transform 1s ease-in-out",
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
