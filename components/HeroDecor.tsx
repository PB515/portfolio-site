// Home-hero framing decor — theme-swapped 240×240 motif with an open center,
// meant to sit behind/around the hero (absolute inset-0, low opacity, -z-10).
//   Root  → user's circuit-cluster art (public/decor/root/home-hero.svg)
//   Canopy→ branch/leaf placeholder until public/decor/canopy/home-hero.svg exists
// Colors bound to tokens via currentColor; CSS in globals.css swaps per theme.
export function HeroDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — circuit clusters (TL + BR), open center */}
      <svg
        className="decor-root h-full w-full text-primary"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 96C20 84 31 71 40 56C49 41 55 25 58 8" />
          <path d="M18 142C28 126 36 109 41 91C46 73 49 54 49 36" />
          <path d="M8 156H28V132H52V108H76" />
          <path d="M22 26H44V44H66V62H88" />
          <path d="M56 8V28H72V46" />
          <path d="M34 84C46 80 57 73 67 63" />
          <path d="M41 118C53 113 65 105 76 95" />
          <path d="M232 144C220 156 209 169 200 184C191 199 185 215 182 232" />
          <path d="M222 98C212 114 204 131 199 149C194 167 191 186 191 204" />
          <path d="M232 84H212V108H188V132H164" />
          <path d="M218 214H196V196H174V178H152" />
          <path d="M184 232V212H168V194" />
          <path d="M206 156C194 160 183 167 173 177" />
          <path d="M199 122C187 127 175 135 164 145" />
          <path d="M96 18H118" />
          <path d="M122 222H144" />
        </g>
        <g fill="currentColor">
          <circle cx="76" cy="108" r="3.2" />
          <circle cx="88" cy="62" r="3.2" />
          <circle cx="46" cy="46" r="3.2" />
          <circle cx="72" cy="28" r="3.2" />
          <circle cx="67" cy="63" r="3.2" />
          <circle cx="76" cy="95" r="3.2" />
          <circle cx="164" cy="132" r="3.2" />
          <circle cx="152" cy="178" r="3.2" />
          <circle cx="196" cy="196" r="3.2" />
          <circle cx="168" cy="212" r="3.2" />
          <circle cx="173" cy="177" r="3.2" />
          <circle cx="164" cy="145" r="3.2" />
          <circle cx="118" cy="18" r="3.2" />
          <circle cx="122" cy="222" r="3.2" />
        </g>
      </svg>

      {/* CANOPY — branch placeholder (TL + BR sprigs), open center */}
      <svg
        className="decor-canopy h-full w-full text-muted"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 86C18 73 26 60 36 48C50 31 66 18 86 10" />
          <path d="M18 132C24 116 31 101 40 87C48 74 58 62 70 52" />
          <path d="M34 40C47 44 59 50 69 58C79 66 87 76 93 88" />
          <path d="M40 88C53 87 65 83 76 76C87 69 96 61 104 50" />
          <path d="M56 118C67 113 77 106 86 97C94 89 101 80 106 70" />
          <path d="M84 16C91 25 96 35 99 46" />
          <path d="M230 154C222 167 214 180 204 192C190 209 174 222 154 230" />
          <path d="M222 108C216 124 209 139 200 153C192 166 182 178 170 188" />
          <path d="M206 200C193 196 181 190 171 182C161 174 153 164 147 152" />
          <path d="M200 152C187 153 175 157 164 164C153 171 144 179 136 190" />
          <path d="M184 122C173 127 163 134 154 143C146 151 139 160 134 170" />
          <path d="M156 224C149 215 144 205 141 194" />
          <path d="M118 12H138" />
          <path d="M102 228H122" />
        </g>
        <g fill="currentColor">
          <path d="M69 58C77 51 86 49 95 52C88 59 79 61 69 58Z" />
          <path d="M93 88C101 81 110 79 119 82C112 89 103 91 93 88Z" />
          <path d="M76 76C84 69 93 67 102 70C95 77 86 79 76 76Z" />
          <path d="M86 97C94 90 103 88 112 91C105 98 96 100 86 97Z" />
          <path d="M99 46C92 39 90 30 92 21C99 27 102 36 99 46Z" />
          <path d="M171 182C163 189 154 191 145 188C152 181 161 179 171 182Z" />
          <path d="M147 152C139 159 130 161 121 158C128 151 137 149 147 152Z" />
          <path d="M164 164C156 171 147 173 138 170C145 163 154 161 164 164Z" />
          <path d="M154 143C146 150 137 152 128 149C135 142 144 140 154 143Z" />
          <path d="M141 194C148 201 150 210 148 219C141 213 138 204 141 194Z" />
        </g>
      </svg>
    </div>
  );
}
