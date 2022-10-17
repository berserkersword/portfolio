import './Projects.scss';
import { motion } from 'framer-motion'
const faceDetectImg = 'https://previews.123rf.com/images/bankoo/bankoo1512/bankoo151200022/50201524-currency-exchange-rate-on-digital-led-display-board.jpg'
const Projects = () => {
  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1, delay: 1.35 } }}
      className='projects'
    >
      <div className="wrapper grid">

      </div>

    </motion.div>
  )
}

export default Projects
