"use client";
import React, { useState, useRef } from "react";
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "General Santos Business Park",
    description: "General Santos Business Park is a 5.5-hectare mixed-use development located in the heart of General Santos City.",
    image : "/images/projects/gsbp.webp",
    tag: ["All", "Rentals"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "RD City",
    description: "RD City is a 5.5-hectare mixed-use development located in the heart of General Santos City.",
    image: "/images/projects/rdcity.webp",
    tag: ["All", "Rentals"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "RD Plaza",
    description: "RD Plaza is a 5.5-hectare mixed-use development located in the heart of General Santos City.",
    image: "/images/projects/bee.webp",
    tag: ["All", "Rentals"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Norfolk Pine",
    description: "Norfolk Pine is a 5.5-hectare mixed-use development located in the heart of General Santos City.",
    image: "/images/projects/norfolk.webp",
    tag: ["All", "For Sale"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Ephessians Building",
    description: "Ephessians Building is a 5.5-hectare mixed-use development located in the heart of General Santos City.",
    image: "/images/projects/native.webp",
    tag: ["All", "For Sale"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Corinthians Building",
    description: "Corinthians Building is a 5.5-hectare mixed-use development located in the heart of General Santos City.",
    image: "/images/projects/bee.webp",
    tag: ["All", "For Sale"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection:React.FC = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold dark:text-white light:text-black mt-4 mb-8 md:mb-12">
        Our Properties
      </h2>
      <div className="dark:text-white light:text-black flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Rentals"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="For Sale"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="dark:text-white light:text-black grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
