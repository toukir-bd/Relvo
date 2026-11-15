import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StudioPartner() {
  return (
    <section aria-labelledby="studio-partner-title" className="px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-[4.7vw] lg:py-30">
      <div className="mx-auto grid w-full max-w-none overflow-hidden rounded-[28px] bg-primary/2.5 sm:rounded-[36px] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative p-7 sm:p-12 lg:p-16 xl:p-[4.5rem]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.11] [background-size:4px_4px] [background-image:linear-gradient(rgba(187,255,0,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(187,255,0,0.25)_1px,transparent_1px)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 size-96 rounded-full bg-primary/15 blur-[90px]" />
          <div className="relative mb-8">
            <h2 id="studio-partner-title" className="focus-title text-[clamp(3rem,6.2vw,5rem)] font-semibold leading-[1] tracking-normal">
              the team behind <span className="hero-text-neon pb-2">your digital products.</span>
            </h2>
          </div>
          <p className="mb-10 self-center text-[20px] leading-[1.75] text-white/70 sm:text-[27px] font-[400] sm:leading-[1.6] border-t border-white/[0.12] pt-5">
            Our designers and developers collaborate closely to create <strong className="font-semibold text-white">digital products that meet real business goals</strong>, with thoughtful design, reliable technology, and a clear path forward.
          </p>
          <Link href="/#contact" className="btn-relvo">
            <span className="btnText">
              Discuss Your Project
            </span>
            <span className="iconArea">
              <ArrowUpRight strokeWidth={1.5} />
            </span>
          </Link>
        </div>
        <div className="relative min-h-[400px] overflow-hidden border-t border-primary/5 sm:min-h-[520px] lg:min-h-full lg:border-l lg:border-t-0">
          <div aria-hidden="true" className="studio-partner-artwork" />
          <svg aria-hidden="true" viewBox="0 0 640 700" className="studio-partner-scene" fill="none">
            <defs>
              <linearGradient id="idea-card" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1c2d20" /><stop offset="1" stopColor="#0a1310" /></linearGradient>
              <radialGradient id="idea-core"><stop stopColor="#d7ff68" stopOpacity=".9" /><stop offset=".42" stopColor="#BBFF00" stopOpacity=".42" /><stop offset="1" stopColor="#BBFF00" stopOpacity="0" /></radialGradient>
              <filter id="idea-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="14" /></filter>
            </defs>
            <ellipse cx="320" cy="350" rx="236" ry="178" stroke="#BBFF00" strokeOpacity=".16" strokeDasharray="2 10" className="studio-partner-orbit" />
            <ellipse cx="320" cy="350" rx="170" ry="267" stroke="#BBFF00" strokeOpacity=".12" strokeDasharray="3 12" className="studio-partner-orbit-reverse" />
            <path d="M320 350C282 278 220 242 142 228M320 350c55-88 113-128 176-130M320 350c-85 42-139 91-186 160M320 350c98 45 147 97 202 163" stroke="#BBFF00" strokeOpacity=".48" strokeWidth="1.5" strokeDasharray="5 11" className="studio-partner-flow" />
            <g className="studio-partner-float-a">
              <rect x="47" y="147" width="188" height="128" rx="20" fill="url(#idea-card)" stroke="#BBFF00" strokeOpacity=".32" />
              <rect x="64" y="164" width="154" height="23" rx="8" fill="#243828" /><circle cx="78" cy="175" r="3" fill="#BBFF00" /><circle cx="90" cy="175" r="3" fill="#BBFF00" fillOpacity=".5" />
              <rect x="65" y="203" width="48" height="54" rx="8" fill="#BBFF00" fillOpacity=".15" /><path d="M76 237h25m-25-10h25m-25-10h16" stroke="#BBFF00" strokeWidth="3" strokeLinecap="round" /><path d="M125 207h76m-76 13h58m-58 13h67m-67 13h41" stroke="white" strokeOpacity=".54" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g className="studio-partner-float-b">
              <rect x="420" y="153" width="172" height="129" rx="20" fill="url(#idea-card)" stroke="#BBFF00" strokeOpacity=".32" /><path d="M442 179h58m-58 12h40" stroke="white" strokeOpacity=".55" strokeWidth="4" strokeLinecap="round" /><rect x="440" y="207" width="132" height="57" rx="9" fill="#16271b" /><path d="m451 250 26-19 20 10 22-22 17 13 23-17" stroke="#BBFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><circle cx="451" cy="250" r="3.5" fill="#d7ff68" /><circle cx="559" cy="215" r="3.5" fill="#d7ff68" />
            </g>
            <g className="studio-partner-float-c">
              <rect x="62" y="442" width="170" height="128" rx="20" fill="url(#idea-card)" stroke="#BBFF00" strokeOpacity=".3" /><rect x="78" y="459" width="61" height="94" rx="11" fill="#1a2c1f" stroke="white" strokeOpacity=".12" /><rect x="86" y="470" width="45" height="31" rx="5" fill="#BBFF00" fillOpacity=".7" /><path d="M86 514h36m-36 10h29m-29 10h36" stroke="white" strokeOpacity=".62" strokeWidth="3" strokeLinecap="round" /><path d="M151 474h63m-63 13h49m-49 13h57m-57 28h57m-57 13h42" stroke="white" strokeOpacity=".44" strokeWidth="4" strokeLinecap="round" /><rect x="151" y="538" width="46" height="15" rx="7.5" fill="#BBFF00" />
            </g>
            <g className="studio-partner-float-a">
              <rect x="425" y="442" width="176" height="128" rx="20" fill="url(#idea-card)" stroke="#BBFF00" strokeOpacity=".3" /><circle cx="454" cy="476" r="13" fill="#BBFF00" fillOpacity=".18" /><path d="M449 476h10m-5-5v10" stroke="#BBFF00" strokeWidth="2" strokeLinecap="round" /><path d="M478 471h92m-92 10h66" stroke="white" strokeOpacity=".48" strokeWidth="4" strokeLinecap="round" /><path d="M448 532h125" stroke="white" strokeOpacity=".14" /><rect x="449" y="543" width="17" height="13" rx="4" fill="#BBFF00" fillOpacity=".8" /><rect x="474" y="538" width="17" height="18" rx="4" fill="#BBFF00" fillOpacity=".55" /><rect x="499" y="529" width="17" height="27" rx="4" fill="#BBFF00" fillOpacity=".42" /><rect x="524" y="519" width="17" height="37" rx="4" fill="#BBFF00" fillOpacity=".3" />
            </g>
            <circle cx="320" cy="350" r="101" fill="#BBFF00" fillOpacity=".3" filter="url(#idea-glow)" className="studio-partner-core" />
            <g className="studio-partner-core">
              <circle cx="320" cy="350" r="79" fill="#0b1510" fillOpacity=".96" stroke="#BBFF00" strokeOpacity=".58" /><circle cx="320" cy="350" r="62" fill="url(#idea-core)" /><circle cx="320" cy="350" r="45" fill="#BBFF00" fillOpacity=".13" stroke="#BBFF00" strokeOpacity=".4" />
            </g>
            <circle cx="84" cy="356" r="4" fill="#BBFF00" className="studio-partner-spark" /><path d="m548 341 4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9Z" fill="#d7ff68" className="studio-partner-spark studio-partner-spark-delay" /><circle cx="327" cy="83" r="3" fill="#BBFF00" className="studio-partner-spark studio-partner-spark-delay" />
          </svg>
          <Image
            src="/img/elements/favicon-48x48.webp"
            alt=""
            width={48}
            height={48}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[47%] z-10 size-12 -translate-x-1/2 -translate-y-1/2 rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
