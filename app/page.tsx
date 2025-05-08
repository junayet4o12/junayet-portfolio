"use client"

import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import ExperienceSection from "@/components/experience-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import LatestProjectsSection from "@/components/latest-projects-section"
import ServicesSection from "@/components/services-section"


export default function SyntheticV0PageForDeployment() {
  return <div className="relative">


    <Header />
    
    <div className="overflow-x-hidden relative">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <LatestProjectsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
     
    </div>
    {/* <ScrollTop /> */}
  </div>
}