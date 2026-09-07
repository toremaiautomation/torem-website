import { P } from "../theme";
import { LegalPage, LegalSection, LP, LI } from "../components/LegalShared";

export default function DisclaimerPage({ dark }) {
  const Section = p => <LegalSection {...p} dark={dark} />;
  return (
    <LegalPage dark={dark} title="Disclaimer" updated="June 1, 2026">
      <Section heading="1. General Disclaimer">
        <LP>The information provided by Torem AI on this website and through our services is for general informational and operational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, completeness, or reliability of any information.</LP>
      </Section>

      <Section heading="2. AI Limitations">
        <LP>Our AI-powered systems — including AI receptionists, automated follow-up sequences, and lead capture tools — are designed to assist your business operations. However, AI systems have inherent limitations:</LP>
        <LI items={["AI may misunderstand or misclassify certain caller requests or messages","Responses may not always reflect the nuance of a human conversation","AI cannot replace the judgment of a qualified professional in complex situations","Performance may vary based on call volume, audio quality, and the specificity of your setup"]} />
        <LP>We continuously improve our systems but cannot guarantee error-free operation at all times. We recommend reviewing automated interactions periodically and setting up appropriate human escalation paths for sensitive situations.</LP>
      </Section>

      <Section heading="3. No Legal or Financial Advice">
        <LP>Nothing on this website or in our services constitutes legal, financial, tax, or professional business advice. We are an automation technology company, not a law firm, accounting firm, or business consultant.</LP>
        <LP>Any decisions about your business operations, contracts, pricing, or compliance should be made in consultation with qualified professionals in those fields. Torem AI is not responsible for any business decisions made based on our automation outputs.</LP>
      </Section>

      <Section heading="4. Results Disclaimer">
        <LP>Any references to outcomes such as "more leads," "increased bookings," or "saved hours" are illustrative examples based on typical use cases. Individual results will vary based on your industry, market, service area, business model, and how you implement and use our systems.</LP>
        <LP>Torem AI does not guarantee specific revenue increases, lead volumes, or business growth. Automation is a tool — results depend on how it is used within your broader business strategy.</LP>
      </Section>

      <Section heading="5. Service Availability">
        <LP>While we strive for high uptime and reliability, our services depend on third-party infrastructure providers (including cloud hosting, telephony platforms, and API services) that may experience outages outside our control.</LP>
        <LP>We will communicate planned maintenance in advance and work to resolve unplanned outages promptly. Torem AI is not liable for losses resulting from service interruptions caused by third-party platform failures.</LP>
      </Section>

      <Section heading="6. External Links">
        <LP>Our website may contain links to third-party websites. These links are provided for convenience only. Torem AI has no control over the content, privacy practices, or availability of external sites and is not responsible for any harm or loss resulting from your use of linked websites.</LP>
      </Section>

      <Section heading="7. Liability Cap">
        <LP>To the fullest extent permitted by applicable law, Torem AI's total liability to you for any claim arising out of or relating to our services shall not exceed the total fees paid by you to Torem AI in the three (3) months immediately preceding the event giving rise to the claim.</LP>
        <LP>In no event shall Torem AI be liable for indirect, incidental, punitive, special, or consequential damages of any kind, even if advised of the possibility of such damages.</LP>
      </Section>

      <Section heading="8. Contact">
        <LP>If you have questions about this Disclaimer, please contact us at <a href="mailto:toremaiautomation@gmail.com" style={{ color:P.blue }}>toremaiautomation@gmail.com</a> or <a href="tel:+18326838151" style={{ color:P.blue }}>(832) 683-8151</a>.</LP>
      </Section>
    </LegalPage>
  );
}
