"use client"
import { useEffect, useRef } from "react"
import {gsap} from 'gsap'

interface LoaderProps {
    onLoadingComplete: () => void
}

const Loader = ({onLoadingComplete}: LoaderProps) => {

    const loaderRef = useRef(null)
    const titleRef = useRef(null)
    const LetterRefs = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        const tl = gsap.timeline()
        const exitTl = gsap.timeline({paused: true})

        
    })

    const splitText = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} ref={el => {
                if(el) LetterRefs.current[index] = el
            }} className="inline-block">
                {char}
            </span>
        ))
    }        

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-white z-100 flex items-center justify-center overflow-hidden">
        <h1 ref={titleRef} className="text-black text-[10vw] font-bold tracking-wider">
            {splitText('StudioSize')}
        </h1>
    </div>
  )
}

export default Loader