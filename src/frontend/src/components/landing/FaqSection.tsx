import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { tbnCopy } from '../../content/tbnCopy';

export default function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground">
            {tbnCopy.faq.title}
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {tbnCopy.faq.questions.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-6 bg-card/50 hover:bg-card transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:text-gold hover:no-underline py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
