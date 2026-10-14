import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Checks the role tokens in tokens.css for text contrast in both themes, and that every var() used in
// globals.css resolves to a defined token. Run with `pnpm check:design`.
const css = await readFile(new URL('../src/app/tokens.css', import.meta.url), 'utf8');
const declarations = block => Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));
const light = declarations(css.match(/:root\s*\{([^}]+)\}/)[1]);
const dark = { ...light, ...declarations(css.match(/html\.dark\s*\{([^}]+)\}/)[1]) };

function resolve(tokens, name, visited = new Set()) {
  assert.ok(!visited.has(name), `Circular token: ${name}`);
  visited.add(name);
  const value = tokens[name];
  assert.ok(value, `Missing token: ${name}`);
  const reference = value.match(/^var\((--[\w-]+)\)$/);
  return reference ? resolve(tokens, reference[1], visited) : value;
}

function luminance(hex) {
  assert.match(hex, /^#(?:[a-f\d]{3}|[a-f\d]{6})$/i);
  const full = hex.length === 4 ? [...hex.slice(1)].map(char => char + char).join('') : hex.slice(1);
  const channels = full.match(/../g).map(channel => {
    const value = parseInt(channel, 16) / 255;
    return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  });
  return channels.reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
}

const pairs = [
  ['foreground', 'background'], ['foreground', 'surface'], ['foreground-soft', 'background'],
  ['foreground-soft', 'surface'], ['foreground-soft', 'surface-sunken'], ['accent-text', 'surface'],
  ['accent-text', 'accent-soft'], ['accent-foreground', 'accent'],
];

for (const [theme, tokens] of [['light', light], ['dark', dark]]) {
  for (const [ink, ground] of pairs) {
    const values = [luminance(resolve(tokens, `--${ink}`)), luminance(resolve(tokens, `--${ground}`))].sort((a, b) => b - a);
    const ratio = (values[0] + .05) / (values[1] + .05);
    assert.ok(ratio >= 4.5, `${theme}: ${ink} on ${ground} is ${ratio.toFixed(2)}:1`);
  }
  console.log(`${theme}: all ${pairs.length} role pairs meet 4.5:1.`);
}

const styles = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');
const defined = new Set([...`${css}\n${styles}`.matchAll(/(--[\w-]+):/g)].map(([, name]) => name));
for (const [, name] of styles.matchAll(/var\((--[\w-]+)/g)) {
  if (name === '--font-jakarta' || name === '--cards-height') continue;
  assert.ok(defined.has(name), `Undefined CSS token: ${name}`);
}
console.log('All CSS token references resolve.');
