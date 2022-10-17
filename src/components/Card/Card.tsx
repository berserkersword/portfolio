import "./Card.scss"
import { useState } from 'react';
const Card = (props: { descr: string | undefined, img: string | undefined, name: string | undefined, src: string | undefined }) => {

  const [opened, setOpened] = useState(false)

  return (
    <li className="card">
      <img src={props.img} alt={props.name} />
      <h3><a href={props.src}>{props.name}</a></h3>
      <p>{props.descr?.slice(0, 60)}<span onClick={() => setOpened(!opened)}>{opened ? props.descr?.slice(60, props.descr.length) : '...'}</span></p>
    </li>
  )
}

export default Card