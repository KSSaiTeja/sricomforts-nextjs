import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let pluginsRegistered = false;

export function registerGsap() {
  if (typeof window === "undefined") return gsap;

  if (!pluginsRegistered) {
    gsap.registerPlugin(CustomEase, ScrollTrigger, Flip, SplitText);
    gsap.ticker.lagSmoothing(0);
    pluginsRegistered = true;
  }

  // Recreate on every call so HMR / module reloads never leave missing named eases
  // (a missing ease throws during animation setup and can blank the whole app).
  CustomEase.create("custom.fastInOut", ".52,0,0,1");
  CustomEase.create("easeCustomNotch", ".67,.05,.43,1");

  return gsap;
}
