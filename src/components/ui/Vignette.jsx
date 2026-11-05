import { motion, useReducedMotion } from 'framer-motion'

/**
 * Quiet line illustrations that sit at the top of a card, so a card shows what it
 * describes instead of only saying it. Each one eases in once when scrolled into
 * view and then stays still — no loops. The only hover reaction is a 2px lift
 * (see .vg in index.css).
 *
 * Purely decorative: the stage is aria-hidden and carries no content of its own.
 */

const EASE = [0.22, 1, 0.36, 1]
const NAVY = '#0b4156'
const TEAL = '#136074'
const ACCENT = '#d95f14'
const LINE = '#d4dee2'
const PALE = '#f2f6f7'
const MUTED = '#5c6e75'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay, ease: EASE },
      opacity: { duration: 0.2, delay },
    },
  }),
}

const fade = {
  hidden: { opacity: 0, y: 4 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
}

const grow = {
  hidden: { scaleY: 0 },
  show: (delay = 0) => ({ scaleY: 1, transition: { duration: 0.6, delay, ease: EASE } }),
}

const stroke = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }
const soft = { stroke: NAVY, strokeOpacity: 0.16, strokeWidth: 2.5, strokeLinecap: 'round' }

/** A small tick inside a filled circle. */
function Check({ x, y, r = 9, fill = TEAL, delay = 0.4 }) {
  return (
    <motion.g variants={fade} custom={delay}>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <path
        d={`M${x - r * 0.42},${y} l${r * 0.3},${r * 0.3} l${r * 0.56},-${r * 0.64}`}
        stroke="#fff"
        strokeWidth={r > 7 ? 1.8 : 1.5}
        {...stroke}
      />
    </motion.g>
  )
}

/* ── Fasting glucose, the same series the hero and HealthOS page chart ─────── */
const SERIES = [6.9, 6.6, 6.7, 6.2, 5.9, 6.0, 5.6, 5.4]
const trendPoints = SERIES.map((value, index) => [
  30 + index * (140 / (SERIES.length - 1)),
  20 + ((6.9 - value) / 1.5) * 42,
])
const trendLine = trendPoints
  .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
  .join(' ')
const trendArea = `${trendLine} L170,74 L30,74 Z`
const [trendEndX, trendEndY] = trendPoints[trendPoints.length - 1]

function Trend() {
  return (
    <>
      <line x1="26" x2="174" y1="74.5" y2="74.5" stroke={NAVY} strokeOpacity="0.1" />
      <motion.path variants={fade} custom={0.4} d={trendArea} fill={ACCENT} fillOpacity="0.07" />
      <motion.path variants={draw} custom={0.05} d={trendLine} stroke={ACCENT} strokeWidth="2" {...stroke} />
      <motion.circle
        variants={fade}
        custom={0.7}
        cx={trendEndX}
        cy={trendEndY}
        r="4"
        fill={ACCENT}
        stroke="#fff"
        strokeWidth="2"
      />
    </>
  )
}

/* ── A paper report framed by the camera, turned into a tidy record ────────── */
function Scan() {
  return (
    <>
      <motion.g variants={fade} custom={0}>
        <rect x="40" y="26" width="28" height="36" rx="5" fill="#fff" stroke={LINE} />
        <line x1="46" x2="62" y1="35" y2="35" {...soft} />
        <line x1="46" x2="62" y1="43" y2="43" {...soft} />
        <line x1="46" x2="55" y1="51" y2="51" {...soft} />
      </motion.g>
      {/* viewfinder corners */}
      <motion.path
        variants={draw}
        custom={0.2}
        d="M32,27 V19 H40 M68,19 H76 V27 M76,61 V69 H68 M40,69 H32 V61"
        stroke={ACCENT}
        strokeOpacity="0.8"
        strokeWidth="1.6"
        {...stroke}
      />
      <motion.path
        variants={draw}
        custom={0.5}
        d="M88,44 H106 M101.5,39.5 L106.5,44 L101.5,48.5"
        stroke={NAVY}
        strokeOpacity="0.28"
        strokeWidth="1.5"
        {...stroke}
      />
      <motion.g variants={fade} custom={0.6}>
        <rect x="116" y="27" width="56" height="34" rx="10" fill="#fff" stroke={LINE} />
        <line x1="126" x2="150" y1="39" y2="39" {...soft} />
        <line x1="126" x2="142" y1="48" y2="48" {...soft} strokeOpacity="0.1" />
      </motion.g>
      <Check x={160} y={44} r={6} delay={0.85} />
    </>
  )
}

/* ── A one-page summary, shared with a doctor ──────────────────────────────── */
function Summary() {
  return (
    <>
      <motion.g variants={fade} custom={0}>
        <rect x="46" y="13" width="50" height="62" rx="8" fill="#fff" stroke={LINE} />
        <line x1="55" x2="76" y1="25" y2="25" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
      <motion.path variants={draw} custom={0.2} d="M55,36 H87" {...soft} fill="none" />
      <motion.path variants={draw} custom={0.3} d="M55,45 H80" {...soft} strokeOpacity="0.1" fill="none" />
      <motion.path variants={draw} custom={0.4} d="M55,54 H84" {...soft} strokeOpacity="0.1" fill="none" />
      <motion.path
        variants={draw}
        custom={0.55}
        d="M106,44 H126 M121.5,39.5 L126.5,44 L121.5,48.5"
        stroke={NAVY}
        strokeOpacity="0.28"
        strokeWidth="1.5"
        {...stroke}
      />
      <motion.g variants={fade} custom={0.75}>
        <circle cx="150" cy="44" r="12" fill={NAVY} />
        <circle cx="150" cy="41" r="3.4" fill="#fff" />
        <path d="M143.8,50.5 a6.2,5.2 0 0 1 12.4,0 Z" fill="#fff" />
      </motion.g>
    </>
  )
}

/* ── You at the centre, your doctors around you, one marked as a favourite ─── */
function Doctors() {
  const members = [
    [52, 24],
    [52, 64],
    [150, 44],
  ]
  return (
    <>
      {members.map(([x, y], index) => (
        <motion.path
          key={`${x}-${y}`}
          variants={draw}
          custom={0.1 + index * 0.1}
          d={`M100,44 L${x},${y}`}
          stroke={TEAL}
          strokeOpacity="0.3"
          strokeWidth="1.5"
          {...stroke}
        />
      ))}
      {members.map(([x, y], index) => {
        const flagged = index === 2
        return (
          <motion.circle
            key={`n-${x}-${y}`}
            variants={fade}
            custom={0.45 + index * 0.1}
            cx={x}
            cy={y}
            r={flagged ? 8 : 7}
            fill={flagged ? ACCENT : '#fff'}
            stroke={flagged ? ACCENT : TEAL}
            strokeOpacity={flagged ? 1 : 0.55}
            strokeWidth="1.6"
          />
        )
      })}
      <motion.g variants={fade} custom={0}>
        <circle cx="100" cy="44" r="11" fill={NAVY} />
        <circle cx="100" cy="44" r="3.4" fill="#fff" />
      </motion.g>
    </>
  )
}

/* ── Reminders: two done, the next one waiting ─────────────────────────────── */
function FollowUp() {
  return (
    <>
      {[12, 35, 58].map((y, index) => (
        <motion.g key={y} variants={fade} custom={index * 0.12}>
          <rect x="40" y={y} width="120" height="18" rx="9" fill="#fff" stroke={LINE} />
          <line x1="52" x2={[106, 94, 112][index]} y1={y + 9} y2={y + 9} {...soft} />
          {index === 2 ? (
            <circle cx="148" cy={y + 9} r="5" fill="#fff" stroke={ACCENT} strokeWidth="1.5" />
          ) : null}
        </motion.g>
      ))}
      <Check x={148} y={21} r={5.5} delay={0.45} />
      <Check x={148} y={44} r={5.5} delay={0.6} />
    </>
  )
}

/* ── A first report, and a second, reviewed one in front of it ─────────────── */
function Opinion() {
  return (
    <>
      <motion.g variants={fade} custom={0}>
        <g transform="rotate(-6 82 46)">
          <rect x="60" y="17" width="46" height="58" rx="7" fill={PALE} stroke={LINE} />
        </g>
      </motion.g>
      <motion.g variants={fade} custom={0.15}>
        <rect x="90" y="13" width="50" height="62" rx="8" fill="#fff" stroke={LINE} />
        <line x1="99" x2="120" y1="25" y2="25" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
      <motion.path variants={draw} custom={0.35} d="M99,36 H131" {...soft} fill="none" />
      <motion.path variants={draw} custom={0.45} d="M99,45 H124" {...soft} strokeOpacity="0.1" fill="none" />
      <Check x={130} y={63} r={9} fill={ACCENT} delay={0.7} />
    </>
  )
}

/* ── A flight path from home to care ───────────────────────────────────────── */
function Tourism() {
  return (
    <>
      <motion.path
        variants={fade}
        custom={0.1}
        d="M34,64 Q100,0 166,64"
        stroke={NAVY}
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        {...stroke}
      />
      <motion.circle variants={fade} custom={0.2} cx="34" cy="64" r="4" fill={NAVY} />
      <motion.circle variants={fade} custom={0.5} cx="166" cy="64" r="5" fill={ACCENT} stroke="#fff" strokeWidth="2" />
      <g transform="translate(100 32)">
        <motion.path variants={fade} custom={0.35} d="M-7,-4 L7,0 L-7,4 L-4,0 Z" fill={ACCENT} />
      </g>
    </>
  )
}

/* ── Readings coming down, turning from warning to healthy ─────────────────── */
const REVERSAL = [52, 45, 37, 29, 22, 16]

function Reversal() {
  return (
    <>
      <line x1="40" x2="160" y1="74.5" y2="74.5" stroke={NAVY} strokeOpacity="0.1" />
      {REVERSAL.map((height, index) => {
        const healthy = index > 1
        return (
          <motion.rect
            key={height}
            variants={grow}
            custom={0.05 + index * 0.07}
            style={{ originY: 1 }}
            x={47 + index * 19}
            y={74 - height}
            width="11"
            height={height}
            rx="4"
            fill={healthy ? TEAL : ACCENT}
            fillOpacity={healthy ? 0.3 + (index - 2) * 0.16 : 0.8 - index * 0.25}
          />
        )
      })}
    </>
  )
}

/* ── A workforce screened, and the score it adds up to ─────────────────────── */
function Corporate() {
  const people = []
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 4; col += 1) people.push([44 + col * 17, 35 + row * 18])
  }
  return (
    <>
      {people.map(([x, y], index) => (
        <motion.circle
          key={`${x}-${y}`}
          variants={fade}
          custom={0.05 + index * 0.04}
          cx={x}
          cy={y}
          r="5"
          fill={index === 5 ? ACCENT : TEAL}
          fillOpacity={index === 5 ? 0.85 : 0.22 + (index % 3) * 0.14}
        />
      ))}
      <circle cx="146" cy="44" r="17" stroke={LINE} strokeWidth="4" fill="none" />
      <motion.circle
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: { pathLength: 0.78, opacity: 1, transition: { duration: 1.1, delay: 0.4, ease: EASE } },
        }}
        cx="146"
        cy="44"
        r="17"
        transform="rotate(-90 146 44)"
        stroke={TEAL}
        strokeWidth="4"
        {...stroke}
      />
    </>
  )
}

/* ── One record carried across three care settings ─────────────────────────── */
function Continuity() {
  const stops = [
    [46, 'OPD'],
    [100, 'IPD'],
    [154, 'Home'],
  ]
  return (
    <>
      <motion.path variants={draw} custom={0.1} d="M46,36 H154" stroke={TEAL} strokeOpacity="0.3" strokeWidth="1.5" {...stroke} />
      {stops.map(([x, label], index) => (
        <motion.g key={label} variants={fade} custom={0.25 + index * 0.12}>
          <circle cx={x} cy="36" r="10" fill="#fff" stroke={TEAL} strokeOpacity="0.55" strokeWidth="1.6" />
          <circle cx={x} cy="36" r="3.4" fill={index === 2 ? ACCENT : NAVY} fillOpacity={index === 2 ? 1 : 0.35} />
          <text x={x} y="66" textAnchor="middle" fontSize="9.5" fontWeight="600" letterSpacing="0.5" fill={MUTED}>
            {label}
          </text>
        </motion.g>
      ))}
    </>
  )
}

/* ── Five stages in order, handing back to the first ───────────────────────── */
function Stages() {
  return (
    <>
      <motion.path
        variants={draw}
        custom={0.5}
        d="M158,40 C144,16 56,16 42,40 M49,34.5 L41.5,41 L39.5,31.5"
        stroke={NAVY}
        strokeOpacity="0.2"
        strokeWidth="1.5"
        {...stroke}
      />
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.rect
          key={index}
          variants={fade}
          custom={0.05 + index * 0.08}
          x={33 + index * 28}
          y="50"
          width="22"
          height="11"
          rx="5.5"
          fill={index === 4 ? ACCENT : TEAL}
          fillOpacity={index === 4 ? 0.85 : 0.18 + index * 0.13}
        />
      ))}
    </>
  )
}

/* ── One identity in the middle, systems connected through it ──────────────── */
function Interop() {
  const systems = [
    [50, 24],
    [150, 24],
    [50, 64],
    [150, 64],
  ]
  return (
    <>
      {systems.map(([x, y], index) => (
        <motion.path
          key={`${x}-${y}`}
          variants={draw}
          custom={0.1 + index * 0.08}
          d={`M100,44 L${x},${y}`}
          stroke={TEAL}
          strokeOpacity="0.3"
          strokeWidth="1.5"
          {...stroke}
        />
      ))}
      {systems.map(([x, y], index) => (
        <motion.rect
          key={`s-${x}-${y}`}
          variants={fade}
          custom={0.4 + index * 0.08}
          x={x - 7.5}
          y={y - 7.5}
          width="15"
          height="15"
          rx="5"
          fill="#fff"
          stroke={TEAL}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
      ))}
      <motion.g variants={fade} custom={0}>
        <rect x="86" y="31" width="28" height="26" rx="9" fill={NAVY} />
        <text x="100" y="48" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.5" fill="#fff">
          ID
        </text>
      </motion.g>
    </>
  )
}

const VIGNETTES = {
  trend: Trend,
  scan: Scan,
  summary: Summary,
  doctors: Doctors,
  followup: FollowUp,
  opinion: Opinion,
  tourism: Tourism,
  reversal: Reversal,
  corporate: Corporate,
  continuity: Continuity,
  stages: Stages,
  interop: Interop,
}

export default function Vignette({ name, className = '', surface = 'bg-white/70' }) {
  const reduce = useReducedMotion()
  const Art = VIGNETTES[name]
  if (!Art) return null

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className={`vg h-[76px] w-full rounded-2xl ${surface} ${className}`}
    >
      <svg viewBox="0 0 200 88" fill="none" className="h-full w-full">
        <Art />
      </svg>
    </motion.div>
  )
}
