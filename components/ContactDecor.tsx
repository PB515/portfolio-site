// Contact-page accent — 240×240, lines gently converging toward center (toward
// the form). Root = circuit converge; Canopy = branch converge. Low intensity,
// token-bound, theme-swap. Place behind the contact grid (absolute inset-0).
export function ContactDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute select-none ${className}`}>
      {/* ROOT — circuit converge */}
      <svg
        className="decor-root h-full w-full text-primary"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 42H52V64H78V88H98" />
          <path d="M30 118H68V104H92" />
          <path d="M24 198H58V176H84V154H102" />
          <path d="M222 42H188V64H162V88H142" />
          <path d="M210 118H172V104H148" />
          <path d="M216 198H182V176H156V154H138" />
          <path d="M120 18V52H106V78H102" />
          <path d="M120 222V188H134V162H138" />
          <path d="M98 88C106 96 112 104 116 112" />
          <path d="M142 88C134 96 128 104 124 112" />
          <path d="M102 154C109 146 114 138 118 130" />
          <path d="M138 154C131 146 126 138 122 130" />
          <path d="M52 64C46 56 39 49 30 44" />
          <path d="M188 64C194 56 201 49 210 44" />
          <path d="M58 176C50 183 42 190 32 194" />
          <path d="M182 176C190 183 198 190 208 194" />
        </g>
        <g fill="currentColor">
          <circle cx="52" cy="64" r="3.2" />
          <circle cx="98" cy="88" r="3.2" />
          <circle cx="92" cy="104" r="3.2" />
          <circle cx="58" cy="176" r="3.2" />
          <circle cx="102" cy="154" r="3.2" />
          <circle cx="188" cy="64" r="3.2" />
          <circle cx="142" cy="88" r="3.2" />
          <circle cx="148" cy="104" r="3.2" />
          <circle cx="182" cy="176" r="3.2" />
          <circle cx="138" cy="154" r="3.2" />
          <circle cx="106" cy="78" r="3.2" />
          <circle cx="134" cy="162" r="3.2" />
        </g>
      </svg>

      {/* CANOPY — branch converge */}
      <svg
        className="decor-canopy h-full w-full text-muted"
        viewBox="0 0 240 240"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 46C34 50 49 59 61 71C74 83 84 97 90 112" />
          <path d="M26 108C42 108 57 104 71 96C84 89 95 79 103 67" />
          <path d="M42 22C51 34 62 44 75 51" />
          <path d="M222 194C206 190 191 181 179 169C166 157 156 143 150 128" />
          <path d="M214 132C198 132 183 136 169 144C156 151 145 161 137 173" />
          <path d="M198 218C189 206 178 196 165 189" />
          <path d="M120 26C118 44 113 61 104 76" />
          <path d="M120 214C122 196 127 179 136 164" />
          <path d="M90 112C97 118 103 124 107 132" />
          <path d="M150 128C143 122 137 116 133 108" />
        </g>
        <g fill="currentColor">
          <path d="M71 96C79 89 88 87 97 90C90 97 81 99 71 96Z" />
          <path d="M75 51C84 45 93 44 101 48C94 54 85 56 75 51Z" />
          <path d="M42 22C34 16 32 8 34 0C42 6 45 14 42 22Z" />
          <path d="M169 144C161 151 152 153 143 150C150 143 159 141 169 144Z" />
          <path d="M165 189C156 195 147 196 139 192C146 186 155 184 165 189Z" />
          <path d="M198 218C206 224 208 232 206 240C198 234 195 226 198 218Z" />
        </g>
      </svg>
    </div>
  );
}
