import { Airship } from "./Airship";
import { CelestialRing } from "./CelestialRing";
import { CitySkyline } from "./CitySkyline";
import { Cloud } from "./Cloud";
import { FloatingIsland } from "./FloatingIsland";
import { LightRays } from "./LightRays";
import { MountainRange } from "./MountainRange";
import { ParallaxLayer, ParallaxStage } from "./ParallaxStage";
import { Particles } from "./Particles";
import { Starfield } from "./Starfield";

const SKY =
  "linear-gradient(180deg, #060a1a 0%, #0F172A 14%, #172554 38%, #2e2a86 58%, #5a4ab4 72%, #a874c2 85%, #f2b48e 100%)";

const ORB =
  "radial-gradient(circle, rgba(254,243,199,0.9) 0%, rgba(251,191,36,0.42) 13%, rgba(244,143,177,0.22) 30%, rgba(167,139,250,0.14) 48%, transparent 68%)";

interface DriftProps {
  /** Seconds for one pass across the screen. */
  duration: number;
  /** Negative delay so the scene starts mid-flight. */
  offset: number;
  name?: "cloud-drift" | "airship-drift";
  children: React.ReactNode;
}

function Drift({ duration, offset, name = "cloud-drift", children }: DriftProps) {
  return <div style={{ animation: `${name} ${duration}s linear ${offset}s infinite` }}>{children}</div>;
}

/** The home page hero: a sunrise over a chain of floating islands, with layered parallax and drifting clouds. */
export function HeroScene() {
  return (
    <ParallaxStage>
      <div className="absolute inset-0" style={{ background: SKY }} />

      <ParallaxLayer depth={0.03} rise={0} className="inset-0 h-[72%]">
        <Starfield count={170} seed={5} height={0.8} />
      </ParallaxLayer>

      <ParallaxLayer depth={0.05} rise={20} delay={0.1} className="inset-x-0 top-[57%] mx-auto aspect-square w-[min(150vw,1500px)] -translate-y-1/2">
        <div className="size-full rounded-full" style={{ background: ORB }} />
      </ParallaxLayer>

      <ParallaxLayer depth={0.06} rise={0} delay={0.2} className="inset-x-0 top-[57%] mx-auto aspect-square w-[min(125vw,1260px)] -translate-y-1/2 opacity-[0.32] mix-blend-screen">
        <CelestialRing className="size-full" />
      </ParallaxLayer>

      <ParallaxLayer depth={0.04} rise={0} delay={0.2} className="inset-x-0 top-[8%] h-[62%] mix-blend-screen">
        <LightRays
          className="size-full -scale-y-100 animate-ray [mask-image:linear-gradient(to_bottom,transparent,#000_70%)]"
          seed={6}
          count={11}
          color="#E9D5FF"
        />
      </ParallaxLayer>

      <ParallaxLayer depth={0.1} rise={30} delay={0.25} className="inset-x-0 bottom-[17%] h-[28%] opacity-70">
        <MountainRange seed={14} peaks={8} top="#5b5fb8" bottom="#3a3f91" amplitude={0.85} snow className="h-full" />
      </ParallaxLayer>

      {/* distant islands */}
      <ParallaxLayer depth={0.14} rise={40} delay={0.35} className="left-[7%] top-[13%] w-[9vw] max-w-[150px] opacity-60">
        <FloatingIsland variant="meadow" seed={31} accent="#BAE6FD" className="w-full animate-float-slow" />
      </ParallaxLayer>
      <ParallaxLayer depth={0.12} rise={40} delay={0.4} className="right-[9%] top-[10%] w-[8vw] max-w-[130px] opacity-55">
        <FloatingIsland variant="temple" seed={32} accent="#C4B5FD" className="w-full animate-float-rev" />
      </ParallaxLayer>
      <ParallaxLayer depth={0.16} rise={40} delay={0.45} className="right-[27%] top-[27%] hidden w-[6vw] opacity-45 md:block">
        <FloatingIsland variant="crystal" seed={33} accent="#A78BFA" className="w-full animate-float" />
      </ParallaxLayer>

      {/* sky kingdom on the horizon */}
      <ParallaxLayer depth={0.12} rise={50} delay={0.45} className="inset-x-0 bottom-[14%] opacity-90">
        <CitySkyline seed={9} top="#4a4fa6" bottom="#2b2f78" glow="#FBBF24" />
      </ParallaxLayer>

      {/* high clouds */}
      <ParallaxLayer depth={0.2} rise={20} delay={0.6} className="left-0 top-[9%] w-[22vw] opacity-30">
        <Drift duration={150} offset={-40}>
          <Cloud seed={3} color="#f1e9ff" shade="#a99be0" className="w-full" />
        </Drift>
      </ParallaxLayer>
      <ParallaxLayer depth={0.22} rise={20} delay={0.7} className="left-0 top-[47%] w-[26vw] opacity-25">
        <Drift duration={190} offset={-120}>
          <Cloud seed={8} color="#f1e9ff" shade="#a99be0" className="w-full" />
        </Drift>
      </ParallaxLayer>

      {/* flanking islands */}
      <ParallaxLayer depth={0.34} rise={70} delay={0.5} className="-left-[16%] top-[58%] w-[38vw] sm:-left-[4%] sm:top-[44%] sm:w-[26vw] lg:left-[1%] lg:top-[38%] lg:w-[22vw] max-w-[430px]">
        <FloatingIsland variant="forest" seed={21} accent="#4ADE80" waterfall className="w-full animate-float-slow" />
      </ParallaxLayer>
      <ParallaxLayer depth={0.32} rise={70} delay={0.6} className="-right-[14%] top-[52%] w-[36vw] sm:-right-[3%] sm:top-[40%] sm:w-[25vw] lg:right-[1%] lg:top-[33%] lg:w-[21vw] max-w-[410px]">
        <FloatingIsland variant="ruins" seed={22} accent="#A78BFA" className="w-full animate-float-rev" />
      </ParallaxLayer>
      <ParallaxLayer depth={0.38} rise={60} delay={0.7} className="left-[16%] top-[66%] hidden w-[12vw] max-w-[220px] md:block">
        <FloatingIsland variant="crystal" seed={23} accent="#38BDF8" className="w-full animate-float" />
      </ParallaxLayer>
      <ParallaxLayer depth={0.36} rise={60} delay={0.75} className="right-[17%] top-[64%] hidden w-[11vw] max-w-[200px] md:block">
        <FloatingIsland variant="village" seed={24} accent="#FBBF24" className="w-full animate-float-slow" />
      </ParallaxLayer>

      {/* airships sail below the headline */}
      <ParallaxLayer depth={0.3} rise={30} delay={0.9} className="left-0 top-[58%] w-[11vw] min-w-[84px] max-w-[190px]">
        <Drift duration={95} offset={-28} name="airship-drift">
          <Airship accent="#38BDF8" flag="#FBBF24" className="w-full animate-float-slow" />
        </Drift>
      </ParallaxLayer>
      <ParallaxLayer depth={0.18} rise={30} delay={1.1} className="left-0 top-[55%] w-[6vw] min-w-[48px] max-w-[110px] opacity-70">
        <Drift duration={140} offset={-95} name="airship-drift">
          <Airship accent="#A78BFA" flag="#4ADE80" className="w-full animate-float-rev" />
        </Drift>
      </ParallaxLayer>

      {/* the central sky city */}
      <ParallaxLayer depth={0.46} rise={90} delay={0.4} className="bottom-[6%] left-1/2 w-[min(72vw,42svh)] -translate-x-1/2 sm:w-[min(46vw,42svh)] lg:w-[min(31vw,42svh)] max-w-[560px]">
        <FloatingIsland variant="castle" seed={7} accent="#FBBF24" waterfall className="w-full animate-float" />
      </ParallaxLayer>

      {/* low clouds that hide the horizon and the rock tips */}
      <ParallaxLayer depth={0.55} rise={50} delay={0.8} className="left-0 top-[76%] w-[34vw] opacity-45">
        <Drift duration={120} offset={-30}>
          <Cloud seed={12} color="#efe4ff" shade="#a99be0" className="mask-fade-b w-full" />
        </Drift>
      </ParallaxLayer>
      <ParallaxLayer depth={0.6} rise={50} delay={0.9} className="left-0 top-[84%] w-[44vw] opacity-50">
        <Drift duration={165} offset={-100}>
          <Cloud seed={15} color="#f5eeff" shade="#b9a6ee" className="mask-fade-b w-full" />
        </Drift>
      </ParallaxLayer>
      <ParallaxLayer depth={0.5} rise={50} delay={1} className="left-0 top-[89%] w-[30vw] opacity-45">
        <Drift duration={105} offset={-70}>
          <Cloud seed={19} color="#f3e6ff" shade="#c3a7e6" className="mask-fade-b w-full" />
        </Drift>
      </ParallaxLayer>

      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-night via-[#151b45]/85 to-transparent" />

      <Particles count={70} seed={3} colors={["#BAE6FD", "#FDE68A", "#DDD6FE"]} className="mix-blend-screen" />
    </ParallaxStage>
  );
}
