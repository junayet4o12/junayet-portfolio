
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import EducationSection from "@/components/education"
import ExperienceSection from "@/components/experience-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import LatestProjectsSection from "@/components/latest-projects-section"
import ServicesSection from "@/components/services-section"
import StatusHeader from "@/components/status-header"
import ThemeColorToggle from "@/components/theme-color-toggle"


export default function SyntheticV0PageForDeployment() {
  return <div className="relative">
    <ThemeColorToggle />
    <StatusHeader />
    <Header />

    <div className="overflow-x-hidden relative ">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <LatestProjectsSection />
      <EducationSection />
      <ServicesSection />
      <section id="contact" className="pt-24">
        <ContactSection />
        <Footer />
      </section>

    </div>
  </div>
}