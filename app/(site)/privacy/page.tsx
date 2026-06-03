export const metadata = {
  title: "Privacy",
  description: "How this site handles your data.",
};

// NOTE (flagged for human/legal review before full launch): this is a plain-language
// privacy policy reflecting what the site actually does (contact form → Supabase, cookieless
// analytics, public resume). Review for your jurisdiction (India DPDP / EU GDPR) before promoting.

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-20 pb-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted">Last updated: June 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-muted">
        <p>
          This is the personal website of Purven Bhavsar. I keep data collection
          to the minimum needed to run the site and reply to you.
        </p>

        <section>
          <h2 className="text-lg font-semibold text-foreground">What I collect</h2>
          <p className="mt-2">
            If you use the contact form, I collect the <strong className="text-foreground">name,
            email, and message</strong> you submit. I also store a one-way hashed
            version of your IP address purely to limit spam — it can&apos;t be
            reversed to identify you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Why, and how it&apos;s stored</h2>
          <p className="mt-2">
            Your message is used only to read and reply to you. It&apos;s stored in
            a private database (Supabase, hosted in the Mumbai / India region) that
            only I can access. I don&apos;t sell or share it, and there&apos;s no
            marketing or newsletter.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Analytics &amp; cookies</h2>
          <p className="mt-2">
            This site uses privacy-friendly, <strong className="text-foreground">cookieless</strong>{" "}
            analytics — aggregate page counts only, no tracking cookies and no
            cross-site profiling. The only thing stored in your browser is your
            chosen theme (Root/Canopy) preference.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
          <p className="mt-2">
            You can ask me to see or delete the message data you sent — just email{" "}
            <a href="mailto:bhavsarpurven515@gmail.com" className="text-primary hover:text-primary-hover">
              bhavsarpurven515@gmail.com
            </a>{" "}
            and I&apos;ll take care of it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about privacy? Reach me at{" "}
            <a href="mailto:bhavsarpurven515@gmail.com" className="text-primary hover:text-primary-hover">
              bhavsarpurven515@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
