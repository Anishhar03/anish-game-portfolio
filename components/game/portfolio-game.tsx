"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CloudLightning,
  GitBranch,
  Home,
  ContactRound,
  Map,
  Moon,
  Network,
  Sun,
  TerminalSquare,
  Volume2,
  VolumeX,
  Workflow,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ContactZone } from "./contact-zone";
import { MapZone } from "./map-zone";
import { MissionZone } from "./mission-zone";
import { SkillZone } from "./skill-zone";

const EnergyCore = dynamic(
  () => import("./energy-core").then((module) => module.EnergyCore),
  { ssr: false },
);

const zones = [
  { id: "home", label: "Home base", key: "1", icon: Home },
  { id: "missions", label: "Missions", key: "2", icon: BriefcaseBusiness },
  { id: "skills", label: "Skill tree", key: "3", icon: Workflow },
  { id: "map", label: "World map", key: "4", icon: Map },
  { id: "contact", label: "Portal", key: "5", icon: Network },
] as const;

type ZoneId = (typeof zones)[number]["id"];
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function playInterfaceTone(frequency: number) {
  const AudioContextClass = window.AudioContext;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  gain.gain.setValueAtTime(0.035, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.09);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.1);
  oscillator.addEventListener("ended", () => void context.close());
}

function BootScreen({ onStart }: { onStart: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 4));
    }, 42);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div className="boot-screen" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
      <div className="boot-console">
        <motion.div
          className="boot-logo"
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          AK
        </motion.div>
        <p className="section-kicker">Portfolio OS 3.0</p>
        <h1>Engineering command center</h1>
        <div className="boot-copy" aria-live="polite">
          <span>[OK] GitHub mission archive connected</span>
          {progress > 35 && <span>[OK] 55 public repositories indexed</span>}
          {progress > 68 && <span>[OK] Skill graph and field map online</span>}
          {progress === 100 && <span>[READY] Operator profile authenticated</span>}
        </div>
        <div className="boot-bar" aria-hidden="true">
          <motion.div className="boot-progress" animate={{ width: `${progress}%` }} />
        </div>
        <button className="press-start" onClick={onStart} disabled={progress < 100}>
          {progress < 100 ? `Loading systems ${progress}%` : "Press start / Enter"}
        </button>
      </div>
    </motion.div>
  );
}

export function PortfolioGame() {
  const reducedMotion = useReducedMotion() ?? false;
  const [started, setStarted] = useState(false);
  const [zone, setZone] = useState<ZoneId>("home");
  const [dayMode, setDayMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [stormMode, setStormMode] = useState(false);
  const [overclocked, setOverclocked] = useState(false);
  const [achievement, setAchievement] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStarted(window.localStorage.getItem("anish-portfolio-started") === "true");
      setDayMode(window.localStorage.getItem("anish-portfolio-theme") === "day");
      setStormMode(window.localStorage.getItem("anish-portfolio-weather") === "storm");
      setOverclocked(window.localStorage.getItem("anish-overclocked") === "true");
      const savedZone = window.localStorage.getItem("anish-portfolio-zone") as ZoneId | null;
      if (savedZone && zones.some((item) => item.id === savedZone)) setZone(savedZone);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null;
      if (element?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "Enter" && !started) {
        window.localStorage.setItem("anish-portfolio-started", "true");
        setStarted(true);
      }
      const target = zones.find((item) => item.key === event.key);
      if (started && target) {
        setZone(target.id);
        window.localStorage.setItem("anish-portfolio-zone", target.id);
        if (audioEnabled) playInterfaceTone(420 + Number(target.key) * 45);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [audioEnabled, started]);

  useEffect(() => {
    let position = 0;
    const onSequence = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null;
      if (element?.matches("input, textarea, select, [contenteditable='true']")) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === konamiCode[position]) {
        position += 1;
        if (position === konamiCode.length) {
          setOverclocked(true);
          setAchievement("Overclock mode unlocked / +3000 XP");
          window.localStorage.setItem("anish-overclocked", "true");
          position = 0;
        }
      } else {
        position = key === konamiCode[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onSequence);
    return () => window.removeEventListener("keydown", onSequence);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    gsap.fromTo(".brand-mark", { rotate: -8, scale: 0.9 }, { rotate: 0, scale: 1, duration: 0.38, ease: "back.out(2)" });
  }, [reducedMotion, zone]);

  useEffect(() => {
    if (!achievement) return;
    const timer = window.setTimeout(() => setAchievement(null), 4200);
    return () => window.clearTimeout(timer);
  }, [achievement]);

  const stats = useMemo(
    () => [
      { value: "55", label: "Public repositories" },
      { value: "06", label: "Featured missions" },
      { value: "2026", label: "BIT Mesra CSE" },
    ],
    [],
  );

  const start = () => {
    window.localStorage.setItem("anish-portfolio-started", "true");
    setStarted(true);
  };

  const toggleTheme = () => {
    const next = !dayMode;
    setDayMode(next);
    window.localStorage.setItem("anish-portfolio-theme", next ? "day" : "night");
  };

  const toggleStorm = () => {
    const next = !stormMode;
    setStormMode(next);
    window.localStorage.setItem("anish-portfolio-weather", next ? "storm" : "clear");
  };

  const navigate = (next: ZoneId) => {
    setZone(next);
    window.localStorage.setItem("anish-portfolio-zone", next);
    let savedVisited: ZoneId[] = [];
    try {
      savedVisited = JSON.parse(window.localStorage.getItem("anish-portfolio-visited") ?? "[]") as ZoneId[];
    } catch {
      window.localStorage.removeItem("anish-portfolio-visited");
    }
    const visited = new Set(savedVisited);
    visited.add(next);
    window.localStorage.setItem("anish-portfolio-visited", JSON.stringify([...visited]));
    if (audioEnabled) playInterfaceTone(460 + zones.findIndex((item) => item.id === next) * 52);
  };

  return (
    <TooltipProvider delayDuration={250}>
      <div className="game-shell" data-theme={dayMode ? "day" : "night"} data-weather={stormMode ? "storm" : "clear"} data-overclocked={overclocked}>
        <a className="skip-link" href="#main-content">Skip to command center</a>
        <EnergyCore reducedMotion={reducedMotion} dayMode={dayMode} />
        <div className="scanlines" aria-hidden="true" />
        {stormMode && <div className="storm-layer" aria-hidden="true" />}
        <div className="frame-corner tl" aria-hidden="true" />
        <div className="frame-corner tr" aria-hidden="true" />
        <div className="frame-corner bl" aria-hidden="true" />
        <div className="frame-corner br" aria-hidden="true" />

        <AnimatePresence>{!started && <BootScreen onStart={start} />}</AnimatePresence>

        <header className="hud">
          <button className="brand-lockup" onClick={() => navigate("home")} aria-label="Return to home base">
            <span className="brand-mark">AK</span>
            <span className="brand-copy">
              <strong>Anish Kumar</strong>
              <span>Engineering command center</span>
            </span>
          </button>
          <div className="status-cluster" aria-label="System status">
            <span className="online-dot" />
            <span>Available for new quests</span>
            <span>IST / secure link</span>
          </div>
          <div className="hud-actions">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="icon-button" onClick={() => setAudioEnabled((value) => !value)} aria-label={audioEnabled ? "Mute interface audio" : "Enable interface audio"}>
                  {audioEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{audioEnabled ? "Mute interface audio" : "Enable interface audio"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="icon-button" onClick={toggleStorm} aria-label={stormMode ? "Clear ion storm" : "Enable ion storm"}>
                  <CloudLightning size={17} />
                </button>
              </TooltipTrigger>
              <TooltipContent>{stormMode ? "Clear ion storm" : "Ion storm simulation"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="icon-button" onClick={toggleTheme} aria-label={dayMode ? "Switch to night mode" : "Switch to day mode"}>
                  {dayMode ? <Moon size={17} /> : <Sun size={17} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{dayMode ? "Night simulation" : "Day simulation"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a className="icon-button" href="https://github.com/Anishhar03" target="_blank" rel="noreferrer" aria-label="Open Anish Kumar on GitHub">
                  <GitBranch size={17} />
                </a>
              </TooltipTrigger>
              <TooltipContent>GitHub profile</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a className="icon-button" href="https://www.linkedin.com/in/anish-kumar-98a04a1bb" target="_blank" rel="noreferrer" aria-label="Open Anish Kumar on LinkedIn">
                  <ContactRound size={17} />
                </a>
              </TooltipTrigger>
              <TooltipContent>LinkedIn profile</TooltipContent>
            </Tooltip>
          </div>
        </header>

        <main className="game-stage" id="main-content">
          <AnimatePresence mode="wait">
            {zone === "home" ? (
              <motion.section
                className="home-zone"
                key="home"
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45 }}
              >
                <div className="hero-copy">
                  <p className="section-kicker">Player 01 / Software engineer</p>
                  <h1 className="hero-title">I build systems<span>that survive reality.</span></h1>
                  <p className="hero-subtitle">
                    I am <strong>Anish Kumar</strong>, a computer science engineer at BIT Mesra focused on scalable backend systems, applied AI, distributed architecture, and polished full-stack products.
                  </p>
                  <div className="hero-actions">
                    <button className="primary-button" onClick={() => navigate("missions")}>Enter mission log</button>
                    <button className="ghost-button" onClick={() => navigate("contact")}>Open contact portal</button>
                  </div>
                  <div className="stat-row" aria-label="Profile statistics">
                    {stats.map((stat) => (
                      <div className="stat" key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.aside
                  className="identity-panel"
                  initial={reducedMotion ? false : { opacity: 0, x: 36, rotateY: -7 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.7, delay: 0.12 }}
                  aria-label="Character profile summary"
                >
                  <div className="portrait-wrap">
                    <Image src="/anish-avatar.jpg" alt="Anish Kumar" fill sizes="(max-width: 640px) 100vw, 380px" priority />
                    <div className="identity-meta">
                      <p>Verified operator / Level 26</p>
                      <h2>Anish Kumar</h2>
                    </div>
                  </div>
                  <div className="identity-data">
                    <div className="data-cell"><span>Class</span><strong>Backend + AI Engineer</strong></div>
                    <div className="data-cell"><span>Base</span><strong>BIT Mesra / India</strong></div>
                    <div className="data-cell"><span>Specialty</span><strong>Systems that scale</strong></div>
                    <div className="data-cell"><span>Previous quest</span><strong>SDE Intern / Oracle</strong></div>
                  </div>
                </motion.aside>
              </motion.section>
            ) : zone === "missions" ? <MissionZone key="missions" />
              : zone === "skills" ? <SkillZone key="skills" />
                : zone === "map" ? <MapZone key="map" />
                  : <ContactZone key="contact" />}
          </AnimatePresence>
        </main>

        <nav className="zone-nav" aria-label="Portfolio zones">
          {zones.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className="nav-button" data-active={zone === item.id} onClick={() => navigate(item.id)} aria-current={zone === item.id ? "page" : undefined}>
                <kbd>{item.key}</kbd>
                <span>{item.label}</span>
                <Icon className="sr-only" aria-hidden="true" />
              </button>
            );
          })}
        </nav>
        <div className="control-hint"><TerminalSquare size={14} /><span>Use keys 1-5 to navigate</span></div>
        <AnimatePresence>
          {achievement && (
            <motion.div className="achievement-toast" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
              <span>Hidden achievement</span><strong>{achievement}</strong>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
