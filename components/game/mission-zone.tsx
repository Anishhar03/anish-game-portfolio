"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitBranch, ShieldCheck, Swords } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { missions, type Mission } from "@/lib/portfolio-data";

const filters = ["All", "AI", "Backend", "Systems", "Full stack"] as const;

function MissionDetail({ mission }: { mission: Mission }) {
  return (
    <DialogContent>
      <div className="mission-dialog-visual">
        <Image src={mission.image} alt={`${mission.title} repository preview`} fill sizes="920px" />
        <div className="mission-dialog-shade" />
        <div className="mission-dialog-heading">
          <p>{mission.codename} / {mission.category}</p>
          <DialogTitle>{mission.title}</DialogTitle>
          <DialogDescription>{mission.summary}</DialogDescription>
        </div>
      </div>
      <div className="mission-dialog-body">
        <div className="mission-readout">
          <span><b>{mission.difficulty}</b> difficulty</span>
          <span><b>{mission.completion}%</b> complete</span>
          <span><b>{mission.metric}</b> primary metric</span>
        </div>
        <section>
          <p className="detail-label">Mission story</p>
          <p>{mission.story}</p>
        </section>
        <div className="boss-grid">
          <section>
            <Swords size={18} />
            <p className="detail-label">Boss battle</p>
            <p>{mission.challenge}</p>
          </section>
          <section>
            <ShieldCheck size={18} />
            <p className="detail-label">Countermeasure</p>
            <p>{mission.solution}</p>
          </section>
        </div>
        <section className="result-block">
          <p className="detail-label">Result unlocked</p>
          <p>{mission.result}</p>
        </section>
        <div className="tech-rack" aria-label="Technologies used">
          {mission.stack.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <div className="dialog-actions">
          <a className="primary-button" href={mission.repo} target="_blank" rel="noreferrer"><GitBranch size={15} /> Inspect source</a>
          {mission.live && <a className="ghost-button" href={mission.live} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Launch live system</a>}
        </div>
      </div>
    </DialogContent>
  );
}

export function MissionZone() {
  const reducedMotion = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => filter === "All" ? missions : missions.filter((mission) => mission.category === filter),
    [filter],
  );

  return (
    <motion.section
      className="zone-page"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      <div className="zone-heading-row">
        <div>
          <p className="section-kicker">Mission archive / 06 records</p>
          <h1 className="zone-title">Selected operations</h1>
          <p className="zone-lede">Open a record to inspect the architecture, boss battle, countermeasure, stack, and verified outcome.</p>
        </div>
        <div className="filter-tabs" role="tablist" aria-label="Filter missions">
          {filters.map((item) => (
            <button key={item} role="tab" aria-selected={filter === item} data-active={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>

      <div className="mission-grid">
        {visible.map((mission, index) => (
          <Dialog key={mission.id}>
            <DialogTrigger asChild>
              <motion.button
                className={`mission-card accent-${mission.accent}`}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="mission-image">
                  <Image src={mission.image} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" />
                  <div className="mission-image-overlay" />
                  <span className="difficulty-badge">{mission.difficulty}</span>
                  <span className="mission-index">M-0{index + 1}</span>
                </div>
                <div className="mission-card-body">
                  <div className="mission-card-title">
                    <div>
                      <p>{mission.codename}</p>
                      <h2>{mission.title}</h2>
                    </div>
                    <ArrowUpRight size={20} />
                  </div>
                  <p className="mission-summary">{mission.summary}</p>
                  <div className="mission-progress"><span style={{ width: `${mission.completion}%` }} /></div>
                  <div className="mission-foot"><span>{mission.completion}% complete</span><strong>{mission.metric}</strong></div>
                  <div className="tech-rack compact">
                    {mission.stack.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
              </motion.button>
            </DialogTrigger>
            <MissionDetail mission={mission} />
          </Dialog>
        ))}
      </div>
    </motion.section>
  );
}
