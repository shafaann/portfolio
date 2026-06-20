import React from 'react';
import { services } from '../data/portfolio';
import { ModernPricingPage } from '../components/ui/animated-glassy-pricing';

export default function Services() {
  const plans = services.map((service, idx) => ({
    planName: service.title,
    description: service.description,
    price: service.rate.replace('₹', ''), // clean up currency symbol for the pricing block
    features: service.deliverables,
    buttonText: 'Get Started',
    isPopular: idx === 1, // highlight Machine Learning Solutions as popular
    buttonVariant: idx % 2 === 0 ? 'primary' : 'secondary',
  }));

  return (
    <div className="pt-24 pointer-events-none">
      <ModernPricingPage
        title={
          <>
            Flexible & <span className="text-cyan-400">Professional Services</span>
          </>
        }
        subtitle="Data-driven pipelines and creative systems built for clarity, impact, and strategic scalability."
        plans={plans}
        showAnimatedBackground={true}
      />
    </div>
  );
}
