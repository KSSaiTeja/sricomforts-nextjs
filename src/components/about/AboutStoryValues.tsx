"use client";

import { NotchSection } from "@/components/home/NotchSection";
import { type AboutStoryValuesData } from "@/data/about";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import styles from "./about-story-values.module.css";

type AboutStoryValuesProps = {
  data: AboutStoryValuesData;
};

export function AboutStoryValues({ data }: AboutStoryValuesProps) {
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLElement, HTMLElement>();

  return (
    <NotchSection top={false} bottom={false}>
      <section
        ref={sectionRef}
        className={styles.section}
        aria-labelledby="about-story-title"
      >
        <div className={styles.inner}>
          <div className={styles.story}>
            <p className={`label label-5 ${styles.label}`}>{data.label}</p>
            <header ref={headerRef} className={`animated-strong ${styles.header}`}>
              <h2 id="about-story-title" className={`title-si ${styles.title}`}>
                {data.title}{" "}
                <em className={styles.accent}>{data.titleAccent}</em>
              </h2>
            </header>
            <p className={`body-4 ${styles.lead}`}>{data.lead}</p>
            <div className={styles.paragraphs}>
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={`body-4 ${styles.paragraph}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className={styles.values} aria-labelledby="about-values-label">
            <p id="about-values-label" className={`label label-5 ${styles.valuesLabel}`}>
              {data.valuesLabel}
            </p>
            <ul className={styles.valuesList}>
              {data.values.map((value, index) => (
                <li key={value.title} className={styles.valueItem}>
                  <span className={`body-6 ${styles.valueIndex}`} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.valueCopy}>
                    <h3 className={`title-h3 ${styles.valueTitle}`}>{value.title}</h3>
                    <p className={`body-4 ${styles.valueDescription}`}>{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </NotchSection>
  );
}
