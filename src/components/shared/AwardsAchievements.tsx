"use client";

import {
  awardsSection,
  experienceSection,
  type AwardItem,
} from "@/data/awards";
import styles from "./awards-achievements.module.css";

function LaurelBadge({ year }: { year: string }) {
  return (
    <div className={styles.laurel} aria-hidden>
      <svg
        className={styles.laurelSvg}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 78c-10-9-15-20-15-32C15 28 26 16 42 10c-5 9-5 20 0 29 3 5 8 9 13 11-9 3-17 12-25 28z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M66 78c10-9 15-20 15-32C81 28 70 16 54 10c5 9 5 20 0 29-3 5-8 9-13 11 9 3 17 12 25 28z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 52c-2.5-7-2.5-14 0-20M23 60c-3.5-6-4.5-13-3.5-20M70 52c2.5-7 2.5-14 0-20M73 60c3.5-6 4.5-13 3.5-20"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.45"
        />
        <circle cx="48" cy="42" r="12.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M48 34.5l1.85 3.9 4.25.45-3.2 2.9.95 4.15L48 43.5l-3.85 2.4.95-4.15-3.2-2.9 4.25-.45L48 34.5z"
          fill="var(--color-brand-primary)"
        />
      </svg>
      <span className={`body-6 ${styles.laurelYear}`}>{year}</span>
    </div>
  );
}

function AwardRow({ item }: { item: AwardItem }) {
  return (
    <article className={styles.awardItem}>
      <LaurelBadge year={item.year} />
      <div className={styles.awardCopy}>
        <h3 className={`title-h3 ${styles.awardTitle}`}>{item.title}</h3>
        <p className={`body-4 ${styles.awardDescription}`}>{item.description}</p>
      </div>
    </article>
  );
}

type AwardsAchievementsProps = {
  id?: string;
};

export function AwardsAchievements({ id }: AwardsAchievementsProps) {
  return (
    <div id={id} className={styles.root}>
      <section
        className={styles.experience}
        aria-labelledby="experience-section-title"
      >
        <div className={styles.experienceInner}>
          <div className={styles.yearsCard}>
            <div className={styles.yearsFrame}>
              <span
                className={styles.yearsNumber}
                style={{ backgroundImage: `url(${experienceSection.yearsImage})` }}
              >
                {experienceSection.years}
              </span>
              <p className={`body-4 ${styles.yearsLabel}`}>
                {experienceSection.yearsLabel}
              </p>
            </div>
          </div>

          <div className={styles.experienceContent}>
            <p className={`label label-5 ${styles.eyebrow}`}>Recognition</p>
            <h2
              id="experience-section-title"
              className={`title-h2 ${styles.experienceTitle}`}
            >
              {experienceSection.titleLead}{" "}
              <em className={styles.accent}>{experienceSection.titleAccent}</em>
            </h2>
            <p className={`body-4 ${styles.experienceBody}`}>
              {experienceSection.body}
            </p>

            <div className={styles.stats} role="list">
              {experienceSection.stats.map((stat) => (
                <div key={stat.label} className={styles.stat} role="listitem">
                  <p className={`title-h3 ${styles.statValue}`}>{stat.value}</p>
                  <p className={`body-6 ${styles.statLabel}`}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.signature}>
              <p className={styles.signatureName}>
                {experienceSection.signatureName}
              </p>
              <p className={`body-6 ${styles.signatureMeta}`}>
                {experienceSection.signatureRole}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.awards}
        aria-labelledby="awards-section-title"
      >
        <div className={styles.awardsInner}>
          <header className={styles.awardsHeader}>
            <p className={`label label-5 ${styles.awardsLabel}`}>
              {awardsSection.label}
            </p>
            <h2
              id="awards-section-title"
              className={`title-h2 ${styles.awardsTitle}`}
            >
              {awardsSection.titleLead}{" "}
              <em className={styles.accent}>{awardsSection.titleAccent}</em>{" "}
              {awardsSection.titleTrail}
            </h2>
          </header>

          <div className={styles.awardsGrid}>
            {awardsSection.items.map((item) => (
              <AwardRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
