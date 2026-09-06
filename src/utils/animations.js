export const EASE = [0.22, 1, 0.36, 1];

export const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.85, ease: EASE }
  }
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } }
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } }
};
