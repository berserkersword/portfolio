"use client"
import {motion} from "framer-motion"

// components
import Slider from "@/components/slider"
import { Chroma } from "@/components/chroma"
import IconsMarquee from "@/components/IconMarquee"

// icons
import {AiOutlineInstagram} from "react-icons/ai"
import { MapPinIcon } from "@heroicons/react/24/outline"
import {BiLogoTelegram} from "react-icons/bi"

export default function Home(){
    const marqueeIcons = [
        {
            src: "https://img.icons8.com/ios-filled/128/000000/adobe-audition.png",
            alt: "Adobe Audition",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/adobe-after-effects.png",
            alt: "Adobe After Effects",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/adobe-premiere-pro.png",
            alt: "Adobe Premiere Pro",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/adobe-lightroom.png",
            alt: "Adobe Lightroom",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/adobe-photoshop.png",
            alt: "Adobe Photoshop",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/davinci-resolve.png",
            alt: "DaVinci Resolve",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/figma.png",
            alt: "Figma",
        },
        {
            src: "https://img.icons8.com/ios-filled/128/000000/blender-3d.png",
            alt: "Blender",
        },
];
    const images =[
        {id: 1, src: '/images/1.png'},
        {id: 2, src: '/images/2.png'},
        {id: 3, src: '/images/3.jpg'},
    ]

    return (
        <div className="w-full min-h-[100vh] lg:p-20 md:p-5">

            {/* Main page content */}
            <div>
                <div className="flex flex-col justify-center gap-6 mb-20">
                    <motion.h1
                        initial={{ opacity: 0.3, filter: "blur(10px)",}}
                        animate={{ opacity: 1, filter: "blur(0px)",}}
                        transition={{ delay:0.5,duration: 1, ease: "easeInOut" }}
                        className="text-4xl font-bold code text-neutral-100">
                            <Chroma>
                                Every frame is a decision.
                            </Chroma>
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0.3, filter: "blur(10px)",}}
                        animate={{ opacity: 1, filter: "blur(0px)",}}
                        transition={{ delay:0.7,duration: 1, ease: "easeInOut" }}
                        className="text-4xl font-bold code text-neutral-100"> 
                        <Chroma>
                        Every cut is a belief.
                        </Chroma>
                    </motion.h1>
                </div>
                <div className="bottom-0 flex gap-4">
                    <motion.div
                        initial={{ opacity: 0.3, filter: "blur(10px)",}}
                        animate={{ opacity: 1, filter: "blur(0px)",}}
                        transition={{ delay:0.9,duration: 1, ease: "easeInOut" }}
                    >
                        <MapPinIcon className="w-6 h-6 text-neutral-100"/>
                    </motion.div>
                    <motion.span 
                        initial={{ opacity: 0.3, filter: "blur(10px)",}}
                        animate={{ opacity: 1, filter: "blur(0px)",}}
                        transition={{ delay:1,duration: 1, ease: "easeInOut" }}
                        className="text-neutral-200 minicode"
                    >
                        <Chroma>
                        Tashken, Uzbekistan
                        </Chroma>
                    </motion.span>
                </div>
            </div>

            {/* slider content */}
            <div className="max-h-[100vh] md:my-20 my-40">
                <Slider images={images} />
            </div>


            {/* Marquee content */}
            <div>
                <IconsMarquee  icons={marqueeIcons} />
            </div>

            <div className="w-full align-middle flex justify-center mt-20">
                <div className="flex justify-center align-middle gap-4 m-20">
                    <a
                        className="flex"
                        href="https://www.instagram.com/islom.filmic/" target="_blank" rel="noopener noreferrer"
                    >
                        <AiOutlineInstagram className="w-6 h-6 text-neutral-100"/>
                        <span className="code text-neutral-200 ml-2">Instagram</span>
                    </a>
                    <hr className="my-4 border-neutral-700 min-w-[100px]" />
                    <a
                        className="flex"
                        href="https://t.me/who_islom" target="_blank" rel="noopener noreferrer"
                    >
                        <BiLogoTelegram className="w-6 h-6 text-neutral-100"/>
                        <span className="code text-neutral-200 ml-2">Telegram</span>
                    </a>
                </div>
            </div>
        </div>
    )

}