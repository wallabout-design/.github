// Checks the community health files: the required files exist and every
// issue template starts with front matter. Run: node scripts/check.mjs
import fs from 'node:fs';

const problems = [];
for (const f of ['README.md', 'LICENSE', 'PULL_REQUEST_TEMPLATE.md', 'AGENTS.md']) {
  if (!fs.existsSync(f) || fs.statSync(f).size === 0) problems.push(`missing or empty: ${f}`);
}
for (const d of ['ISSUE_TEMPLATE', 'profile']) {
  if (!fs.existsSync(d)) problems.push(`missing directory: ${d}/`);
}
if (fs.existsSync('ISSUE_TEMPLATE')) {
  for (const f of fs.readdirSync('ISSUE_TEMPLATE').filter((n) => n.endsWith('.md'))) {
    if (!fs.readFileSync(`ISSUE_TEMPLATE/${f}`, 'utf8').startsWith('---\n')) problems.push(`no front matter: ISSUE_TEMPLATE/${f}`);
  }
}
if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('community health files ok');
