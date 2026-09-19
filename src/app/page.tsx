
import Splash from '../components/sections/Splash'
import Story from '../components/sections/Story'
import Focus from '../components/sections/Focus'
import Packages from '../components/sections/Packages'
import Manage from '../components/sections/Manage'
import Services from '../components/sections/Services'
import Clients from '../components/sections/Clients'
import Started from '../components/sections/Started'
import MarqueeText from '@/components/sections/MarqueeText'


export default function Home() {
  return (
    <>
      <Splash/>
      <Story/>
      <MarqueeText/>
      <Packages/>
      <Focus/>
      <Services/>
      <Manage/>
      <Clients/>
      <Started/>
    </>
  );
}
