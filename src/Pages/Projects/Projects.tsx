import './Projects.scss';
import { motion } from 'framer-motion'
const faceDetectImg = 'https://i0.wp.com/rankone.io/wp-content/uploads/2018/11/howfrworks.png?fit=1800%2C901&ssl=1'
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
            <h2>Face Detecter</h2>
            <a className='btn' href="https://face-detector-nine.vercel.app/" target='__blank'>Go to Side</a>
          </div>
        </div>

        <div className="card">
          <div className="card-img">
            <img src='https://i.ytimg.com/vi/St0_NAdazuQ/maxresdefault.jpg' alt="mini-app" />
          </div>
          <div className="card-info">
            <h2>Mini App</h2>
            <a className='btn' href='https://mini-platform.vercel.app/' target='__blank'>Go to Side</a>
          </div>
        </div>

        <div className="card">
          <div className="card-img">
            <img src='https://www.online-auksion.uz/uploads/lots/lot_336//images//TYrvgidbOyTVYDTZPWTbgBLRoXUAUdee2ORscpOX.jpg' alt="Test app" />
          </div>
          <div className="card-info">
            <h2>Test app</h2>
            <a className='btn' href='https://quize-appp.vercel.app/' target='__blank'>Go to Side</a>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default Projects