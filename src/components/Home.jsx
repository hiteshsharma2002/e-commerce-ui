import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import Footer2 from './Footer2'

export default function Home() {
  
  return (
      <div>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
      <Footer2></Footer2>


    </div>
  )
}
