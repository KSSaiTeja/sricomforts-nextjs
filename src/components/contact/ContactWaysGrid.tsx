import {
  contactWaysCards,
  contactWaysGrid,
  contactWaysNotches,
} from "@/data/contact";
import { ContactWaysCardAction } from "@/components/contact/ContactWaysCardAction";
import { ContactWaysCardLink } from "@/components/contact/ContactWaysCardLink";
import { ContactWaysCardSubscribe } from "@/components/contact/ContactWaysCardSubscribe";

export function ContactWaysGrid() {
  return (
    <section className="contact-ways-grid">
      <div className="contact-ways-grid__inner">
        <header className="contact-ways-grid__header">
          <p className="body-4">{contactWaysGrid.eyebrow}</p>
          <h3 className="title-h3">{contactWaysGrid.title}</h3>
        </header>

        <div className="contact-ways-grid__cards">
          {contactWaysCards.map((card, index) => {
            const notch = contactWaysNotches[index];

            if (card.type === "link") {
              return (
                <ContactWaysCardLink
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  theme={card.theme}
                  href={card.href}
                  openInNewTab={card.openInNewTab}
                  notch={notch}
                />
              );
            }

            if (card.type === "action") {
              return (
                <ContactWaysCardAction
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  theme={card.theme}
                  phoneHref={card.phoneHref}
                  ariaLabel={card.ariaLabel}
                  notch={notch}
                />
              );
            }

            return (
              <ContactWaysCardSubscribe
                key={card.title}
                title={card.title}
                theme={card.theme}
                emailLabel={card.emailLabel}
                emailPlaceholder={card.emailPlaceholder}
                submitLabel={card.submitLabel}
                successMessage={card.successMessage}
                notch={notch}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
