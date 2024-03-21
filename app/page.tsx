
import React from 'react'
import HeroSection from "../components/site-homepage/HeroSection"
import Navbar from "../components/site-homepage/Navbar"
import AchievementsSection from "../components/site-homepage/AchievementsSection"
import AboutSection from '../components/site-homepage/AboutSection'
import ProjectsSection from '../components/site-homepage/ProjectsSection'
import EmailSection from "../components/site-homepage/EmailSection"
import Footer  from '../components/site-homepage/Footer'


export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col container mx-auto px-12 py-4">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  )
}
