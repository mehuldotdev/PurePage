import React from 'react'
import { BlurFade } from "../src/components/magicui/blur-fade"

function Home() {
  return (
<section className="min-h-[100vh] w-full bg-secondary/50 flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 px-4 py-16 md:py-32">
  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12 lg:gap-30 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left">
    <BlurFade delay={0.5} direction="up"><p>Discover</p></BlurFade>
    <BlurFade delay={0.5} direction="up"><p>Collect</p></BlurFade>
    <BlurFade delay={0.5} direction="up"><p>Enjoy</p></BlurFade>
  </div>

  <BlurFade delay={0.75} direction="up">
    <img
      className="brightness-70 h-60 w-60 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem]"
      src="/book.svg"
      alt="Hero-image"
    />
  </BlurFade>
</section>
  )
}

export default Home