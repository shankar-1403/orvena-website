import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Award,
  Bell,
  CircleAlert,
  Droplet,
  Files,
  Folder,
  Hash,
  HeartPulse,
  House,
  LayoutGrid,
  MessageCircle,
  Moon,
  Search,
  Stethoscope,
  Upload,
  User,
  Users,
} from 'lucide-react'

/**
 * The Orvena Health app's Home screen, shown in the hero.
 *
 * It is a redraw of the app's own UI (from a device screenshot, 738 px wide), laid
 * out on a fixed 276 x 546 canvas — every size below is the screenshot's measurement
 * x 0.368 — and then scaled as one piece for smaller phones, so the proportions
 * never drift. It shows the app's interface only, not the phone's own status bar.
 * Only this one screen is shown; keep it in step with the app and never draw
 * anything the app does not have. Two small cards float beside the phone for depth.
 *
 * The profile is a placeholder ("Your Name"), not a real person.
 */

const EASE = [0.32, 0.72, 0, 1]

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const CHIPS = [
  [Hash, 'HB-XXXXXXX'],
  [User, '53.5 yrs'],
  [Users, 'Male'],
  [Droplet, 'B+ve'],
]

const ALERTS = ['Obese', '?Metabolic Disease']

const NAV = [
  ['Home', House],
  ['Reports', Files],
  ['iView', HeartPulse],
  ['Doctors', Stethoscope],
  ['Menu', LayoutGrid],
]

function HomeScreen({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : 'hidden'}
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } } }}
      className="relative h-full w-full bg-[#eaf2f5] text-[#12303b]"
    >
      {/* app bar */}
      <div className="flex h-[41px] items-center justify-between bg-white px-[12px]">
        <img src="/orvena_logo.webp" alt="" width={186} height={50} className="h-[24px] w-auto" />
        <span className="flex items-center gap-[16px] pr-[8px] text-[#12303b]">
          <Search className="h-[14px] w-[14px]" strokeWidth={1.9} />
          <Bell className="h-[14px] w-[14px]" strokeWidth={1.9} />
        </span>
      </div>

      {/* profile card */}
      <motion.div
        variants={item}
        className="relative mx-[12px] mt-[16px] h-[222px] overflow-hidden rounded-[15px] bg-gradient-to-br from-[#3f7f93] to-[#235b6f] px-[11.5px] pt-[16px] text-white shadow-[0_14px_26px_-14px_rgba(11,65,86,0.55)]"
      >
        {/* the faint brand mark behind the profile */}
        <span className="absolute -right-[14px] top-[8px] h-[112px] w-[104px] rounded-[38px_38px_54px_54px] border-[15px] border-white/[0.07]" />

        <div className="relative flex items-center gap-[9px]">
          <span className="grid h-[35px] w-[35px] shrink-0 place-items-center rounded-full bg-white text-[12px] font-extrabold tracking-tight text-accent-deep">
            YN
          </span>
          <div>
            <span className="inline-flex h-[13px] items-center gap-[3px] rounded-full border border-white/35 bg-white/10 px-[6px] text-[7.5px] font-medium leading-none">
              <Moon className="h-[7px] w-[7px] text-[#f4c98a]" strokeWidth={2} />
              Good evening
            </span>
            <p className="mt-[4px] text-[15px] font-extrabold leading-none tracking-tight">
              Your Name
            </p>
          </div>
        </div>

        <div className="relative mt-[9px] flex gap-[5px]">
          {CHIPS.map(([Icon, label]) => (
            <span
              key={label}
              className="inline-flex h-[14px] items-center gap-[3px] rounded-full bg-[#0b4156]/45 px-[6px] text-[8px] font-semibold leading-none"
            >
              <Icon className="h-[7px] w-[7px]" strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>

        <div className="relative mt-[7px] flex h-[32px] items-center gap-[7px] rounded-[9px] border border-white/25 bg-white/[0.14] px-[5px]">
          <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] bg-gradient-to-br from-mint to-accent">
            <Award className="h-[10px] w-[10px]" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[9.5px] font-bold leading-[11px]">HealthComplete</p>
            <p className="text-[7.5px] leading-[10px] text-white/80">Your plan</p>
          </div>
          <div className="pr-[4px] text-right">
            <p className="text-[7px] leading-[9px] text-white/85">Valid till</p>
            <p className="text-[8.5px] font-bold leading-[11px]">05/07/2027</p>
          </div>
        </div>

        <div className="relative mt-[12.5px] rounded-[13px] bg-white p-[9px]">
          <span className="flex h-[32px] items-center justify-center gap-[6px] rounded-[11px] bg-gradient-to-r from-accent to-mint text-[11px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
            <Upload className="h-[11px] w-[11px]" strokeWidth={2.2} />
            Upload Report
          </span>
          <span className="mt-[6px] flex h-[29px] items-center justify-center gap-[6px] rounded-[11px] border border-[#d3e2e7] bg-white text-[10.5px] font-semibold text-[#2a6b7a]">
            <Folder className="h-[11px] w-[11px]" strokeWidth={1.9} />
            Manage existing reports
          </span>
        </div>
      </motion.div>

      {/* alerts from your readings */}
      <motion.div variants={item}>
        <div className="mx-[12px] mt-[20px] flex items-baseline justify-between">
          <p className="text-[13.5px] font-extrabold leading-[16px] tracking-tight">
            Alerts from your readings
          </p>
          <p className="text-[10.5px] font-semibold leading-none text-[#2a7386]">Trends</p>
        </div>
        <p className="mx-[12px] mt-[9px] flex items-center gap-[5px] text-[8.5px] font-medium leading-none text-[#4d6670]">
          <span className="h-[4px] w-[4px] rounded-full bg-[#b3353c]" />
          2 need attention · 2 high
        </p>

        <ul className="mx-[12px] mt-[9px] space-y-[8px]">
          {ALERTS.map((alert) => (
            <li
              key={alert}
              className="flex h-[49px] items-center gap-[9px] rounded-[10px] border border-l-[3.5px] border-[#f3cfd2] border-l-[#b3353c] bg-gradient-to-r from-[#fdecec] to-white pl-[9px] pr-[9px]"
            >
              <span className="grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full bg-white shadow-[0_3px_8px_-4px_rgba(11,65,86,0.25)]">
                <CircleAlert className="h-[13px] w-[13px] text-[#b3353c]" strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-extrabold leading-[13px] tracking-tight">
                  {alert}
                </p>
                <p className="mt-[1px] truncate text-[9px] leading-[11px] text-[#5c6e75]">
                  Flagged from your reports
                </p>
              </div>
              <span className="inline-flex h-[18px] shrink-0 items-center gap-[4px] rounded-full border border-[#f0c4c8] bg-[#fdeef0] px-[7px] text-[9px] font-bold leading-none text-[#a52c34]">
                <span className="h-[3.5px] w-[3.5px] rounded-full bg-[#b3353c]" />
                Alert
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* my health services — its cards sit under the tab bar, as in the app */}
      <motion.div variants={item}>
        <p className="mx-[12px] mt-[21px] text-[13.5px] font-extrabold leading-[16px] tracking-tight">
          My health services
        </p>
        <div className="mx-[12px] mt-[9px] grid grid-cols-2 gap-[6px]">
          <span className="h-[60px] rounded-t-[11px] bg-white" />
          <span className="h-[60px] rounded-t-[11px] bg-white" />
        </div>
      </motion.div>

      {/* chat button */}
      <span className="absolute right-[9px] top-[441px] grid h-[41px] w-[41px] place-items-center rounded-full bg-gradient-to-br from-[#3f7f93] to-[#235b6f] text-white shadow-[0_8px_18px_-8px_rgba(11,65,86,0.6)]">
        <MessageCircle className="h-[15px] w-[15px]" strokeWidth={1.9} />
      </span>

      {/* floating tab bar */}
      <div className="absolute inset-x-[9px] bottom-[9px] flex h-[42px] items-center rounded-[21px] border border-[#dbe7eb] bg-white px-[4px] shadow-[0_10px_26px_-8px_rgba(11,65,86,0.4)]">
        {NAV.map(([label, Icon], index) => {
          const on = index === 0
          return (
            <span
              key={label}
              className={`flex h-[34px] flex-1 flex-col items-center justify-center gap-[2.5px] rounded-[17px] ${
                on ? 'bg-[#e6eff2]' : ''
              }`}
            >
              <Icon
                className={`h-[13px] w-[13px] ${on ? 'text-[#2a6b7a]' : 'text-[#2a7386]'}`}
                strokeWidth={1.9}
              />
              <span
                className={`text-[8px] leading-none ${
                  on ? 'font-bold text-[#17404d]' : 'font-semibold text-[#2a7386]'
                }`}
              >
                {label}
              </span>
            </span>
          )
        })}
      </div>
    </motion.div>
  )
}

/**
 * A card that floats beside the phone. It sits where the screen is empty (over the
 * faint brand mark, top right) or over the bezel (bottom left), so it never hides
 * the app's content. Hidden on phones, where there is no room beside the device.
 */
function Satellite({ icon: Icon, title, text, side, shift, delay, reduceMotion }) {
  return (
    <motion.div
      style={{ x: shift.x, y: shift.y }}
      className={`absolute z-20 hidden md:block lg:scale-90 xl:scale-100 ${
        side === 'right'
          ? 'left-[calc(100%-56px)] top-[9%] origin-left lg:left-[calc(100%-104px)] xl:left-[calc(100%-72px)]'
          : '-bottom-[40px] right-[calc(100%-72px)] origin-right lg:right-[calc(100%-84px)] xl:right-[calc(100%-72px)]'
      }`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
        // outer tray + inner core: the card sits in a shell rather than flat on the page
        className="rounded-[22px] bg-white/10 p-1 ring-1 ring-white/12"
      >
        <div className="flex items-center gap-2.5 rounded-[18px] bg-white py-2.5 pl-2.5 pr-4 shadow-[0_24px_50px_-24px_rgba(4,28,38,0.7)]">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-mint-soft text-accent">
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <div>
            <p className="whitespace-nowrap text-[12px] font-extrabold tracking-tight text-navy">
              {title}
            </p>
            <p className="whitespace-nowrap text-[10px] text-muted">{text}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AppShowcase() {
  const reduceMotion = useReducedMotion()

  // Pointer position over the stage, -0.5 … 0.5, eased so the tilt feels weighted
  const px = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.6 })
  const py = useSpring(useMotionValue(0), { stiffness: 90, damping: 20, mass: 0.6 })
  const rotateY = useTransform(px, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(py, [-0.5, 0.5], [4, -4])
  const glowX = useTransform(px, [-0.5, 0.5], [-28, 28])
  const near = {
    x: useTransform(px, [-0.5, 0.5], [-18, 18]),
    y: useTransform(py, [-0.5, 0.5], [-11, 11]),
  }
  const far = {
    x: useTransform(px, [-0.5, 0.5], [13, -13]),
    y: useTransform(py, [-0.5, 0.5], [8, -8]),
  }

  const onPointerMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[420px] [perspective:1400px] lg:max-w-none"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        style={{ x: glowX }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-[110px]"
      />

      <div className="relative mx-auto w-fit">
        <Satellite
          icon={CircleAlert}
          title="2 need attention"
          text="Alerts from your readings"
          side="right"
          shift={far}
          delay={1.1}
          reduceMotion={reduceMotion}
        />
        <Satellite
          icon={Upload}
          title="Upload Report"
          text="Camera scan or PDF"
          side="left"
          shift={near}
          delay={1.25}
          reduceMotion={reduceMotion}
        />

        {/* outer tray + device body: the phone reads as an object, not a flat picture */}
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative rounded-[48px] bg-white/[0.06] p-2 ring-1 ring-white/10 [transform-style:preserve-3d] min-[360px]:rounded-[52px] sm:rounded-[54px]"
        >
          <div className="rounded-[40px] bg-gradient-to-b from-teal to-midnight p-2 shadow-[0_50px_90px_-36px_rgba(2,20,28,0.85),inset_0_1px_0_rgba(255,255,255,0.2)] min-[360px]:rounded-[44px] sm:rounded-[46px]">
            {/* the screen: a fixed 276 x 546 canvas, scaled as one piece on smaller phones */}
            <div className="relative h-[459px] w-[232px] overflow-hidden rounded-[32px] bg-[#eaf2f5] min-[360px]:h-[514px] min-[360px]:w-[260px] min-[360px]:rounded-[36px] sm:h-[546px] sm:w-[276px] sm:rounded-[38px]">
              <div className="h-[546px] w-[276px] origin-top-left scale-[0.8406] min-[360px]:scale-[0.942] sm:scale-100">
                <HomeScreen reduceMotion={reduceMotion} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
