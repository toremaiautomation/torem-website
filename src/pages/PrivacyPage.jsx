import { P } from "../theme";
import { LegalPage, LegalSection, LP, LI } from "../components/LegalShared";
import { PageHead } from "../components/PageHead";

export default function PrivacyPage() {
  return (
    <>
      <PageHead title="Privacy Policy | Torem AI" description="Torem AI's Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services." />
      <LegalPage title="Privacy Policy" updated="June 1, 2026">
        <LegalSection heading="1. Introduction">
          <LP>Torem AI ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services.</LP>
          <LP>This policy applies to our website, AI automation services, and all communications between Torem AI and its clients or website visitors.</LP>
        </LegalSection>

        <LegalSection heading="2. Information We Collect">
          <LP><strong>Information you provide directly:</strong></LP>
          <LI items={["Name, email address, and phone number (contact forms, onboarding)","Business name and address","Payment information (processed securely through third-party processors)","Workflow and operational details shared during onboarding"]} />
          <LP><strong>Information collected automatically:</strong></LP>
          <LI items={["Browser type and version","Pages visited and time spent on site","Referring website","IP address and approximate location","Device type"]} />
          <LP><strong>Information from third-party integrations (when you authorize):</strong></LP>
          <LI items={["Calendar events (Google/Outlook)","CRM contacts and lead data","Phone call logs and recordings (for AI receptionist services)","SMS/email engagement data"]} />
        </LegalSection>

        <LegalSection heading="3. How We Use Your Information">
          <LP>We use the information we collect to:</LP>
          <LI items={["Deliver and maintain your automation services","Communicate with you about your account and support","Process payments and send invoices","Improve our services and develop new features","Comply with legal obligations","Send relevant service updates (you may opt out at any time)"]} />
          <LP>We do not use your data for advertising purposes and will never sell your personal information to third parties.</LP>
        </LegalSection>

        <LegalSection heading="4. Data Storage and Security">
          <LP>Your data is stored on secure, industry-standard infrastructure including Supabase (hosted on AWS) and other platforms listed in our Tech Stack. We implement appropriate technical safeguards including encryption in transit and at rest.</LP>
          <LP>We retain client data for as long as your service is active plus 12 months. Contact information from website inquiries is retained for 24 months. You may request deletion at any time (see Section 6).</LP>
        </LegalSection>

        <LegalSection heading="5. Sharing Your Information">
          <LP>We only share your information with third parties in the following circumstances:</LP>
          <LI items={["Service delivery: with platforms you authorize (e.g., Google Calendar, CRM tools, SMS providers like Twilio)","Legal compliance: if required by law, court order, or government authority","Business transfers: if Torem AI is acquired or merges with another company, with prior notice to clients"]} />
          <LP>All third-party platforms we use are bound by their own privacy policies and data protection agreements.</LP>
        </LegalSection>

        <LegalSection heading="6. Your Rights (including GDPR)">
          <LP>Depending on your location, you may have the following rights regarding your personal data:</LP>
          <LI items={["Access: request a copy of the data we hold about you","Correction: request correction of inaccurate data","Deletion: request deletion of your personal data","Portability: receive your data in a machine-readable format","Objection: object to certain types of processing"]} />
          <LP>To exercise any of these rights, email us at <a href="mailto:toremaiautomation@gmail.com" style={{ color: P.blue }}>toremaiautomation@gmail.com</a>. We will respond within 30 days.</LP>
        </LegalSection>

        <LegalSection heading="7. Children's Privacy">
          <LP>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately.</LP>
        </LegalSection>

        <LegalSection heading="8. Changes to This Policy">
          <LP>We may update this Privacy Policy periodically. We will notify you of significant changes by email or by posting a notice on our website. Your continued use of our services after the effective date constitutes acceptance of the updated policy.</LP>
        </LegalSection>

        <LegalSection heading="9. Contact">
          <LP>For privacy inquiries, contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color: P.blue }}>toremaiautomation@gmail.com</a> or <a href="tel:+18326838151" style={{ color: P.blue }}>(832) 683-8151</a>. Torem AI, Houston, TX.</LP>
        </LegalSection>
      </LegalPage>
    </>
  );
}
