"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Braces, BrainCircuit, DatabaseZap, LockKeyhole, Network, PackageOpen, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { skillBranches } from "@/lib/portfolio-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const branchIcons = {
  backend: DatabaseZap,
  ai: BrainCircuit,
  frontend: Braces,
  systems: Network,
};

export function SkillZone() {
  const reducedMotion = useReducedMotion() ?? false;
  const [branchId, setBranchId] = useState("backend");
  const [skillName, setSkillName] = useState("FastAPI");
  const [unlocked, setUnlocked] = useState(() => new Set(skillBranches.map((branch) => branch.skills[0].name)));
  const activeBranch = useMemo(
    () => skillBranches.find((branch) => branch.id === branchId) ?? skillBranches[0],
    [branchId],
  );
  const activeSkill = activeBranch.skills.find((skill) => skill.name === skillName) ?? activeBranch.skills[0];

  const selectBranch = (id: string) => {
    const next = skillBranches.find((branch) => branch.id === id) ?? skillBranches[0];
    setBranchId(next.id);
    setSkillName(next.skills[0].name);
  };

  const inspectNode = (index: number) => {
    const skill = activeBranch.skills[index];
    const prerequisite = activeBranch.skills[index - 1];
    if (index === 0 || unlocked.has(skill.name) || unlocked.has(prerequisite.name)) {
      setUnlocked((current) => new Set([...current, skill.name]));
      setSkillName(skill.name);
    }
  };

  return (
    <motion.section
      className="zone-page"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="zone-heading-row">
        <div>
          <p className="section-kicker">Capability graph / 16 nodes</p>
          <h1 className="zone-title">Skill tree</h1>
          <p className="zone-lede">Select a branch, inspect a node, and trace every claimed capability back to shipped work.</p>
        </div>
        <div className="level-readout">
          <Sparkles size={18} />
          <div><span>Engineer level</span><strong>26 / Ascending</strong></div>
        </div>
      </div>

      <div className="skill-layout">
        <aside className="branch-selector" aria-label="Skill branches">
          {skillBranches.map((branch) => {
            const Icon = branchIcons[branch.id as keyof typeof branchIcons];
            return (
              <button key={branch.id} data-active={branchId === branch.id} className={`branch-button accent-${branch.color}`} onClick={() => selectBranch(branch.id)}>
                <Icon size={19} />
                <span>{branch.label}</span>
                <b>{branch.skills.length}/4</b>
              </button>
            );
          })}
        </aside>

        <div className={`skill-tree accent-${activeBranch.color}`}>
          <div className="tree-core">
            <span>Core class</span>
            <strong>{activeBranch.label}</strong>
            <small>{activeBranch.description}</small>
          </div>
          <div className="tree-path" aria-hidden="true" />
          <div className="skill-nodes">
            {activeBranch.skills.map((skill, index) => {
              const isUnlocked = unlocked.has(skill.name);
              const canUnlock = index === 0 || unlocked.has(activeBranch.skills[index - 1].name);
              return (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <motion.button
                      className="skill-node"
                      data-active={activeSkill.name === skill.name}
                      data-locked={!isUnlocked}
                      onClick={() => inspectNode(index)}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.07 }}
                    >
                      <span className="node-rank">{isUnlocked ? String(index + 1).padStart(2, "0") : <LockKeyhole size={12} />}</span>
                      <strong>{skill.name}</strong>
                      <div className="node-meter"><span style={{ width: isUnlocked ? `${skill.level}%` : "0%" }} /></div>
                      <small>{isUnlocked ? `Level ${skill.level}` : canUnlock ? "Ready to unlock" : "Prerequisite locked"}</small>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>{isUnlocked ? skill.proof : canUnlock ? "Activate to unlock this node" : `Unlock ${activeBranch.skills[index - 1].name} first`}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <aside className="skill-inspector" aria-live="polite">
          <p className="detail-label">Node inspection</p>
          <div className="inspector-level">{activeSkill.level}</div>
          <h2>{activeSkill.name}</h2>
          <p>{activeSkill.proof}</p>
          <div className="xp-bar"><span style={{ width: `${activeSkill.level}%` }} /></div>
          <div className="inspector-foot"><span>Mastery</span><strong>{activeSkill.xp}</strong></div>
          <div className="unlock-note"><span className="online-dot" /> Verified through repository evidence</div>
        </aside>
      </div>
      <section className="inventory-rack" aria-label="Technology inventory">
        <div className="inventory-title"><PackageOpen size={20} /><div><span>Inventory / Tech stack</span><strong>Equipped loadout</strong></div></div>
        <div><span>Runtimes</span><strong>Python / Java / C++ / TypeScript</strong></div>
        <div><span>Data</span><strong>PostgreSQL / pgvector / MongoDB / Redis</strong></div>
        <div><span>Platform</span><strong>Docker / Envoy / CI/CD / Render</strong></div>
        <div><span>Interface</span><strong>React / Next.js / PWA / Three.js</strong></div>
      </section>
    </motion.section>
  );
}
