/**
 * How the two live systems fit together: the AI agent that sells on Meta, and
 * the Laravel shop that owns the stock. Inline SVG rather than an exported
 * image so the labels stay sharp, searchable and readable on a phone.
 */
const ORANGE = '#FF5A1F'
const BLUE = '#6FB4FF'
const GREEN = '#34D399'
const LINE = '#3a3a3a'
const TEXT = '#E6E6E6'
const MUTED = '#9A9A9A'

function Box({ x: x0, y: y0, w, h, title, sub, accent = ORANGE, chips = [] }) {
  // Coords arrive as SVG attribute strings; arithmetic on those concatenates.
  const x = Number(x0)
  const y = Number(y0)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#161616" stroke={accent} strokeOpacity="0.45" />
      <rect x={x} y={y} width={w} height="3" rx="1.5" fill={accent} />
      <text x={x + 14} y={y + 26} fill={TEXT} fontSize="14" fontWeight="600">{title}</text>
      {sub && <text x={x + 14} y={y + 44} fill={MUTED} fontSize="11">{sub}</text>}
      {chips.map((c, i) => {
        const cw = 7.1 * c.length + 16
        return (
          <g key={c}>
            <rect x={x + 14} y={y + 58 + i * 26} width={cw} height="20" rx="5" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.3" />
            <text x={x + 22} y={y + 72 + i * 26} fill={TEXT} fontSize="11">{c}</text>
          </g>
        )
      })}
    </g>
  )
}

function Pill({ x: x0, y: y0, label, accent = MUTED }) {
  const x = Number(x0)
  const y = Number(y0)
  const w = 7.1 * label.length + 20
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="13" fill="#111" stroke={accent} strokeOpacity="0.4" />
      <text x={x + 10} y={y + 17} fill={TEXT} fontSize="11">{label}</text>
    </g>
  )
}

/** Arrow with an optional label sitting on the line. */
function Arrow({ d, label, labelX, labelY, accent = LINE, dashed = false, both = false }) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray={dashed ? '5 4' : undefined}
        markerEnd="url(#ah)"
        markerStart={both ? 'url(#ahs)' : undefined}
      />
      {label && (
        <>
          <rect x={labelX - 4} y={labelY - 11} width={6.2 * label.length + 8} height="16" rx="4" fill="#0D0D0D" />
          <text x={labelX} y={labelY} fill={MUTED} fontSize="10.5">{label}</text>
        </>
      )}
    </g>
  )
}

export default function ArchitectureDiagram() {
  return (
    <figure className="bg-brand-card border border-brand-border rounded-xl p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 900 600"
        className="w-full min-w-[640px] h-auto"
        role="img"
        aria-label="Architecture: Messenger, Instagram and the website chat reach the Nuigent agent, which sells through a scoped API on the Everyday Crackers Laravel shop; the shop owns stock and talks to the courier, SMS and Google Sheets."
      >
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LINE} />
          </marker>
          <marker id="ahs" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 10 0 L 0 5 L 10 10 z" fill={LINE} />
          </marker>
        </defs>

        {/* People */}
        <text x="20" y="26" fill={MUTED} fontSize="10.5" letterSpacing="1.2">PEOPLE</text>
        <Pill x="20" y="40" label="Messenger" accent={BLUE} />
        <Pill x="20" y="76" label="Instagram" accent={BLUE} />
        <Pill x="20" y="112" label="Website chat" accent={BLUE} />
        <Pill x="20" y="300" label="Web shopper" accent={GREEN} />

        {/* Agent */}
        <Box
          x="200" y="34" w="230" h="200"
          title="Nuigent"
          sub="Python · FastAPI · Docker"
          accent={BLUE}
          chips={['6 models + judge', 'Human review gate', 'Photo → product match', 'Offline stock queue']}
        />

        {/* Shop */}
        <Box
          x="200" y="286" w="230" h="200"
          title="Everyday Crackers"
          sub="Laravel 12 · MySQL"
          accent={ORANGE}
          chips={['Storefront + checkout', 'Admin, 20 modules', 'StockService', 'Courier webhook']}
        />

        {/* Outside services */}
        <text x="600" y="26" fill={MUTED} fontSize="10.5" letterSpacing="1.2">OUTSIDE SERVICES</text>
        <Pill x="600" y="40" label="Groq · Gemini" accent={BLUE} />
        <Pill x="600" y="86" label="Meta Graph API" accent={BLUE} />
        <Pill x="600" y="300" label="Steadfast courier" accent={ORANGE} />
        <Pill x="600" y="346" label="SMS gateway" accent={ORANGE} />
        <Pill x="600" y="410" label="Google Sheets" accent={GREEN} />

        {/* People → agent */}
        <Arrow d="M 122 53 H 200" />
        <Arrow d="M 122 89 H 160 V 100 H 200" />
        <Arrow d="M 130 125 H 200" />

        {/* Agent → AI + Meta */}
        <Arrow d="M 430 70 H 600" label="answers in parallel" labelX={462} labelY={64} />
        <Arrow d="M 430 105 H 560 V 99 H 600" both />

        {/* Agent ↔ shop: the scoped API, both directions */}
        <Arrow d="M 268 234 V 286" label="takes stock" labelX={188} labelY={264} accent={ORANGE} />
        <Arrow d="M 386 286 V 234" accent={ORANGE} />
        <text x="398" y="264" fill={MUTED} fontSize="10.5">reads prices</text>

        {/* Shopper → shop */}
        <Arrow d="M 125 313 H 200" accent={GREEN} />

        {/* Shop → courier, sms, sheets */}
        <Arrow d="M 430 330 H 600" label="consignment + webhook" labelX={444} labelY={324} accent={ORANGE} both />
        <Arrow d="M 430 372 H 560 V 359 H 600" accent={ORANGE} />
        <Arrow d="M 430 420 H 600" label="order + stock rows" labelX={452} labelY={414} accent={GREEN} />

        {/* The bit worth explaining */}
        <rect x="200" y="512" width="460" height="66" rx="10" fill="#111" stroke={ORANGE} strokeOpacity="0.35" />
        <text x="216" y="534" fill={ORANGE} fontSize="11.5" fontWeight="700">The failure this design exists for</text>
        <text x="216" y="552" fill={MUTED} fontSize="11">A Messenger sale used to lower a spreadsheet and never reach the shop.</text>
        <text x="216" y="568" fill={MUTED} fontSize="11">Now stock is taken on the shop itself, and queued for replay if it is down.</text>
        <Arrow d="M 300 486 V 512" accent={ORANGE} dashed />
      </svg>
      <figcaption className="text-brand-gray text-xs mt-4 leading-relaxed">
        Both systems are live. The agent never touches the shop database directly:
        it holds an API token scoped to the catalogue and a staff account with 3 of
        11 permission modules, so a mistake on the AI side cannot reach orders,
        customers or settings.
      </figcaption>
    </figure>
  )
}
