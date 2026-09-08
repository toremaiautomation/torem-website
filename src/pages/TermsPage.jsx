import { P } from "../theme";
import { LegalPage, LegalSection, LP, LI } from "../components/LegalShared";
import { PageHead } from "../components/PageHead";

export default function TermsPage() {
  return (
    <>
      <PageHead title="Terms of Service | Torem AI" description="Read Torem AI's Terms of Service including payment terms, cancellation policy, client responsibilities, and limitation of liability." />
      <LegalPage title="Terms of Service" updated="June 1, 2026">
        <LegalSection heading="1. Acceptance of Terms">
          <LP>By accessing or using any services provided by Torem AI ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</LP>
          <LP>These Terms apply to all clients, visitors, and others who access or use our services, including AI automation systems, consulting, and software development.</LP>
        </LegalSection>

        <LegalSection heading="2. Description of Services">
          <LP>Torem AI provides AI-powered chat automation for small businesses, including but not limited to:</LP>
          <LI items={["AI chat and knowledge base systems","Automated appointment booking","Automated follow-up sequences","Analytics and reporting","Review generation automation","Instant response automation"]} />
          <LP>All services are custom-built and delivered as described in your individual service agreement or proposal.</LP>
        </LegalSection>

        <LegalSection heading="3. Payment Terms">
          <LP>Services are billed according to the pricing agreed upon in your service proposal. Setup fees are due before work begins. Monthly recurring fees are billed on the same date each month.</LP>
          <LP>Late payments (more than 7 days overdue) may result in service suspension. We reserve the right to charge a 1.5% monthly late fee on outstanding balances.</LP>
          <LP>All fees are non-refundable unless otherwise stated in writing. Disputes must be raised within 30 days of the invoice date.</LP>
        </LegalSection>

        <LegalSection heading="4. Cancellation Policy">
          <LP>Monthly services may be cancelled with 30 days written notice to toremaiautomation@gmail.com. You will continue to have access to services through the end of the current billing period.</LP>
          <LP>Setup fees are non-refundable. If you cancel within the first 30 days of a monthly service, no refund will be issued for that month.</LP>
          <LP>We reserve the right to terminate service immediately for violations of these Terms, fraudulent activity, or non-payment.</LP>
        </LegalSection>

        <LegalSection heading="5. Client Responsibilities">
          <LP>You agree to provide accurate information necessary for us to deliver services, including business details, phone numbers, access credentials, and workflow information.</LP>
          <LP>You are responsible for ensuring that your use of our services complies with all applicable laws and regulations, including telemarketing regulations (TCPA), CAN-SPAM, and any local business licensing requirements.</LP>
          <LP>You must not use our services to send spam, harass individuals, or engage in any deceptive or fraudulent business practices.</LP>
        </LegalSection>

        <LegalSection heading="6. Intellectual Property and Data Ownership">
          <LP>All custom automation workflows, scripts, and systems built for you remain your property upon full payment. Torem AI retains the right to use general concepts, techniques, and non-client-specific methodologies in other projects.</LP>
          <LP>You retain full ownership of your business data, customer contact lists, and lead information. We will never sell or share your data with third parties except as required to deliver your services (e.g., integration with third-party platforms you authorize).</LP>
        </LegalSection>

        <LegalSection heading="7. Limitation of Liability">
          <LP>Torem AI's liability for any claim arising out of these Terms or our services is limited to the amount you paid us in the 3 months preceding the claim.</LP>
          <LP>We are not liable for indirect, incidental, special, or consequential damages, including lost revenue, lost leads, or business interruption, even if we have been advised of the possibility of such damages.</LP>
          <LP>AI systems may not be 100% accurate at all times. We do not guarantee specific business outcomes, lead volumes, or revenue results from our automation systems.</LP>
        </LegalSection>

        <LegalSection heading="8. Modifications to Terms">
          <LP>We reserve the right to update these Terms at any time. We will notify active clients by email at least 14 days before material changes take effect. Continued use of our services after changes constitutes acceptance of the updated Terms.</LP>
        </LegalSection>

        <LegalSection heading="9. Governing Law">
          <LP>These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Harris County, Texas, unless we agree in writing to an alternative dispute resolution method.</LP>
        </LegalSection>

        <LegalSection heading="10. Contact">
          <LP>Questions about these Terms? Contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color: P.blue }}>toremaiautomation@gmail.com</a>.</LP>
        </LegalSection>
      </LegalPage>
    </>
  );
}
