import Image from "next/image";


import profile from '@/public/profile.png'
import { Card, CardContent } from "./ui/card";
import Resume from "./resume";
export default function HeroSection() {



  return (
    <section id="hero" className="relative flex max-h-[calc(100vh-120px)]  items-center justify-center text-foreground overflow-hidden z-10">
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-16 flex-1 flex">
        <div className=" lg:grid-cols-2 gap-8 items-center hidden lg:grid">
          <div className=" space-y-4 lg:space-y-8">
            <div className=" space-y-4 lg:space-y-8">
              <h1 className="text-3xl md:text-6xl xl:text-7xl font-bold leading-tight uppercase">
                <span className="text-primary inline-block transform hover:scale-105 transition-transform duration-300">
                  Junayet Alam
                </span>{" "}
                <span className="text-foreground">
                  Mern Stack Developer
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                <span>
                  Welcome to my portfolio! I specialize in creating dynamic and responsive web applications.
                </span>
              </p>
              <Resume />
            </div>
          </div>
          <div className="relative w-full aspect-[4/4]  mt-auto">
            <Image
              src={profile}
              alt="Professional in business attire"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <Card className="lg:hidden">
          <CardContent className="grid lg:grid-cols-2 gap-8 items-center flex-1 ">
            <div className="relative w-full aspect-[4/3] md:aspect-[4/2]">
              <Image
                src={profile}
                alt="Professional in business attire"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className=" space-y-4 lg:space-y-8 text-center">
              <h1 className="text-3xl font-bold leading-tight uppercase">
                <span className="text-primary inline-block transform hover:scale-105 transition-transform duration-300">
                  Junayet Alam
                </span>{" "}
                <span className="text-foreground">
                  Mern Stack Developer
                </span>
              </h1>
              <p className="text-muted-foreground">
                <span>
                  Welcome to my portfolio! I specialize in creating dynamic and responsive web applications.
                </span>
              </p>
              <Resume />
            </div>
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
