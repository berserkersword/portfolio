import { Link } from "react-router-dom"
import Hamburger from 'hamburger-react'
import { useState } from "react"
import "./Navbar.scss"

const Navbar = () => {

  const [shake, setShake] = useState(false)
  const [hamburger, setHamburger] = useState(false)

  const clickHandler = () => {

    setShake(true);

    setTimeout(() => setShake(false), 2000)
    setHamburger(false)
  }
  return (
    <div className="navbar">
      <div className="hamburger">
        <Hamburger toggled={hamburger} toggle={setHamburger} />
      </div>
      <ul className={hamburger ? "opened-hamburger" : ""}>

        <li><Link className={`navbar-link ${shake ? 'animation' : 'closed'}`} onClick={clickHandler} to="/"><div><span /><span /></div>Main</Link></li>
        <li><Link className={`navbar-link ${shake ? 'animation' : 'closed'}`} onClick={clickHandler} to="/projects"><div><span /><span /></div>Projects</Link></li>
        <li><Link className={`navbar-link ${shake ? 'animation' : 'closed'}`} onClick={clickHandler} to="/about-me"><div><span /><span /></div>About me</Link></li>
      </ul>
    </div>
  )
}

export default Navbar