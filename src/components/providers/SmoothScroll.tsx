"use client";

import Lenis from "lenis";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react";

type SmoothScrollControls = {
    start: () => void;
    stop: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollControls>({
    start: () => { },
    stop: () => { },
});

export function useSmoothScroll() {
    return useContext(SmoothScrollContext);
}

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    const controls = useMemo(
        () => ({
            start: () => lenisRef.current?.start(),
            stop: () => lenisRef.current?.stop(),
        }),
        [],
    );

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.13,
            wheelMultiplier: 1.15,
            touchMultiplier: 1,
        });

        lenisRef.current = lenis;

        let frameId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={controls}>
            {children}
        </SmoothScrollContext.Provider>
    );
}