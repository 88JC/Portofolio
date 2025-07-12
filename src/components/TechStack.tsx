"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { techStack } from "@/lib/data/tech-stack";
import { itemVariants, hoverVariants } from "@/lib/data/animations";

export default function TechStack() {
  return (
    <>
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">TECH STACK & TOOLS</h3>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black/95 via-black/60 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black/95 via-black/60 to-transparent z-20 pointer-events-none"></div>
        <Marquee
          gradient={false}
          autoFill
          speed={35}
          direction="right"
          style={{ direction: 'initial' }}
          className="overflow-hidden"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="flex flex-col items-center group min-w-[80px] mx-4"
            >
              <motion.div
                variants={hoverVariants}
                className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3"
              >
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-contain transition-all duration-300 group-hover:filter group-hover:brightness-110 group-hover:grayscale"
                  draggable={false}
                />
              </motion.div>
              <span className="text-sm text-gray-300 text-center font-medium">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </Marquee>
       </div>
      </div>
    </>
  );
} 