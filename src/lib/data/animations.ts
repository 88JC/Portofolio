import { easeInOut, easeOut } from "framer-motion";

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut
    }
  }
};

export const hoverVariants = {
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      duration: 0.2,
      ease: easeInOut
    }
  }
}; 