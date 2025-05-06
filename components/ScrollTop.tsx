"use client"
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollTop() {
  return (
    <Button 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-10 right-10 bg-primary hover:bg-[#00DD6F] text-black rounded-full w-10 h-10 p-0 z-50"
  >
    <ArrowUp size={20} />
  </Button>
  )
}