import { motion } from 'framer-motion'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdSchool } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai'
import "./Aboutme.scss";
const Aboutme = () => {
  return (
    <motion.div
      className='about-me'
      initial={{ width: '100%' }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1, delay: 1.35 } }}
    >
      <VerticalTimeline lineColor='#222'>
        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='2010-2020'
          iconStyle={{ background: '#00ffff', color: '#fff' }}
          icon={<MdSchool />}
          textClassName='element'
        >
          <h3 className="vertical-timeline-element-title">
            My middle school in Navai State Uchkuduk city
          </h3>
          <p>
            I studied at the 20th school in Uchkuduk. I studied there with excellent grades.
            My teachers praised me a lot.
            After finishing school, I entered lyceum
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='2020-2022'
          iconStyle={{ background: '#222', color: '#fff' }}
          icon={<MdSchool />}
          textClassName='element'
        >
          <h3 className="vertical-timeline-element-title">
            My high school in Navai State mining and technical high school
          </h3>
          <p>
            Later, I continued my studies at the lyceum. There, too, my teachers praised me a lot. It was here that I delved deeper into programming
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='2020-2022'
          iconStyle={{ background: '#222', color: '#fff' }}
          icon={<AiFillGithub />}
          textClassName='element'
        >
          <h3 className="vertical-timeline-element-title">
            Github
          </h3>
          <p>
            I have several projects on github
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </motion.div>
  )
}

export default Aboutme