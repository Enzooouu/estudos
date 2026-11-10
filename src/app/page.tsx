import { About } from '@/components/About';
import { BoxBuilder } from '@/components/BoxBuilder';
import { Contact } from '@/components/Contact';
import { CtaFrame } from '@/components/CtaFrame';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Institutional } from '@/components/Institutional';
import { Location } from '@/components/Location';
import { Process } from '@/components/Process';
import { Products } from '@/components/Products';
import { Projects } from '@/components/Projects';
import { Reviews } from '@/components/Reviews';
import { faq, products, site } from '@/content/site';

/** Dados estruturados para o Google: empresa local + perguntas frequentes. */
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phoneHref.replace('tel:', ''),
    email: site.email,
    sameAs: [site.instagram.url, site.facebook.url],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addressParts.street,
      addressLocality: site.addressParts.city,
      addressRegion: site.addressParts.state,
      postalCode: site.addressParts.zip,
      addressCountry: 'BR',
    },
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    makesOffer: products.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.name, description: p.text },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <Hero />
      <main id="conteudo">
        <Products />
        <Projects />
        <Process />
        <BoxBuilder />
        <About />
        <Institutional />
        <Faq />
        <Reviews />
        <Location />
        <CtaFrame />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
