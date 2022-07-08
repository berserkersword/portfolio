import React from 'react'
import { motion } from 'framer-motion'
const NotFound = () => {
  return (
    <motion.div
      initial={{ width: '100vw' }}
      animate={{ width: "100vw" }}
      exit={{ x: window.innerWidth, transition: { delay: 1.35 } }}
    >
      404
    </motion.div>
  )
}

export default NotFound