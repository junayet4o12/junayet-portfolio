import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Languages,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import SectionTitle from "./section-title";
import { Badge } from "./ui/badge";
import SubtleGridBg from "./subtle-grid-bg";
import { FaWhatsapp } from "react-icons/fa6";
import ExperienceCounter from "./experience-counter";
import { Card, CardHeader, CardContent } from "./ui/card";

const dob = new Date("2003-07-09");
const today = new Date();
const age = today.getFullYear() - dob.getFullYear();
const hasBirthdayPassed =
  today.getMonth() > dob.getMonth() ||
  (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
const finalAge = hasBirthdayPassed ? age : age - 1;

const personalInfo = [
  {
    icon: <Calendar className="w-4 h-4" />,
    label: "Date of Birth",
    value: `July 09, 2003 (Age: ${finalAge})`,
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: "muhammadjunayetmaruf@gmail.com",
    link: "mailto:muhammadjunayetmaruf@gmail.com",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Contact",
    value: "+8801632884012",
  },
  { icon: <MapPin className="w-4 h-4" />, label: "Address", value: "Feni, Bangladesh" },
  { icon: <Globe className="w-4 h-4" />, label: "Nationality", value: "Bangladeshi" },
  {
    icon: <Languages className="w-4 h-4" />,
    label: "Languages",
    value: "Bangla (native), English",
  },
];

const socialLinks = [
  {
    href: "https://www.github.com/junayet4o12",
    icon: <Github className="size-4 md:size-5" />,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/junayet-alam/",
    icon: <Linkedin className="size-4 md:size-5" />,
    label: "LinkedIn",
  },
  {
    href: "https://wa.me/8801632884012",
    icon: <FaWhatsapp className="size-4 md:size-5" />,
    label: "WhatsApp",
  },
];

const skills = [
  "Node.js",
  "Express.js",
  "Prisma",
  "TypeScript",
  "Socket.io",
  "Stripe",
  "Next.js",
  "Tailwind",
  "JWT",
  "ZOD",
  "ShadCn"
];


export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-background via-background to-background/90 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <SubtleGridBg />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-40 left-[15%] w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-[20%] w-10 h-10 border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/3 right-[10%] w-6 h-6 bg-primary/20 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10 space-y-12">
        <SectionTitle
          title1="ABOUT ME"
          title2={{ active: " Who I Am", base: "Know" }}
          subtitle="Backend Developer focused on creating responsive and user-friendly web applications"
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side: Personal Info */}
          <div className="space-y-8">
            <Card className="border-border bg-background/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-bold">
                  <span className="text-primary">Personal</span> Information
                </h3>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    JA
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Junayet Alam</h4>
                    <p className="text-muted-foreground">Backend Developer</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {personalInfo.map(({ icon, label, value, link }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="mt-1 min-w-8 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        {link ? (
                          <a
                            href={link}
                            className="font-medium hover:text-primary transition-colors break-all"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="font-medium break-words">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="w-9 md:w-12 aspect-square bg-background border border-border hover:border-primary/60 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.icon}
                </Link>
              ))}
              <div className="h-8 w-px bg-border/70 mx-2"></div>
              <Button className="md:h-12">
                Contact Me
                <Mail className="md:ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Side: Biography & Skills */}
          <div className="space-y-8">
            <Card className="border-border bg-background/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-bold">
                  <span className="text-primary">My</span> Biography
                </h3>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  I am Junayet Alam, a Backend developer from Feni, Bangladesh.
                  Studied at Feni Polytechnic Institute (Computer Technology).
                  Currently working on SM Technology as a Node.js Backend
                  Developer (sometimes Full-stack).
                </p>
                <p>
                  Always in progress for increasing my Backend coding skills,
                  experience, and quality. My main focus is optimization,
                  reducing response time, and ensuring top-notch security.
                  Currently exploring PostgreSQL.
                </p>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <ExperienceCounter />
          </div>
        </div>
      </div>
    </section>
  );
}
