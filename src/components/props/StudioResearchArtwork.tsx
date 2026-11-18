export default function StudioResearchArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 640 700" className="studio-partner-scene" fill="none">
      <defs>
        <linearGradient id="research-wash" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#BBFF00" stopOpacity=".14"/><stop offset="1" stopColor="#72E6C5" stopOpacity=".04"/></linearGradient>
        <filter id="research-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity=".28"/></filter>
      </defs>
      <ellipse cx="330" cy="356" rx="300" ry="295" fill="url(#research-wash)"/>
      <path d="M72 474c82-90 131-127 201-153 69-26 110-13 164-73 35-39 71-70 126-87" stroke="#BBFF00" strokeOpacity=".32" strokeWidth="1.5" strokeDasharray="3 10" className="studio-partner-flow"/>
      <g className="studio-partner-sketch" strokeLinecap="round" strokeLinejoin="round">
        <path d="m45 211 155-13 17 211-155 13Z" stroke="white" strokeOpacity=".5" strokeWidth="2"/><path d="m54 221 137-11 14 191-136 11Z" stroke="white" strokeOpacity=".18"/>
        <path d="m73 246 76-6m-74 17 53-4m-50 28 94-8m-91 18 76-6" stroke="white" strokeOpacity=".48" strokeWidth="3"/><circle cx="91" cy="337" r="24" stroke="#BBFF00" strokeWidth="2.4"/><path d="m108 354 17 18m-42-35 7 7 12-16" stroke="#BBFF00" strokeWidth="3"/><path d="m143 326 34-3m-31 13 39-3m-37 13 27-2" stroke="white" strokeOpacity=".45" strokeWidth="2.5"/><path d="m66 388 30-2" stroke="#72E6C5" strokeWidth="4"/>
      </g>
      <g className="studio-partner-board" filter="url(#research-shadow)">
        <rect x="154" y="131" width="371" height="405" rx="8" fill="#ffffff" transform="rotate(-2 154 131)"/><path d="m185 180 297-10" stroke="#18221B" strokeOpacity=".22" strokeWidth="2"/><circle cx="193" cy="157" r="5" fill="#BBFF00"/><circle cx="210" cy="156" r="5" fill="#73DCC0"/><circle cx="227" cy="156" r="5" fill="#F0A678"/>
        <path d="m189 205 110-7m-109 22 83-5" stroke="#16221A" strokeWidth="4" strokeLinecap="round"/><rect x="190" y="251" width="106" height="97" rx="5" fill="#DDE8D6"/><path d="m205 320 25-30 20 17 29-39m-75 65 76-5" stroke="#537E4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="314" y="250" width="161" height="37" rx="4" fill="#E8E9DF"/><circle cx="331" cy="268" r="7" fill="#BBFF00"/><path d="m347 264 102-5m-102 13 69-4" stroke="#18221B" strokeOpacity=".56" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="314" y="301" width="161" height="37" rx="4" fill="#E8E9DF"/><circle cx="331" cy="319" r="7" fill="#73DCC0"/><path d="m347 315 102-5m-102 13 69-4" stroke="#18221B" strokeOpacity=".56" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="314" y="352" width="161" height="37" rx="4" fill="#E8E9DF"/><circle cx="331" cy="370" r="7" fill="#F0A678"/><path d="m347 366 102-5m-102 13 69-4" stroke="#18221B" strokeOpacity=".56" strokeWidth="2.5" strokeLinecap="round"/><path d="m191 383 283-10m-277 37 60-2m-60 13 95-4m-94 51 78-3m-77 14 130-5" stroke="#18221B" strokeOpacity=".3" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="m391 425 10 10 19-24" stroke="#78A92E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="m431 432 45-2" stroke="#18221B" strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      <g className="studio-partner-palette" strokeLinecap="round" strokeLinejoin="round"><path d="m467 95 95 73-16 21-95-73Z" fill="red" stroke="white" strokeOpacity=".48" strokeWidth="1.5"/><path d="m451 116 95 73-9 13-95-73Z" fill="#BBFF00" stroke="white" strokeOpacity=".48" strokeWidth="1.5"/><path d="m436 138 95 73-8 11-95-73Z" fill="teal" stroke="white" strokeOpacity=".48" strokeWidth="1.5"/></g>
      <g className="studio-partner-phone" strokeLinecap="round" strokeLinejoin="round"><path d="m407 477 121-8 14 119-121 8Z" fill="silver" stroke="white" strokeOpacity=".5" strokeWidth="2"/><path d="m422 493 80-5" stroke="white" strokeOpacity=".75" strokeWidth="3"/><circle cx="441" cy="526" r="10" fill="black"/><path d="m461 521 59-4m-58 13 40-3m-70 28 84-6m-80 21 65-4" stroke="white" strokeOpacity=".57" strokeWidth="2.5"/><path d="m432 555 84-6" stroke="#73DCC0" strokeWidth="4"/></g>
      <circle cx="555" cy="287" r="4" fill="#BBFF00" className="studio-partner-spark"/><circle cx="117" cy="469" r="3" fill="#73DCC0" className="studio-partner-spark studio-partner-spark-delay"/>
    </svg>
  );
}
