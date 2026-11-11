import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';

/**
 * Problema → solução: as dores mais comuns de quem contrata vidraçaria e como a JEL BOX
 * resolve cada uma. As citações são trechos reais das avaliações do Google.
 */
const items = [
  {
    pain: 'Prazo que nunca chega',
    fix: 'A data de instalação sai junto com o orçamento, e a gente cumpre.',
    quote: 'sempre entregou antes do prazo',
    who: 'PH Rodrigues',
  },
  {
    pain: 'Obra que deixa sujeira',
    fix: 'A mesma equipe que mede instala, limpa e só sai depois de testar cada folha com você.',
    quote: 'instalação sem sujeira',
    who: 'Priscila Silva',
  },
  {
    pain: 'Atendimento que some depois da venda',
    fix: 'Você fala com quem acompanha o seu pedido do orçamento até a instalação.',
    quote: 'Do início da compra até o pós venda perfeito',
    who: 'Clínica Joyce Quinas',
  },
];

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problema-h" className="bg-deep text-frost px-page py-section">
      <SectionHead
        id="problema-h"
        dark
        label="Por que a JEL BOX"
        title="Box e janela sem dor de cabeça"
        aside={<p className="text-ice/80">Os problemas que mais ouvimos de quem já contratou outra vidraçaria, e como resolvemos cada um.</p>}
      />
      <ol className="mt-14 grid gap-x-6 gap-y-12 lg:mt-20 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal as="li" order={i} key={it.pain} className="border-ice/20 grid content-start gap-4 border-t pt-6">
            <p className="font-title text-h3 text-ice/55 leading-[1.15] font-medium tracking-[-0.02em] line-through decoration-bronze/70 decoration-2">
              <span className="sr-only">Problema: </span>
              {it.pain}
            </p>
            <p className="text-frost text-[clamp(17px,1.25vw,19px)] leading-[1.5]">{it.fix}</p>
            <p className="text-ice/70 text-small">
              “{it.quote}” <span className="text-ice/50">· {it.who}, no Google</span>
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
