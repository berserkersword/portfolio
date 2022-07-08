// Framer motion
import { motion } from 'framer-motion';
// Components
import Footer from '../../components/footer/Footer';
import Main from '../../components/main/Main';
// assets
import "./Main.scss";

const MainPage = () => {

  return (
    <motion.div
      className='main-page'
      initial={{ width: '100%' }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: .6, delay: 1.35 } }}
    >
      <Main />
      <section>
        <div className="wrapper">
          <h1>Scills</h1>
          <div className="front">
            <h2 className="scill-name">front end</h2>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React js</li>
              <li> Vue js</li>
              <li>Angular</li>
              <li>Bootstrap</li>
              <li>Material UI</li>
            </ul>
          </div>
          <div className="back">
            <h2 className="scill-name">Back end</h2>
            <ul>
              <li>express</li>
              <li>Django</li>
            </ul>
          </div>
          <div className="databs">
            <h2 className="scill-name">Data base</h2>
            <ul>
              <li>Mysql</li>
              <li>Postgresql</li>
              <li>Mongodb</li>
              <li>Firebase</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  )
}

export default MainPage