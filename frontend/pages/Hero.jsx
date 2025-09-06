import React from 'react'
import { BlurFade } from "../src/components/magicui/blur-fade"

function Home() {
  return (
    <section className="h-[80vh] w-full bg-secondary/50 flex items-center justify-center">
      <BlurFade delay={1.75} direction='up'>
      <img className='md:mt-64 mt-105 brightness-70 md:h-110 md:w-110 h-80 w-80' src="/book.svg" alt="Hero-image" />
      </BlurFade>
    </section>
  )
}

export default Home