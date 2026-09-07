import { P } from "../theme";
import { LegalPage, LegalSection, LP, LI } from "../components/LegalShared";
import { PageHead } from "../components/PageHead";

export default function CookiePage() {
  return (
    <>
      <PageHead title="Cookie Policy | Torem AI" description="Torem AI's Cookie Policy explains what cookies we use, why we use them, and how you can control them." />
      <LegalPage title="Cookie Policy" updated="June 1, 2026">
        <LegalSection heading="1. What Are Cookies">
          <LP>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you interact with content, and provide a better browsing experience.</LP>
          <LP>This Cookie Policy explains what cookies we use on the Torem AI website and how you can control them.</LP>
        </LegalSection>

        <LegalSection heading="2. Cookies We Use">
          <LP><strong>Essential cookies</strong> — required for the website to function. These cannot be disabled:</LP>
          <LI items={["Session management (keeping your form data intact as you navigate)","Security tokens to prevent cross-site request forgery"]} />
          <LP><strong>Analytics cookies</strong> — help us understand how visitors use our site (pages visited, time spent, bounce rate). We may use tools such as Google Analytics. These are anonymized and do not identify you personally.</LP>
          <LP><strong>Preference cookies</strong> — remember choices you've made (e.g., if you've dismissed a banner).</LP>
          <LP>We do not use advertising or tracking cookies. We do not sell data derived from cookie activity.</LP>
        </LegalSection>

        <LegalSection heading="3. Third-Party Cookies">
          <LP>Some pages may include embedded content (e.g., scheduling widgets, video embeds) from third-party providers. These providers may set their own cookies subject to their respective privacy policies. We have no control over these cookies.</LP>
          <LP>Common third parties that may set cookies: Google (Analytics, Fonts, Calendar), Calendly or similar scheduling tools.</LP>
        </LegalSection>

        <LegalSection heading="4. How to Control Cookies">
          <LP>You can control and delete cookies through your browser settings. Here's how for major browsers:</LP>
          <LI items={["Chrome: Settings → Privacy and security → Cookies and other site data","Firefox: Settings → Privacy and Security → Cookies and Site Data","Safari: Preferences → Privacy → Manage Website Data","Edge: Settings → Cookies and site permissions"]} />
          <LP>Disabling essential cookies may affect website functionality. Disabling analytics cookies will not affect your ability to use our services.</LP>
        </LegalSection>

        <LegalSection heading="5. Do Not Track">
          <LP>Our website respects Do Not Track (DNT) signals from browsers where technically feasible. When DNT is enabled, we disable non-essential analytics tracking for your session.</LP>
        </LegalSection>

        <LegalSection heading="6. Updates to This Policy">
          <LP>We may update this Cookie Policy as our practices change or as required by law. The "Last updated" date at the top of this page reflects the most recent revision.</LP>
        </LegalSection>

        <LegalSection heading="7. Contact">
          <LP>Questions about our cookie practices? Email us at <a href="mailto:toremaiautomation@gmail.com" style={{ color: P.blue }}>toremaiautomation@gmail.com</a>.</LP>
        </LegalSection>
      </LegalPage>
    </>
  );
}
