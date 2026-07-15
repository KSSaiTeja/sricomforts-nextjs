import { contactMap } from "@/data/contact";

export function ContactMap() {
  return (
    <section className="contact-map" aria-labelledby="contact-map-title">
      <div className="contact-map__inner">
        <header className="contact-map__header">
          <p className="body-4">{contactMap.eyebrow}</p>
          <h2 id="contact-map-title" className="title-h3">
            {contactMap.title}
          </h2>
          <p className="contact-map__address">{contactMap.address}</p>
          <a
            href={contactMap.mapsUrl}
            className="contact-map__directions label-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {contactMap.directionsLabel}
          </a>
        </header>

        <div className="contact-map__frame-wrap">
          <iframe
            className="contact-map__frame"
            title={contactMap.iframeTitle}
            src={contactMap.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
