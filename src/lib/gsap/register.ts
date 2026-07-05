import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;

  gsap.registerPlugin(CustomEase, ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  CustomEase.create("custom.fastInOut", ".52,0,0,1");
  CustomEase.create("easeCustomNotch", ".67,.05,.43,1");

  registered = true;
  return gsap;
}
