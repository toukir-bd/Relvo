export default function FooterConversationArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 440 300" fill="none" className="relative h-full w-[100%] max-w-[960px] overflow-visible">
      <path d="M44 165c29-74 98-111 176-111 88 0 159 45 179 111 18 60-27 107-90 120" stroke="#BBFF00" strokeOpacity=".24" strokeWidth="1.5" strokeDasharray="3 9" />
      <path d="m68 229 45-37m220-93 29-27m-23 176 36 16" stroke="white" strokeOpacity=".22" strokeWidth="1.5" strokeLinecap="round" />

      {/* Main conversation card, sketched with a second imperfect outline */}
      <g className="footer-conversation-main" strokeLinecap="round" strokeLinejoin="round">
        <path d="m73 74 226-7c11 0 17 7 17 17v105c0 10-7 16-17 16h-97l-42 34 9-34H88c-10 0-17-7-17-17V91c0-10 2-16 2-17Z" stroke="white" strokeOpacity=".72" strokeWidth="2.2" />
        <path d="m79 79 215-6c8 0 14 6 14 14v99c0 8-6 13-15 13h-96l-33 28 7-28H90c-8 0-14-6-14-14V92c0-7 1-10 3-13Z" stroke="#BBFF00" strokeOpacity=".34" strokeWidth="1.1" />
        <circle cx="101" cy="105" r="14" stroke="#BBFF00" strokeWidth="1.8" />
        <path d="M95 105h12m-6-6v12" stroke="#BBFF00" strokeWidth="1.8" />
        <path d="M128 101h109m-109 12h73" stroke="white" strokeOpacity=".68" strokeWidth="4" />
        <path d="M95 145c0-5 4-9 9-9h169c5 0 9 4 9 9v27c0 5-4 9-9 9h-89l-27 19 5-19h-58c-5 0-9-4-9-9Z" stroke="#BBFF00" strokeOpacity=".8" strokeWidth="1.8" />
        <path d="M115 154h106m-106 10h72" stroke="white" strokeOpacity=".54" strokeWidth="3.5" />
      </g>

      {/* Reply bubble */}
      <g className="footer-conversation-reply" strokeLinecap="round" strokeLinejoin="round">
        <path d="m255 184 121-4c8 0 13 6 13 14v47c0 8-5 13-13 13h-53l-25 19 5-19h-46c-8 0-13-5-13-13v-44c0-8 4-13 11-13Z" stroke="#BBFF00" strokeOpacity=".82" strokeWidth="2" />
        <path d="m276 207 73-2m-73 11 53-1" stroke="white" strokeOpacity=".66" strokeWidth="3.5" />
        <path d="m353 237 7 7 13-16" stroke="#BBFF00" strokeWidth="2.5" />
      </g>

      {/* Hand-drawn accents */}
      <path d="m61 113-12-2m13 10-9 5m331 69 11-5m-7 14 12 1" stroke="#BBFF00" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="58" cy="190" r="4" fill="#BBFF00" />
      <circle cx="393" cy="126" r="3" fill="#BBFF00" />
    </svg>
  );
}
