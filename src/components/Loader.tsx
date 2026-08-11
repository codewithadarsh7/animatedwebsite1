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

        if(titleRef.current && loaderRef.current) {
            tl.fromTo(loaderRef.current,
                {opacity: 0},
                {opacity: 1, duration: 0.9, ease: "power2.inOut"}
            )

            tl.from(LetterRefs.current,{
                opacity: 1,
                scale: 0,
                y: 20,
                stagger: 0.05,
                duration: .8,
                ease: 'back.out(1.7)'
            })

            tl.to(LetterRefs.current,{
                scale: 1.1,
                duration: 0.9,
                ease: "power1.inOut",
                stagger: {
                    each: 0.05,
                    repeat: -1,
                    yoyo: true
                }
            }, '-=0.5')

            exitTl.to(LetterRefs.current,{
                scale: 2.4,
                opacity: 0,
                duration: 1.6,
                stagger: 0.09,
                ease: "back.in(2.7)",
            })
            .to(loaderRef.current,{
                yPercent: -100,
                duration: 1.6,
                ease: 'power2.inOut',
                onComplete: onLoadingComplete
            }, '-=0.4')
        }

        gsap.delayedCall(4, () => exitTl.play())

        return () => {
            tl.kill()
            exitTl.kill()
        }
    }, [onLoadingComplete])

    const splitText = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} 
                ref={el => {
                    if(el) LetterRefs.current[index] = el
                }} 
                className="inline-block"
            >
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