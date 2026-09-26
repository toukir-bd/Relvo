
"use client";

export default function ScrollToDiscover() {
    const scrollToDiscover = () => {
        document
            .getElementById("discover-us")
            ?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <button type="button" onClick={scrollToDiscover} className="group inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-white transition hover:text-primary bg-secondary/40 p-1.5 pe-7 rounded-full">
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 transition group-hover:border-primary/35 group-hover:bg-black/35 group-hover:text-primary">
                <svg className="mouse" width="20px" viewBox="0 0 247 390" xmlns="http://www.w3.org/2000/svg">
                    <path className='stroke-secondary' id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" fill="#BBFF00" stroke="#051313" strokeWidth="10px" />
                    <path className='stroke-secondary' id="wheel" d="M123.359,79.775l0,72.843" fill="#051313" stroke="#051313" strokeWidth="30px"/>
                </svg>
            </span>
            <span className="text-[16px] font-thin tracking-wide">Scroll to Discover</span>
        </button>
    );
}