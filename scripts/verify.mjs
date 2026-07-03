import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "app/page.tsx",
  "app/layout.tsx",
  "components/game/portfolio-game.tsx",
  "components/game/energy-core.tsx",
  "components/game/mission-zone.tsx",
  "components/game/skill-zone.tsx",
  "components/game/map-zone.tsx",
  "components/game/contact-zone.tsx",
  "lib/portfolio-data.ts",
  ".openai/hosting.json",
  "public/anish-avatar.jpg",
  "public/og-card.png",
];

const failures = [];
for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) failures.push(`Missing required file: ${file}`);
}

const data = readFileSync(resolve(root, "lib/portfolio-data.ts"), "utf8");
const game = readFileSync(resolve(root, "components/game/portfolio-game.tsx"), "utf8");
const readme = readFileSync(resolve(root, "README.md"), "utf8");
const allSource = [data, game, readme, readFileSync(resolve(root, "app/layout.tsx"), "utf8")].join("\n");

const missionCount = (data.match(/codename: "/g) ?? []).length;
if (missionCount !== 6) failures.push(`Expected 6 missions, found ${missionCount}`);

for (const expected of [
  "https://github.com/Anishhar03",
  "https://www.linkedin.com/in/anish-kumar-98a04a1bb",
  "Gita GPT",
  "Packet Analyser",
  "Skill tree",
]) {
  if (!allSource.includes(expected)) failures.push(`Missing expected content: ${expected}`);
}

for (const asset of ["public/anish-avatar.jpg", "public/og-card.png"]) {
  if (existsSync(resolve(root, asset)) && statSync(resolve(root, asset)).size < 1000) {
    failures.push(`Asset is unexpectedly small: ${asset}`);
  }
}

if (/Starter Project|decrypting now/i.test(allSource)) failures.push("Starter or placeholder copy remains in source");
if (/(github_pat_|ghp_[A-Za-z0-9]{20,}|gsk_[A-Za-z0-9]{20,}|rnd_[A-Za-z0-9]{20,})/.test(allSource)) {
  failures.push("Potential secret found in committed source");
}

JSON.parse(readFileSync(resolve(root, ".openai/hosting.json"), "utf8"));

if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`PASS: ${requiredFiles.length} required files, ${missionCount} missions, links, assets, metadata, and secret scan verified.`);
