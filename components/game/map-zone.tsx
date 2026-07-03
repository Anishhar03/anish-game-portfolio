"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, CheckCircle2, Crosshair, LockKeyhole, MapPin, Radio, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { achievements, activeQuests, timeline } from "@/lib/portfolio-data";

const mapViews = ["Journey", "Achievements", "Quest board", "Guide NPC"] as const;

const npcReplies: Record<string, string> = {
  "What does Anish build?": "Production-shaped backend and AI systems. The recurring pattern is clear boundaries, observability, honest fallback behavior, and enough frontend craft to make the system usable.",
  "Show me the hardest project": "Open Project Dharma in the mission archive. Gita GPT combines hybrid retrieval, citations, provider failover, background ingestion, multi-user persistence, and a public deployment.",
  "Why should I interview him?": "Because the repositories show range without losing depth: C++ packet parsing, Java security, Python APIs, agent graphs, React products, containers, and detailed architectural reasoning.",
};

export function MapZone() {
  const reducedMotion = useReducedMotion() ?? false;
  const [view, setView] = useState<(typeof mapViews)[number]>("Journey");
  const [selectedStop, setSelectedStop] = useState(timeline[0].id);
  const [reply, setReply] = useState(npcReplies["What does Anish build?"]);
  const stop = useMemo(() => timeline.find((item) => item.id === selectedStop) ?? timeline[0], [selectedStop]);

  return (
    <motion.section
      className="zone-page"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="zone-heading-row">
        <div>
          <p className="section-kicker">Field map / Experience</p>
          <h1 className="zone-title">Campaign atlas</h1>
          <p className="zone-lede">Trace the journey, inspect unlocked achievements, scan current quests, or ask the guide terminal for a fast briefing.</p>
        </div>
        <div className="filter-tabs map-tabs" role="tablist" aria-label="Experience map views">
          {mapViews.map((item) => (
            <button key={item} role="tab" aria-selected={view === item} data-active={view === item} onClick={() => setView(item)}>{item}</button>
          ))}
        </div>
      </div>

      {view === "Journey" && (
        <div className="world-map-layout">
          <div className="world-map" aria-label="Career and learning timeline">
            <div className="map-grid" aria-hidden="true" />
            <div className="map-route" aria-hidden="true" />
            {timeline.map((item, index) => (
              <button
                key={item.id}
                className={`map-stop stop-${index + 1}`}
                data-active={selectedStop === item.id}
                onClick={() => setSelectedStop(item.id)}
                aria-label={`Inspect ${item.title}`}
              >
                <span><MapPin size={16} /></span>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <small>{item.phase}</small>
              </button>
            ))}
            <div className="map-scan" aria-hidden="true" />
          </div>
          <motion.aside key={stop.id} className="map-inspector" initial={reducedMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}>
            <p className="detail-label">Selected coordinate</p>
            <span className="coordinate">{stop.coordinate}</span>
            <h2>{stop.title}</h2>
            <p>{stop.detail}</p>
            <div className="map-status"><Radio size={15} /><span>Signal verified / archive online</span></div>
          </motion.aside>
        </div>
      )}

      {view === "Achievements" && (
        <div className="achievement-grid">
          {achievements.map((achievement, index) => (
            <motion.article key={achievement.id} className="achievement-card" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
              <div className="achievement-icon"><Trophy size={24} /></div>
              <span>Achievement unlocked</span>
              <h2>{achievement.title}</h2>
              <p>{achievement.detail}</p>
              <strong>+{achievement.xp.toLocaleString()} XP</strong>
            </motion.article>
          ))}
          <article className="achievement-card locked">
            <div className="achievement-icon"><LockKeyhole size={24} /></div>
            <span>Hidden achievement</span>
            <h2>Overclock</h2>
            <p>A classic sequence is waiting in the command deck.</p>
            <strong>Secret input required</strong>
          </article>
        </div>
      )}

      {view === "Quest board" && (
        <div className="quest-board">
          {activeQuests.map((quest, index) => (
            <article key={quest.title}>
              <div className="quest-number">Q-{String(index + 1).padStart(2, "0")}</div>
              <div><span className={`quest-status ${quest.status === "Open" ? "open" : ""}`}>{quest.status}</span><h2>{quest.title}</h2><p>{quest.detail}</p></div>
              <CheckCircle2 size={21} />
            </article>
          ))}
          <div className="quest-callout">
            <Crosshair size={30} />
            <div><p className="detail-label">Next mission slot</p><h2>A high-trust engineering team</h2><p>Open to backend, platform, distributed systems, and applied AI opportunities where clear thinking matters as much as code.</p></div>
          </div>
        </div>
      )}

      {view === "Guide NPC" && (
        <div className="npc-terminal">
          <div className="npc-portrait" aria-hidden="true"><Bot size={54} /><span className="online-dot" /></div>
          <div className="npc-dialogue">
            <p className="detail-label">A.K.I.R.A / Portfolio guide</p>
            <h2>Repository intelligence online.</h2>
            <motion.p key={reply} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>{reply}</motion.p>
            <div className="npc-prompts">
              {Object.keys(npcReplies).map((prompt) => <button key={prompt} onClick={() => setReply(npcReplies[prompt])}>{prompt}</button>)}
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
