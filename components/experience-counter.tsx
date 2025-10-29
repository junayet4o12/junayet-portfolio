'use client'
import CountUp from 'react-countup';

export default function ExperienceCounter() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-background/50 border border-border rounded-xl backdrop-blur-sm shadow-lg text-center">
                <div className="text-3xl font-bold text-primary">
                    <CountUp end={3} suffix="+" duration={5} />
                </div>
                <p className="text-muted-foreground text-sm">Years of Experience</p>
            </div>
            <div className="p-6 bg-background/50 border border-border rounded-xl backdrop-blur-sm shadow-lg text-center">
                <div className="text-3xl font-bold text-primary">
                    <CountUp end={7} suffix="+" duration={5} />
                </div>
                <p className="text-muted-foreground text-sm">Projects Completed</p>
            </div>
        </div>
    );
}