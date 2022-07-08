import React from 'react'
import { motion } from 'framer-motion'
const Projects = () => {
  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1, delay: 1.35 } }}
    >
      Projects
    </motion.div>
  )
}

export default Projects