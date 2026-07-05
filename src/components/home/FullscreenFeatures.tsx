"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SvgMask } from "@/components/preloader/SvgMask";
import { registerGsap } from "@/lib/gsap/register";
import { fullscreenFeatures } from "@/data/homepage";
import { createNotch, NotchDirection } from "@/types/notch";
import styles from "./fullscreen-features.module.css";

export function FullscreenFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [notchProgress, setNotchProgress] = useState(0);

  useEffect(() => {
    registerGsap();
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const count = fullscreenFeatures.items.length;
        const index = Math.min(count - 1, Math.floor(self.progress * count));
        const localProgress = self.progress * count - index;
        setActiveIndex(index);
        setNotchProgress(localProgress);
      },
    });

    return () => trigger.kill();
  }, []);

  const activeItem = fullscreenFeatures.items[activeIndex];
  const notches = [createNotch(NotchDirection.bottom, { size: 0.5 + notchProgress * 0.5 })];

  return (
    <section
      ref={sectionRef}
      className={styles.fullscreenFeatures}
      style={{ "--items-count": fullscreenFeatures.items.length } as React.CSSProperties}
    >
      <div className={styles.track}>
        <div className={styles.sticky}>
          <div className={styles.imageLayout}>
            <div
              className={styles.notchWrapper}
              style={{ "--notch-progress": notchProgress } as React.CSSProperties}
            >
              <SvgMask notches={notches} useClip>
                <div className={styles.maskSlot}>
                  {fullscreenFeatures.items.map((item, index) => (
                    <Image
                      key={item.title}
                      src={item.image}
                      alt=""
                      fill
                      className={`${styles.featureImage} ${
                        index === activeIndex ? styles.featureImageActive : ""
                      }`}
                      sizes="100vw"
                      priority={index === 0}
                    />
                  ))}
                </div>
              </SvgMask>
              <div className={styles.overlay} style={{ opacity: 1 - notchProgress }} />
            </div>
          </div>

          <div className={styles.bottomLayout}>
            <div className={styles.progressBar}>
              {fullscreenFeatures.items.map((item, index) => (
                <div key={item.title} className={styles.progressColumn}>
                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressFill}
                      style={{
                        transform: `scaleY(${
                          index < activeIndex ? 1 : index === activeIndex ? notchProgress : 0
                        })`,
                      }}
                    />
                  </div>
                  <span className={styles.counter}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.titleWrapper}>
              <p className={styles.preTitle}>{activeItem.preTitle}</p>
              <h3 className={styles.panelTitle}>{activeItem.title}</h3>
            </div>

            <div className={styles.contentWrapper}>
              <p className={styles.panelDescription}>{activeItem.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
