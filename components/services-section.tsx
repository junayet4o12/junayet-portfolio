import {  Code2, UsersRound, Workflow } from 'lucide-react';
import SectionTitle from "./section-title";
import SubtleGridBg from "./subtle-grid-bg";

export default function ServicesSection() {
  return (
    <section
      id="expertise"
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
            base: 'MY ROLE &',
            active: 'EXPERTISE'
          }}
          subtitle="Currently working as a developer focused on building efficient, scalable, and clean web applications. Always exploring new technologies and improving both frontend and backend performance."
        />

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <ExpertiseCard
            icon={<Code2 className="h-10 w-10" />}
            title="BACKEND/FULL-STACK DEVELOPMENT"
            description="Designing and developing full-stack web apps using Next.js, Node.js, Express, Prisma and MongoDB with a focus on clean code and performance optimization."
          />

          <ExpertiseCard
            icon={<Workflow className="h-10 w-10" />}
            title="CLEAN WORKFLOW & BEST PRACTICES"
            description="Following industry-standard practices such as version control, modular structure, API validation, and efficient collaboration using Git and CI/CD."
            featured={true}
          />

          <ExpertiseCard
            icon={<UsersRound className="h-10 w-10" />}
            title="TEAM COLLABORATION & PROJECT EXECUTION"
            description="Collaborating with teammates on large-scale MERN projects, handling both frontend and backend roles, deployment, and code review responsibilities."
          />
        </div>
      </div>
    </section>
  );
}

interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

function ExpertiseCard({ icon, title, description, featured = false }: ExpertiseCardProps) {
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

        {/* Icon */}
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

        <p className="text-muted-foreground  text-sm leading-relaxed">
          {description}
        </p>

        {/* Action link */}
        {/* <div className="inline-flex items-center text-sm font-medium text-primary">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </div> */}

        {/* Featured indicator */}
        {featured && (
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>
        )}
      </div>

      {/* Bottom glow effect */}
      {featured && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary/30 rounded-full blur-md"></div>
      )}
    </div>
  );
}
