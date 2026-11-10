
import Splash from '@/components/sections/Splash'
import Story from '@/components/sections/Story'
import Focus from '@/components/sections/Focus'
import Services from '@/components/sections/Services'
import Marquee from '@/components/sections/Marquee'
import Cases from '@/components/sections/Cases'
import Faq from '@/components/sections/Faq'
import StudioPartner from '@/components/sections/StudioPartner'

export default function Home() {
  return (
    <>
      <Splash/>
      <Story/>
      <Cases/>
      <Focus/>
      <Services/>
      <Marquee/>
      <StudioPartner/>
      <Faq/>
    </>
  );
}
