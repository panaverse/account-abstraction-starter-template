import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Hero from '@/components/home/hero'
import React from 'react'

import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main >
      <Hero />
    </main>
  )
}
