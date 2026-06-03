// Footer/CTA grounding — wide 1200×240 horizontal decor along the bottom of the
// global footer (every page). Sits behind content, low opacity, bottom-anchored.
//   Root  → user's grounded circuit flow (public/decor/root/footer-cta.svg)
//   Canopy→ branch/leaf closure placeholder until canopy/footer-cta.svg exists
// Colors bound to tokens; CSS in globals.css swaps per theme.
export function FooterDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — grounded circuit flow */}
      <svg className="decor-root w-full text-primary" viewBox="0 0 1200 240" fill="none">
        <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 206H116V186H198" />
          <path d="M52 224H146V206" />
          <path d="M198 186H286" />
          <path d="M286 186V168H362" />
          <path d="M420 198H500" />
          <path d="M700 198H780" />
          <path d="M838 168H914V186H1002" />
          <path d="M1002 186H1084V206H1182" />
          <path d="M1054 224H1148V206" />
          <path d="M22 232C40 219 57 202 69 183C82 162 89 140 90 116" />
          <path d="M69 183C54 178 39 168 26 154" />
          <path d="M69 183C86 176 102 166 116 152" />
          <path d="M90 116C104 104 115 90 124 74" />
          <path d="M124 74C136 68 146 60 154 50" />
          <path d="M1178 232C1160 219 1143 202 1131 183C1118 162 1111 140 1110 116" />
          <path d="M1131 183C1146 178 1161 168 1174 154" />
          <path d="M1131 183C1114 176 1098 166 1084 152" />
          <path d="M1110 116C1096 104 1085 90 1076 74" />
          <path d="M1076 74C1064 68 1054 60 1046 50" />
          <path d="M548 216H588" />
          <path d="M612 216H652" />
        </g>
        <g fill="currentColor">
          <circle cx="198" cy="186" r="3.2" />
          <circle cx="146" cy="206" r="3.2" />
          <circle cx="286" cy="186" r="3.2" />
          <circle cx="362" cy="168" r="3.2" />
          <circle cx="500" cy="198" r="3.2" />
          <circle cx="700" cy="198" r="3.2" />
          <circle cx="838" cy="168" r="3.2" />
          <circle cx="1002" cy="186" r="3.2" />
          <circle cx="1084" cy="206" r="3.2" />
          <circle cx="116" cy="152" r="3.2" />
          <circle cx="154" cy="50" r="3.2" />
          <circle cx="1084" cy="152" r="3.2" />
          <circle cx="1046" cy="50" r="3.2" />
          <circle cx="588" cy="216" r="3.2" />
          <circle cx="612" cy="216" r="3.2" />
        </g>
      </svg>

      {/* CANOPY — branch closure */}
      <svg className="decor-canopy w-full text-muted" viewBox="0 0 1200 240" fill="none">
        <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 228C34 216 50 201 63 183C76 164 84 144 88 121" />
          <path d="M63 183C81 179 99 172 115 161C130 151 144 138 155 123" />
          <path d="M88 121C101 129 112 141 121 155" />
          <path d="M88 121C101 112 112 101 121 87" />
          <path d="M128 208C148 201 167 191 184 177C202 163 216 147 228 129" />
          <path d="M208 224C232 219 256 216 280 215" />
          <path d="M314 220C336 218 358 217 380 217" />
          <path d="M1182 228C1166 216 1150 201 1137 183C1124 164 1116 144 1112 121" />
          <path d="M1137 183C1119 179 1101 172 1085 161C1070 151 1056 138 1045 123" />
          <path d="M1112 121C1099 129 1088 141 1079 155" />
          <path d="M1112 121C1099 112 1088 101 1079 87" />
          <path d="M1072 208C1052 201 1033 191 1016 177C998 163 984 147 972 129" />
          <path d="M992 224C968 219 944 216 920 215" />
          <path d="M886 220C864 218 842 217 820 217" />
          <path d="M548 226H588" />
          <path d="M612 226H652" />
        </g>
        <g fill="currentColor">
          <path d="M155 123C165 115 175 113 185 116C177 124 167 126 155 123Z" />
          <path d="M121 155C130 147 140 145 150 148C142 156 132 158 121 155Z" />
          <path d="M121 87C130 79 140 77 150 80C142 88 132 90 121 87Z" />
          <path d="M228 129C238 121 248 119 258 122C250 130 240 132 228 129Z" />
          <path d="M1045 123C1035 115 1025 113 1015 116C1023 124 1033 126 1045 123Z" />
          <path d="M1079 155C1070 147 1060 145 1050 148C1058 156 1068 158 1079 155Z" />
          <path d="M1079 87C1070 79 1060 77 1050 80C1058 88 1068 90 1079 87Z" />
          <path d="M972 129C962 121 952 119 942 122C950 130 960 132 972 129Z" />
        </g>
      </svg>
    </div>
  );
}
