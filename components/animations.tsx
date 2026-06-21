import { motion } from "framer-motion";
import {useEffect,useState} from "react";


export function AnimatedText({ text }: { text: string }) {
  return (
    <motion.div style={{ display: "flex", overflow: "hidden" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}



export function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}<motion.span animate={{ opacity: [1,0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span></span>;
}