import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const cssPath = path.join(root, 'v2ex-github-theme.css');

const SECTION_MAP = [
  { pattern: /^1\. CSS Variables/, file: 'tokens/variables-light.css' },
  { pattern: /^2\. Global Reset/, file: 'base/reset.css' },
  { pattern: /^2\.5 V2EX Overrides/, file: 'base/v2ex-overrides.css' },
  { pattern: /^3\. Top Navigation/, file: 'components/topbar.css' },
  { pattern: /^4\. Search Box/, file: 'components/search.css' },
  { pattern: /^5\. Three-Column Layout/, file: 'layout/three-column.css' },
  { pattern: /^6\. Leftbar/, file: 'components/leftbar.css' },
  { pattern: /^7\. Main Content/, file: 'components/main-content.css' },
  { pattern: /^8\. Tabs/, file: 'components/tabs.css' },
  { pattern: /^9\. Topic List/, file: 'components/topic-list.css' },
  { pattern: /^10\. Topic Detail/, file: 'components/topic-detail.css' },
  { pattern: /^11\. Reply/, file: 'components/reply.css' },
  { pattern: /^12\. Buttons/, file: 'components/buttons.css' },
  { pattern: /^13\. Form Controls/, file: 'components/forms.css' },
  { pattern: /^14\. Node/, file: 'components/node-tag.css' },
  { pattern: /^15\. Profile/, file: 'components/profile.css' },
  { pattern: /^16\. Login/, file: 'components/auth.css' },
  { pattern: /^16\.1 Sign In/, file: 'components/auth-signin.css' },
  { pattern: /^17\. Bottom/, file: 'components/bottom.css' },
  { pattern: /^18\. Dark Mode/, file: 'themes/dark.css' },
];

const content = fs.readFileSync(cssPath, 'utf8');
const lines = content.split(/\r?\n/);

const headerEnd = lines.findIndex((line, i) => i > 0 && line.startsWith('/* ==='));
const header = lines.slice(0, headerEnd).join('\n');

const sections = [];
let current = null;

for (let i = headerEnd; i < lines.length; i++) {
  const line = lines[i];
  const match = line.match(/^\/\* === (.+?) === \*\/\r?$/);
  if (match) {
    if (current) sections.push(current);
    current = { title: match[1], lines: [line] };
  } else if (current) {
    current.lines.push(line);
  }
}
if (current) sections.push(current);

function findFile(title) {
  const entry = SECTION_MAP.find(({ pattern }) => pattern.test(title));
  if (!entry) throw new Error(`No mapping for section: ${title}`);
  return entry.file;
}

for (const dir of ['tokens', 'base', 'layout', 'components', 'themes']) {
  fs.mkdirSync(path.join(srcDir, dir), { recursive: true });
}

const imports = [];

for (const section of sections) {
  const relFile = findFile(section.title);
  const outPath = path.join(srcDir, relFile);
  const body = section.lines.join('\n').trimEnd() + '\n';
  fs.writeFileSync(outPath, body);
  imports.push(relFile);
  console.log(`Wrote ${relFile} (${section.title})`);
}

const indexContent = `${header}
${imports.map((f) => `@import "./${f}";`).join('\n')}
`;
fs.writeFileSync(path.join(srcDir, 'index.css'), indexContent);
console.log('Wrote src/index.css');
