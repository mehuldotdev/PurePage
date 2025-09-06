import React from 'react'
import { BlurFade } from "../src/components/magicui/blur-fade"

function Home() {
  return (
<section className="h-[80vh] w-full bg-secondary/50 flex flex-col items-center justify-center gap-16 pt-32">
  <div className="flex items-center gap-30 font-bold text-6xl">
    <BlurFade delay={2.25} direction="up"><p>Discover</p></BlurFade>
    <BlurFade delay={2.50} direction="up"><p>Collect</p></BlurFade>
    <BlurFade delay={2.75} direction="up"><p>Enjoy</p></BlurFade>
  </div>

  <BlurFade delay={3} direction="up">
    <img
      className="brightness-70 md:h-[28rem] md:w-[28rem] h-80 w-80"
      src="/book.svg"
      alt="Hero-image"
    />
  </BlurFade>
</section>

  )
}

export default Home