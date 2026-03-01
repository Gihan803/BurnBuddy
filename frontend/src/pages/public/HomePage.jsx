import HeroSection from '../../components/public/home/HeroSection';
import FeaturesSection from '../../components/public/home/FeaturesSection';
import TestimonialsSection from '../../components/public/home/TestimonialsSection';
import PricingSection from '../../components/public/home/PricingSection';
import CtaSection from '../../components/public/home/CtaSection';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <CtaSection />
        </div>
    );
}
