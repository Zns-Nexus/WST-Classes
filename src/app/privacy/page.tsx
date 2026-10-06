import Link from 'next/link';

export const metadata = { title: 'Privacy' };

export default function Privacy() {
  return <main id="main" className="container simple-page"><h1>Privacy on this website</h1><p>This version of the Work Smart Tutorials website does not collect admission enquiries, accept account registrations or store student passwords.</p><h2>Contacting the institute</h2><p>The enquiry buttons open Work Smart’s public Instagram accounts. Any information you choose to send there is handled by that service and the institute, not collected by this website.</p><h2>External services</h2><p>Links to Instagram, YouTube and official exam websites open third-party services with their own privacy policies. Videos are linked rather than embedded, so visiting this website does not automatically load a YouTube player.</p><h2>Technical information</h2><p>The server hosting the website may process ordinary request information, such as your IP address and the page requested, to deliver the website. No analytics or advertising trackers have been added to this version.</p><h2>Student accounts</h2><p>Private student access is not active. Before it is enabled, this notice needs to be updated with the selected authentication, storage, retention and contact arrangements.</p><Link className="button button-primary" href="/">Back to the website</Link></main>;
}
