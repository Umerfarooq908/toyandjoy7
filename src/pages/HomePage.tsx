import HeroBanner from '@/components/HeroBanner';
import TrustBenefits from '@/components/TrustBenefits';
import CategoryGrid from '@/components/CategoryGrid';
import AgeCategories from '@/components/AgeCategories';
import BestSellers from '@/components/BestSellers';
import PromotionalBanner from '@/components/PromotionalBanner';
import NewArrivals from '@/components/NewArrivals';
import WhyChooseUs from '@/components/WhyChooseUs';
import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBenefits />
      <CategoryGrid />
      <AgeCategories />
      <BestSellers />
      <PromotionalBanner />
      <NewArrivals />
      <WhyChooseUs />
      <Newsletter />
    </>
  );
}
