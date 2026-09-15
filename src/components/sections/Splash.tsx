

import Image from "next/image";

export default function Splash() {
  return (
    <> 
        <div className="flex flex-col items-center justify-center relative min-h-screen z-10 bg-backdrop-blur-sm">
            <div className="absolute inset-0 pointer-events-none w-full min-h-screen z-0 opacity-20">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata" 
                    className="initial visible block pointer-events-none h-full object-cover w-full" 
                    src="/videos/hero.mp4">
                </video>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* <div className="absolute inset-0 bg-[#061018]/70 z-1"></div> */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#061018]/20 to-[#061018]/0 z-1 flex flex-col items-center justify-center">
                    <Image
                        src="/img/elements/logo-animo.svg"
                        alt="BeRiser Logo"
                        width={138}
                        height={138}
                        className="w-full max-w-[238px] h-auto px-5"
                        priority
                    />
                    <h1 className="mt-10 text-white text-[109px] font-black tracking-normal leading-[115px] text-center">
                        crafted for the rise <br />
                        to web universe
                    </h1>
                    <p className="mt-8 mb-12 text-[20px] font-[500] leading-[32px] text-center text-gray-100">
                        It&apos;s never just about building a Website, App, or Custom Software. <br />
                        it&apos;s about creating trust, meaningful connections, and digital <br/>
                        experiences that inspire confidence.
                    </p>
                </div>
            </div>
            {/* <div className="absolute left-0 top-50 bg-gradient-to-b from-[#061018]/20 to-[#061018]/0 z-20 flex flex-col items-center justify-center">
                <Image
                    src="/img/elements/side-frame.png"
                    alt="BeRiser Logo"
                    width={250}
                    height={300}
                    className="w-full max-w-[250px] h-auto"
                    priority
                />
            </div>
            <div className="absolute right-0 top-50 bg-gradient-to-b from-[#061018]/20 to-[#061018]/0 z-20 flex flex-col items-center justify-center">
                <Image
                    src="/img/elements/side-frame-0.png"
                    alt="BeRiser Logo"
                    width={250}
                    height={300}
                    className="w-full max-w-[250px] h-auto"
                    priority
                />
            </div> */}
        </div>
    </>
  );
}