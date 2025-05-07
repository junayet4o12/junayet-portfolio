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
          {/* Left: Video/Image Preview */}
          <div className="relative w-full">
            <div className="w-full aspect-[4/6] relative border-[10px] border-primary rounded-[40px] overflow-hidden">
              <Image
                src='/about.jpg'
                alt="Professional working at computer"
                fill
                className="object-cover rounded-lg"
              />
            </div>
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

