"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AboutSectionIntro } from "@/components/about/AboutSectionIntro";
import { CrossFlicker } from "@/components/home/CrossFlicker";
import { ContactCta } from "@/components/shared/ContactCta";
import { LogoBorderCell } from "@/components/home/LogoBorderCell";
import { NotchSection } from "@/components/home/NotchSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  careerCultureIntro,
  careerDepartments,
  careerHero,
  careerJobBoardHeading,
  careerJobs,
  careerLocations,
  type CareerJob,
} from "@/data/careers";
import { useSvh } from "@/hooks/useSvh";

function JobDecorators() {
  return (
    <div className="crosses__wrapper">
      <div className="cross__wrapper top-left">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper top-right">
        <CrossFlicker />
      </div>
    </div>
  );
}

function JobRow({ job }: { job: CareerJob }) {
  const subtitle = `${job.department} | ${job.employmentType} | ${job.location}`;

  return (
    <li className="career-job">
      <JobDecorators />
      <div className="career-job__sep career-job__sep--left" aria-hidden="true" />
      <div className="career-job__sep career-job__sep--right" aria-hidden="true" />
      <div className="career-job__sep career-job__sep--top" aria-hidden="true" />
      <div className="career-job__sep career-job__sep--bottom" aria-hidden="true" />
      <LogoBorderCell>
        <div className="career-job__item">
          <div className="career-job__content">
            <div className="career-job__title">{job.title}</div>
            <div className="career-job__meta">{subtitle}</div>
          </div>
          <div className="career-job__cta">
            <Link
              href={job.href}
              className="career-job__apply button label-4"
              aria-label={`Apply for ${job.title}`}
            >
              <span className="link-active">Apply</span>
            </Link>
          </div>
        </div>
      </LogoBorderCell>
    </li>
  );
}

function FilterChip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="career-filter">
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} />
      <span className={["career-filter__chip", checked ? "is-active" : ""].filter(Boolean).join(" ")}>
        {label}
      </span>
    </label>
  );
}

function JobBoard() {
  const [locations, setLocations] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    return careerJobs.filter((job) => {
      const locationOk = locations.length === 0 || locations.includes(job.location);
      const departmentOk =
        departments.length === 0 || departments.includes(job.department);
      return locationOk && departmentOk;
    });
  }, [locations, departments]);

  return (
    <section className="career-job-board" aria-labelledby="career-jobs-heading">
      <div className="career-board-layout">
        <div className="career-board-layout__heading">
          <h3 id="career-jobs-heading">{careerJobBoardHeading}</h3>
        </div>

        <div className="career-board-layout__content">
          <div className="career-filters-container">
            <fieldset className="career-filter-group">
              <legend>Locations</legend>
              <div className="career-filters career-filters--locations">
                {careerLocations.map((location) => (
                  <FilterChip
                    key={location}
                    label={location}
                    checked={locations.includes(location)}
                    onChange={() => toggle(location, locations, setLocations)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="career-filter-group">
              <legend>Departments</legend>
              <div className="career-filters career-filters--departments">
                {careerDepartments.map((department) => (
                  <FilterChip
                    key={department}
                    label={department}
                    checked={departments.includes(department)}
                    onChange={() => toggle(department, departments, setDepartments)}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          <div className="career-job-board__list-wrap">
            {filtered.length === 0 ? (
              <p className="career-job-board__empty">No open roles match these filters.</p>
            ) : (
              <ul className="career-job-board__list">
                {filtered.map((job) => (
                  <JobRow key={job.id} job={job} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareerPage() {
  useSvh();

  return (
    <div id="app" className="career-page">
      <SiteHeader />
      <main>
        <div className="content-wrapper">
          <div className="content__wrapper">
            <NotchSection top={false} bottom={{ from: -1, to: 1 }}>
              <div className="career-hero">
                <div className="career-hero__media">
                  <Image
                    src={careerHero.image.src}
                    alt={careerHero.image.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="career-hero__image"
                  />
                </div>
              </div>
            </NotchSection>

            <AboutSectionIntro data={careerCultureIntro} />
            <JobBoard />
          </div>
          <ContactCta />
          <SiteFooter static />
        </div>
      </main>
    </div>
  );
}
