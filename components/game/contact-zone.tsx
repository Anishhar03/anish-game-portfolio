"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ContactRound, Copy, GitBranch, RadioTower, RotateCcw, Send, Zap } from "lucide-react";
import { FormEvent, useState } from "react";

const syncPattern = [1, 3, 2];

function SignalSync() {
  const [sequence, setSequence] = useState<number[]>([]);
  const solved = sequence.join("") === syncPattern.join("");
  const failed = sequence.some((value, index) => syncPattern[index] !== value);

  const hit = (value: number) => {
    if (solved || failed) return;
    setSequence((current) => [...current, value]);
  };

  return (
    <div className="signal-game">
      <div className="signal-game-head"><Zap size={17} /><span>Optional mini challenge</span><strong>{solved ? "SYNCED" : failed ? "FAULT" : `${sequence.length}/3`}</strong></div>
      <p>Align the three relays in ascending signal strength: low, high, medium.</p>
      <div className="relay-row">
        {[1, 2, 3].map((value) => (
          <button key={value} onClick={() => hit(value)} data-hit={sequence.includes(value)} aria-label={`Activate relay ${value}`}>
            <RadioTower size={22} /><span>R-{value}</span>
          </button>
        ))}
      </div>
      {(failed || solved) && (
        <button className="reset-game" onClick={() => setSequence([])}><RotateCcw size={14} /> {solved ? "Run again" : "Reset relays"}</button>
      )}
      {solved && <div className="sync-success"><Check size={16} /> Signal channel boosted. Achievement: Frequency Found.</div>}
    </div>
  );
}

export function ContactZone() {
  const reducedMotion = useReducedMotion() ?? false;
  const [state, setState] = useState<"idle" | "sending" | "ready">("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const briefing = `Hello Anish,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`;

  const copyBriefing = async () => {
    await navigator.clipboard.writeText(briefing);
    setCopied(true);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    window.setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(briefing);
        setCopied(true);
      } catch {
        setCopied(false);
      }
      setState("ready");
    }, 850);
  };

  return (
    <motion.section
      className="zone-page contact-page"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="zone-heading-row">
        <div>
          <p className="section-kicker">Secure contact portal</p>
          <h1 className="zone-title">Start the next mission</h1>
          <p className="zone-lede">Send a concise briefing, inspect the source archive, or open a direct professional channel.</p>
        </div>
        <div className="portal-status"><span className="online-dot" /><div><small>Channel state</small><strong>Ready for contact</strong></div></div>
      </div>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={submit}>
          <div className="form-grid">
            <label><span>Your name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Recruiter or collaborator" /></label>
            <label><span>Reply address</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" /></label>
          </div>
          <label><span>Mission briefing</span><textarea required minLength={12} rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell Anish about the role, problem, or idea." /></label>
          <button className="primary-button transmission-button" type="submit" disabled={state === "sending"}>
            {state === "sending" ? <><RadioTower size={16} /> Encoding briefing...</> : state === "ready" ? <><Check size={16} /> Briefing prepared</> : <><Send size={16} /> Prepare transmission</>}
          </button>
          {state === "ready" && (
            <motion.div className="transmission-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Check size={18} />
              <div><strong>Your briefing is ready.</strong><span>{copied ? "It is copied to your clipboard. Open LinkedIn and paste it into a message." : "Copy it, then open LinkedIn to send it."}</span></div>
              {!copied && <button type="button" onClick={copyBriefing}><Copy size={15} /> Copy</button>}
            </motion.div>
          )}
        </form>

        <aside className="contact-sidebar">
          <div className="contact-channel">
            <p className="detail-label">Professional channel</p>
            <h2>LinkedIn</h2>
            <p>Best route for roles, engineering conversations, and collaboration.</p>
            <a className="ghost-button" href="https://www.linkedin.com/in/anish-kumar-98a04a1bb" target="_blank" rel="noreferrer"><ContactRound size={15} /> Open LinkedIn</a>
          </div>
          <div className="contact-channel">
            <p className="detail-label">Source channel</p>
            <h2>GitHub</h2>
            <p>Inspect implementation detail, commit history, documentation, and active repositories.</p>
            <a className="ghost-button" href="https://github.com/Anishhar03" target="_blank" rel="noreferrer"><GitBranch size={15} /> Open GitHub</a>
          </div>
          <SignalSync />
        </aside>
      </div>
    </motion.section>
  );
}
