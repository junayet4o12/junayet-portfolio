import { ArrowRight, Code2, UsersRound, Workflow } from 'lucide-react';
import SectionTitle from "./section-title";
import SubtleGridBg from "./subtle-grid-bg";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-br from-background via-background/95 to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <SubtleGridBg />

       
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 space-y-16">
        <SectionTitle
          title1="WHAT I DO"
          title2={{
            base: 'MY SERVICES &',
            active: 'EXPERTISE'
          }}
          subtitle="I specialize in building modern web applications with clean code, scalable architecture, 
            and elegant UI using the MERN stack and Tailwind."
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Code2 className="h-10 w-10" />}
            title="MERN STACK DEVELOPMENT"
            description="Modern full-stack apps using MongoDB, Express, React, and Node.js with clean code, REST APIs, and secure architecture."
          />

          <ServiceCard
            icon={<Workflow className="h-10 w-10" />}
            title="INDUSTRY-STANDARD WORKFLOW"
            description="Using professional workflows including branching strategies, pull requests, code reviews, and modular design for maintainability."
            featured={true}
          />

          <ServiceCard
            icon={<UsersRound className="h-10 w-10" />}
            title="TEAM-BASED MERN PROJECTS"
            description="Built scalable MERN apps with teammates, managing roles like frontend/backend, deployment, and API design collaboratively."
          />
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

function ServiceCard({ icon, title, description, featured = false }: ServiceCardProps) {
  return (
    <div className="relative">
      <div
        className={`
        relative h-full overflow-hidden rounded-2xl p-8 border 
        ${featured
          ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'
          : 'bg-background border-border'}
      `}
      >
        {/* Background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0"></div>

        {/* Service icon */}
        <div
          className={`
          mb-6 w-16 h-16 rounded-full flex items-center justify-center
          ${featured ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}
        `}
        >
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-4 tracking-tight text-foreground">
          {title}
        </h3>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          {description}
        </p>

        {/* Action link */}
        <div className="inline-flex items-center text-sm font-medium text-primary">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>

        {/* Featured indicator */}
        {featured && (
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>
        )}
      </div>

      {/* Bottom glow effect for featured card */}
      {featured && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary/30 rounded-full blur-md"></div>
      )}
    </div>
  );
}
