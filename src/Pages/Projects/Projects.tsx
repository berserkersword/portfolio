import './Projects.scss';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ProjectsDataInterface } from '../../Model/Models';
import Card from '../../components/Card/Card';
const Projects = () => {
  const [data, setData] = useState<ProjectsDataInterface[]>([{
    id: "1235465465",
    name: "",
    src: '',
    img: '',
    descr: ''
  }])
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, 'projects'))
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getData()
  }, [])
  console.log(data);

  return (
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1, delay: 1.35 } }}
      className='projects'
    >
      <div className="wrapper grid ">
        {
          data.map(item => {
            return <Card name={item.name} img={item.img} src={item.src} descr={item.descr} />
          })
        }
      </div>

    </motion.div>
  )
}

export default Projects
