import { Facebook, Github, Linkedin } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { Button } from './ui/button';
const dob = new Date("2003-07-09");
const today = new Date();
const age = today.getFullYear() - dob.getFullYear();
const hasBirthdayPassed =
  today.getMonth() > dob.getMonth() ||
  (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
const finalAge = hasBirthdayPassed ? age : age - 1;
const personalInfo = [
  { label: "Name", value: "Junayet Alam" },
  { label: "Date of Birth", value: `July 09, 2003 (Age: ${finalAge})` },
  { label: "Email", value: "muhammadjunayetmaruf@gmail.com", link: "mailto:muhammadjunayetmaruf@gmail.com" },
  { label: "Contact", value: "+8801632884012" },
  { label: "Address", value: "Feni, Bangladesh" },
  { label: "Nationality", value: "Bangladeshi" },
  { label: "Languages", value: "Bangla (native), English" },
  { label: "Profession", value: "MERN Stack Developer" },
];
export default function AboutSection() {
  return (
    <section id="about" className="text-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="relative w-full hidden md:block">
            <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
              <defs>
                <clipPath id="naymur1" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.116539 0.187984 L0.782476 0.013042 C0.855312 -0.009762 0.940747 -0.005957 0.970812 0.051068 C0.993884 0.094828 1.002030 0.135712 0.970812 0.188931 L0.771031 0.487477 L0.909421 0.564491 C0.978095 0.601593 1.006090 0.643428 0.998905 0.703327 C0.991033 0.768954 0.961446 0.793652 0.871961 0.820274 L0.220591 0.987611 C0.111335 1.012330 0.047614 0.998323 0.024972 0.960967 C-0.005404 0.910850 -0.013316 0.889933 0.031215 0.815520 L0.097809 0.721370 L0.240362 0.512197 L0.116539 0.440889 C0.050985 0.405713 0.035263 0.383845 0.015608 0.339155 C-0.001042 0.301299 0.022891 0.214605 0.116539 0.187984 Z"
                    fill="black"
                  />
                </clipPath>
              </defs>
            </svg>

            <figure style={{ clipPath: 'url(#naymur1)' }} className="">
              <Image
                src="/about.jpg"
                width={800}
                height={600}
                unoptimized
                alt="Description"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-6 md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight uppercase">
              About <span className="text-primary">Me</span>
            </h2>

            {/* Personal Info */}
            <div className="space-y-1 text-muted-foreground">
              {personalInfo.map(({ label, value, link }) => (
                <div key={label} className='flex'>
                  <p className='font-bold w-28 flex justify-between mr-2'><span>{label}</span>:</p>{" "}
                  {link ? (
                    <a href={link} className="text-primary" target="_blank" rel="noreferrer">{value}</a>
                  ) : (
                    value
                  )}
                </div>
              ))}
            </div>

            {/* Summary */}
            <p className="text-muted-foreground">
              I’m a MERN Developer with expertise in MERN-Stack Technology. I’ve completed 1 team project and 6+ personal projects based on the MERN stack. My specialty and interest lie in building functionality in both the Front-End and Back-End to maximize user-friendliness. I enjoy challenges and am eager to contribute my skills to a dynamic team.
            </p>
            {/* Links */}
            <div className="flex items-center gap-4 text-muted-foreground pt-2">
              <Link
                href="https://www.facebook.com/junayet4012/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Button size={'icon'} variant={'outline'}>
                  <Facebook className="w-5 h-5" />
                </Button>
              </Link>
              <Link
                href="https://github.com/junayet4o12"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Button size={'icon'} variant={'outline'}>
                  <Github className="w-5 h-5" />
                </Button>
              </Link>

              <Link
                href="https://www.linkedin.com/in/junayet-alam/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Button size={'icon'} variant={'outline'}>
                  <Linkedin className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

