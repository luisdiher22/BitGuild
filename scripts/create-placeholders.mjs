import { writeFileSync, mkdirSync } from "fs";

// Minimal valid 1×1 PNG (amber pixel)
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

const sprites = [
  "backend-warrior",
  "frontend-mage",
  "devops-engineer",
  "fullstack-rogue",
  "ml-alchemist",
  "system-architect",
  "security-sentinel",
  "wanderer",
];

mkdirSync("public/sprites", { recursive: true });
for (const name of sprites) {
  writeFileSync(`public/sprites/${name}.png`, PLACEHOLDER_PNG);
}
console.log(`Created ${sprites.length} placeholder sprites in public/sprites/`);
