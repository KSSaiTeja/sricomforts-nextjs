"use client";

import Image from "next/image";
import { useState } from "react";
import { type AboutLeaderItem, type AboutLeadersData } from "@/data/about";
import { CrossFlicker } from "@/components/home/CrossFlicker";
import { LogoBorderCell } from "@/components/home/LogoBorderCell";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";

type AboutLeadersProps = {
  data: AboutLeadersData;
};

function LeaderDecorators() {
  return (
    <div className="crosses__wrapper">
      <div className="cross__wrapper top-left">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper top-right">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper bottom-right">
        <CrossFlicker />
      </div>
      <div className="cross__wrapper bottom-left">
        <CrossFlicker />
      </div>
    </div>
  );
}

function LeaderCard({
  leader,
  index,
  total,
  activeIndex,
  isDesktop,
  onActivate,
  onDeactivate,
}: {
  leader: AboutLeaderItem;
  index: number;
  total: number;
  activeIndex: number | null;
  isDesktop: boolean;
  onActivate: (index: number) => void;
  onDeactivate: () => void;
}) {
  const hasBio = Boolean(leader.bio?.length);
  const isActive = activeIndex === index;
  const showMedia = !isDesktop || !isActive;
  const showResume = isActive && hasBio;
  const showLearnMore = isDesktop && hasBio && !isActive;

  return (
    <div className="leader" style={{ zIndex: total - index }}>
      <div className="leader-image">
        {index < (isDesktop ? 3 : 2) ? <div className="block__visual-divider top__wrapper" /> : null}
        <LeaderDecorators />

        <LogoBorderCell className="hover__wrapper" style={{ height: "100%" }}>
          {showLearnMore ? (
            <div className="button-learn-more__wrapper">
              <button
                type="button"
                className="button-learn-more"
                onClick={() => onActivate(index)}
              >
                Learn More
              </button>
            </div>
          ) : null}

          {hasBio ? (
            <div
              className={["resume__wrapper", showResume ? "show" : ""].filter(Boolean).join(" ")}
              data-lenis-prevent
            >
              {leader.bio?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <div
            className={["media__wrapper", showMedia ? "show" : ""].filter(Boolean).join(" ")}
            onMouseLeave={isDesktop ? onDeactivate : undefined}
          >
            <div className="media__container">
              <div className="leader-image__border-child media-el image">
                <Image
                  src={leader.image.src}
                  alt={leader.image.alt}
                  fill
                  sizes="(max-width: 1023px) 50vw, 33vw"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </LogoBorderCell>
      </div>

      <div className="leader-content">
        {total - 1 - index < (isDesktop ? 3 : 2) ? (
          <div className="block__visual-divider bottom__wrapper" />
        ) : null}
        <LeaderDecorators />

        <LogoBorderCell>
          <div className="leader-content__border-child">
            <p className="body-5 l-name title-h4">{leader.name}</p>
            <p className="body-6 l-role label-3">{leader.role}</p>
          </div>
        </LogoBorderCell>
      </div>
    </div>
  );
}

export function AboutLeaders({ data }: AboutLeadersProps) {
  const isDesktop = useIsLargeViewport();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const centerItems = data.items.length <= 2;

  return (
    <div className="about-leaders-wrapper">
      <div className={["about-leaders", centerItems ? "about-leaders--center" : ""].filter(Boolean).join(" ")}>
        {data.items.map((leader, index) => (
          <LeaderCard
            key={`${leader.name}-${index}`}
            leader={leader}
            index={index}
            total={data.items.length}
            activeIndex={activeIndex}
            isDesktop={isDesktop}
            onActivate={setActiveIndex}
            onDeactivate={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}
