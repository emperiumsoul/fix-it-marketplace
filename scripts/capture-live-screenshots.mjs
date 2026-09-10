import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TARGETS = [
  {
    name: 'live_figure_3_2_design_system.png',
    url: 'http://localhost:3000/design-system',
    caption: 'Figure 3-2: Live Fix-It Design System Architecture & Interactive Components',
    waitForSelector: 'body',
    delay: 4000,
  },
  {
    name: 'live_figure_4_1_homepage_catalog.png',
    url: 'http://localhost:3000',
    caption: 'Figure 4-1: Live Marketplace Homepage & Service Discovery Catalog',
    waitForSelector: 'body',
    delay: 4000,
  },
];

async function capture() {
  console.log(`Connecting to Edge at ${EDGE_PATH}...`);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--window-size=1440,900',
    ],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2, // 2x high-resolution capture
    },
  });

  const page = await browser.newPage();

  for (const target of TARGETS) {
    const outputPath = path.join(OUTPUT_DIR, target.name);
    console.log(`Capturing: ${target.url} -> ${target.name}...`);
    try {
      let res = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (res && res.status() >= 400 && target.fallbackUrl) {
        console.log(`  Target returned ${res.status()}, falling back to ${target.fallbackUrl}`);
        await page.goto(target.fallbackUrl, { waitUntil: 'networkidle2', timeout: 20000 });
      }
      if (target.delay) {
        await new Promise((r) => setTimeout(r, target.delay));
      }
      await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width: 1440,
          height: 900,
        },
      });
      console.log(`  Saved: ${outputPath}`);
    } catch (err) {
      console.error(`  Error capturing ${target.name}:`, err.message);
      if (target.fallbackUrl) {
        try {
          console.log(`  Retrying with fallback: ${target.fallbackUrl}`);
          await page.goto(target.fallbackUrl, { waitUntil: 'networkidle2', timeout: 20000 });
          if (target.delay) await new Promise((r) => setTimeout(r, target.delay));
          await page.screenshot({
            path: outputPath,
            type: 'png',
            clip: { x: 0, y: 0, width: 1440, height: 900 },
          });
          console.log(`  Saved fallback: ${outputPath}`);
        } catch (fbErr) {
          console.error(`  Fallback also failed:`, fbErr.message);
        }
      }
    }
  }

  await browser.close();
  console.log('All live screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
