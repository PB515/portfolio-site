import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";

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
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Contact
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Let&apos;s connect
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        Whether you want to talk systems, AI automation, or just say hello —
        I&apos;d like to hear from you.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_1.2fr]">
        {/* Direct links (these work now) */}
        <div>
          <div className="relative mb-6 h-72 w-full max-w-[280px] sm:h-80">
            <Image
              src="/images/purven-contact.png"
              alt="Purven Bhavsar"
              fill
              sizes="(max-width: 640px) 70vw, 280px"
              className="object-contain object-bottom"
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
        </div>

        {/* Form (UI; wired in Phase 4) */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Send a message
          </h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
