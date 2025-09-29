import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>

    </>
  )
}
