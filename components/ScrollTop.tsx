"use client"
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollTop() {
  return (
    <Button 
    size={"icon"}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-10 right-10  rounded-full z-50"
  >
    <ArrowUp size={20} />
  </Button>
  )
}