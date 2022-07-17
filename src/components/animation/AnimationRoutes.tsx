// React Router DOM
import { Route, Routes, useLocation } from 'react-router-dom'
// Imports
import MainPage from '../../Pages/main/MainPage'
import NotFound from '../../Pages/NotFound/NotFound'
import Projects from '../../Pages/Projects/Projects'
import Aboutme from '../../Pages/Aboutme/Aboutme'
// Framermotion
import { AnimatePresence } from 'framer-motion'

const AnimationRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainPage />} />
                <Route path='projects' element={<Projects />} />
                <Route path='/about-me' element={<Aboutme />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimationRoutes;