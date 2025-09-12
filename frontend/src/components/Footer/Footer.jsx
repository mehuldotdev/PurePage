import React from 'react'
import { BlurFade } from '../magicui/blur-fade'

function Footer() {
  return (
    <footer className='fixed border-t-1 border-black flex items-center justify-center md:h-21 h-7 left-0 bottom-0 w-full bg-secondary'>
      <div>
        <BlurFade delay={1} direction='up'>
        <p>Made with ❤ by Mehul</p>
        </BlurFade>
      </div>
    </footer>
  )
}

export default Footer