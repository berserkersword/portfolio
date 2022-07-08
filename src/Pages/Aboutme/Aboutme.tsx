import { motion } from 'framer-motion'
import React from 'react'

const Aboutme = () => {
  return (
    <motion.div
      className='main-page'
      initial={{ width: '100%' }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1, delay: 1.35 } }}
    >
      Aboutme
    </motion.div>
  )
}

export default Aboutme