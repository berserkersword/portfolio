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
      <div className="wrapper">

        <div className="card">
          <div className="card-img">
            <img src={faceDetectImg} alt="faceDetect" />
          </div>
          <div className="card-info">
            <h2>Currency</h2>
            <a className='btn' href="https://currency-mauve.vercel.app/" target='__blank'>Go to Side</a>
          </div>
        </div>

        <div className="card">
          <div className="card-img">
            <img src='https://aeroadmin.com/articles/en/wp-content/uploads/2020/11/search-engine-logo.png' alt="mini-app" />
          </div>
          <div className="card-info">
            <h2>Search Engine</h2>
            <a className='btn' href='https://search-engine-berserkersword.vercel.app/' target='__blank'>Go to Side</a>
          </div>
        </div>

        <div className="card">
          <div className="card-img">
            <img src='https://ui4free.com/storage/public/images/weather-icons-flat-outline-figma-icon-free_1632580967_thumb.jpg' alt="Test app" />
          </div>
          <div className="card-info">
            <h2>Weather App</h2>
            <a className='btn' href='https://berserker-weather.vercel.app/' target='__blank'>Go to Side</a>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default Projects
