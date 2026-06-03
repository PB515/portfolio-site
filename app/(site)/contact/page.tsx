import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Portrait } from "@/components/Portrait";
import { ContactDecor } from "@/components/ContactDecor";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Purven Bhavsar — email, LinkedIn, or GitHub.",
};

const CONNECT = [
  { label: "Email", value: "bhavsarpurven515@gmail.com", href: "mailto:bhavsarpurven515@gmail.com" },
  { label: "LinkedIn", value: "in/purvenbhavsar", href: "https://www.linkedin.com/in/purvenbhavsar" },
  { label: "GitHub", value: "PB515", href: "https://github.com/PB515" },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-20 pb-16">
      <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Contact
      </Reveal>
      <Reveal as="h1" delay={80} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Let&apos;s connect
      </Reveal>
      <Reveal as="p" delay={160} className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Whether you want to talk systems, AI automation, or just say hello —
        I&apos;d like to hear from you.
      </Reveal>

      <div className="relative isolate mt-10 grid gap-10 overflow-hidden sm:grid-cols-[1fr_1.2fr]">
        <ContactDecor className="inset-0 -z-10 opacity-[0.07]" />
        {/* Direct links (these work now) */}
        <Reveal>
          <div className="mb-6 w-full max-w-[340px]">
            <Portrait
              src="/images/purven-contact.png"
              alt="Purven Bhavsar"
              variant="rings"
              art="/brand/portrait-contact.png"
              sizes="(max-width: 640px) 75vw, 300px"
            />
          </div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Reach me directly
          </h2>
          <ul className="mt-4 space-y-3">
            {CONNECT.map((c) => (
              <li key={c.label} className="flex flex-col">
                <span className="text-sm text-muted">{c.label}</span>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Form (UI; wired in Phase 4) */}
        <Reveal delay={120}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Send a message
          </h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
