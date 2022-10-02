// Style
import "./Main.scss";
// Framer Motion
import { motion } from "framer-motion";
// React Icons
import { MdEmail } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
const Main = () => {
  return (
    <div className="main">
      <motion.h2
        initial={{ opacity: 0, transitionDuration: '1s' }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >I`m Ibragimov</motion.h2>
      <motion.h5
        initial={{ opacity: 0, transitionDuration: '1s' }}
        animate={{ opacity: 1, translateY: '-20px' }}
        exit={{ opacity: 0 }}
      >I`m Full Stack Developer with a passion for learning and creating </motion.h5>
      <div className="icons">
        <a href="lamjarred063@gmail.com"><MdEmail /></a>
        <a href="https://instagram.com/mr_gryu"><AiFillInstagram /></a>
        <a href="https://t.me/your_sempaiy"><BsTelegram /></a>
      </div>
    </div>
  )
}

export default Main