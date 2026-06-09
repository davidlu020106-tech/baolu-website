const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('src/data/products-catalog.json', 'utf8'));

function esc(s) { return (s || '').replace(/`/g, '\\`').replace(/\$/g, '\\$'); }
function h(s) { return esc(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// ===== 1. RADAR PAGE =====
const radars = catalog.radar;
const lowAlt = radars.filter(r => /低空|Low.?Alt|XW\/SR226/.test(r.product_name));
const ground = radars.filter(r => r.product_name.includes('地面') || /SR215/.test(r.product_name));
const maritime = radars.filter(r => /近海|Sea|Maritime|SR237/.test(r.product_name));
const other = radars.filter(r => !lowAlt.includes(r) && !ground.includes(r) && !maritime.includes(r));

let r = `---
import Layout from "../../layouts/Layout.astro";
import ProductCard from "../../components/ProductCard.astro";
import SectionHeader from "../../components/SectionHeader.astro";
---
<Layout title="Radar Systems — Baolu Tech">
  <section class="hero-gradient pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="text-sm text-baolu-gray mb-4"><a href="/" class="hover:text-baolu-accent">Home</a> / <a href="/products" class="hover:text-baolu-accent">Products</a> / <span class="text-baolu-light">Radar Systems</span></nav>
      <h1 class="text-4xl font-bold text-white">Radar Systems</h1>
      <p class="mt-4 text-baolu-light/70 max-w-3xl">Comprehensive radar portfolio covering low-altitude surveillance, ground surveillance, and maritime surveillance — from compact portable radars to long-range phased array systems.</p>
    </div>
  </section>
  <section class="py-16 bg-baolu-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\n`;

const groups = [
  { title: 'Low-Altitude Surveillance Radars', sub: 'Airspace monitoring for drones, aircraft, and bird detection', items: [...lowAlt, ...other] },
  { title: 'Ground Surveillance Radars', sub: 'Perimeter security and border surveillance for personnel and vehicles', items: ground },
  { title: 'Maritime & Coastal Surveillance Radars', sub: 'Sea surface monitoring for vessels and low-altitude targets', items: maritime },
];

groups.forEach(g => {
  if (g.items.length === 0) return;
  r += `      <SectionHeader title="${h(g.title)}" subtitle="${h(g.sub)}" />\n`;
  r += `      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">\n`;
  g.items.forEach(p => {
    const spec = (p.specifications || '').substring(0, 500);
    r += `        <ProductCard name="${h(p.product_name)}" description="${h((p.description || '').substring(0, 200))}" specs={\`${esc(spec)}\`} source="${h(p.source)}" />\n`;
  });
  r += `      </div>\n`;
});

r += `      <div class="text-center mt-12 pt-8 border-t border-baolu-blue/20">
        <p class="text-baolu-gray mb-4">Need assistance selecting the right radar system?</p>
        <a href="/contact" class="inline-flex items-center px-8 py-4 rounded-lg bg-baolu-accent text-white font-semibold text-lg hover:bg-baolu-accent/90 transition-colors">Contact Our Radar Specialists</a>
      </div>
    </div>
  </section>
</Layout>`;
fs.writeFileSync('src/pages/products/radar.astro', r);
console.log('radar.astro: ' + radars.length + ' products');

// ===== 2. JAMMER PAGE =====
const jammers = catalog.jammer;
let j = `---
import Layout from "../../layouts/Layout.astro";
import ProductCard from "../../components/ProductCard.astro";
import SectionHeader from "../../components/SectionHeader.astro";
---
<Layout title="Countermeasure Systems — Baolu Tech">
  <section class="hero-gradient pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="text-sm text-baolu-gray mb-4"><a href="/" class="hover:text-baolu-accent">Home</a> / <a href="/products" class="hover:text-baolu-accent">Products</a> / <span class="text-baolu-light">Countermeasure Systems</span></nav>
      <h1 class="text-4xl font-bold text-white">Countermeasure Systems</h1>
      <p class="mt-4 text-baolu-light/70 max-w-3xl">Drone jamming and countermeasure solutions — multi-band RF suppression, navigation deception, and laser interception systems.</p>
    </div>
  </section>
  <section class="py-16 bg-baolu-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="Anti-Drone Jammers & Countermeasures" subtitle="Multi-band RF jammers, navigation deception, and laser interception" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">\n`;

jammers.forEach(p => {
  const spec = (p.specifications || '').substring(0, 400);
  j += `        <ProductCard name="${h(p.product_name)}" description="${h((p.description || '').substring(0, 200))}" specs={\`${esc(spec)}\`} source="${h(p.source)}" />\n`;
});

j += `      </div>
      <div class="text-center mt-8 pt-8 border-t border-baolu-blue/20">
        <a href="/contact" class="inline-flex items-center px-8 py-4 rounded-lg bg-baolu-accent text-white font-semibold text-lg hover:bg-baolu-accent/90 transition-colors">Inquire About Countermeasures</a>
      </div>
    </div>
  </section>
</Layout>`;
fs.writeFileSync('src/pages/products/jammer.astro', j);
console.log('jammer.astro: ' + jammers.length + ' products');

// ===== 3. SPECTRUM PAGE =====
const spec = catalog.spectrum;
let s = `---
import Layout from "../../layouts/Layout.astro";
import ProductCard from "../../components/ProductCard.astro";
import SectionHeader from "../../components/SectionHeader.astro";
---
<Layout title="Spectrum Detection — Baolu Tech">
  <section class="hero-gradient pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="text-sm text-baolu-gray mb-4"><a href="/" class="hover:text-baolu-accent">Home</a> / <a href="/products" class="hover:text-baolu-accent">Products</a> / <span class="text-baolu-light">Spectrum Detection</span></nav>
      <h1 class="text-4xl font-bold text-white">Spectrum Detection Systems</h1>
      <p class="mt-4 text-baolu-light/70 max-w-3xl">Passive RF detection and spectrum analysis for drone identification, classification, tracking, and early warning — covering 70MHz to 6GHz.</p>
    </div>
  </section>
  <section class="py-16 bg-baolu-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="RF Detection & Spectrum Analysis" subtitle="Passive detection with long-range identification and classification" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">\n`;

spec.forEach(p => {
  const specText = (p.specifications || '').substring(0, 400);
  s += `        <ProductCard name="${h(p.product_name)}" description="${h((p.description || '').substring(0, 200))}" specs={\`${esc(specText)}\`} source="${h(p.source)}" />\n`;
});

s += `      </div>
      <div class="text-center mt-8 pt-8 border-t border-baolu-blue/20">
        <a href="/contact" class="inline-flex items-center px-8 py-4 rounded-lg bg-baolu-accent text-white font-semibold text-lg hover:bg-baolu-accent/90 transition-colors">Inquire About Spectrum Detection</a>
      </div>
    </div>
  </section>
</Layout>`;
fs.writeFileSync('src/pages/products/spectrum.astro', s);
console.log('spectrum.astro: ' + spec.length + ' products');

// ===== 4. INDIVIDUAL GEAR PAGE =====
const indiv = catalog.individual;
let i = `---
import Layout from "../../layouts/Layout.astro";
import ProductCard from "../../components/ProductCard.astro";
import SectionHeader from "../../components/SectionHeader.astro";
---
<Layout title="Individual Gear — Baolu Tech">
  <section class="hero-gradient pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="text-sm text-baolu-gray mb-4"><a href="/" class="hover:text-baolu-accent">Home</a> / <a href="/products" class="hover:text-baolu-accent">Products</a> / <span class="text-baolu-light">Individual Gear</span></nav>
      <h1 class="text-4xl font-bold text-white">Individual Gear</h1>
      <p class="mt-4 text-baolu-light/70 max-w-3xl">Portable, lightweight anti-drone equipment designed for rapid deployment and field operations by individual operators.</p>
    </div>
  </section>
  <section class="py-16 bg-baolu-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="Man-Portable Anti-Drone Systems" subtitle="Compact, lightweight, rapid-deployment equipment for field operators" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">\n`;

indiv.forEach(p => {
  const specText = (p.specifications || '').substring(0, 400);
  i += `        <ProductCard name="${h(p.product_name)}" description="${h((p.description || '').substring(0, 200))}" specs={\`${esc(specText)}\`} source="${h(p.source)}" />\n`;
});

i += `      </div>
      <div class="text-center mt-8 pt-8 border-t border-baolu-blue/20">
        <a href="/contact" class="inline-flex items-center px-8 py-4 rounded-lg bg-baolu-accent text-white font-semibold text-lg hover:bg-baolu-accent/90 transition-colors">Inquire About Individual Gear</a>
      </div>
    </div>
  </section>
</Layout>`;
fs.writeFileSync('src/pages/products/individual-gear.astro', i);
console.log('individual-gear.astro: ' + indiv.length + ' products');

// ===== 5. SOLUTIONS / INTEGRATED SYSTEMS PAGE =====
const sols = catalog.solution;
let sol = `---
import Layout from "../layouts/Layout.astro";
import ProductCard from "../components/ProductCard.astro";
import SectionHeader from "../components/SectionHeader.astro";
---
<Layout title="Integrated Solutions — Baolu Tech">
  <section class="hero-gradient pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-white">Integrated Solutions</h1>
      <p class="mt-4 text-baolu-light/70 max-w-3xl">Complete anti-drone systems combining radar, RF detection, optoelectronics, and countermeasures into unified, turnkey solutions for any environment.</p>
    </div>
  </section>
  <section class="py-16 bg-baolu-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="Multi-Sensor Integrated Systems" subtitle="Turnkey counter-UAS solutions with sensor fusion and automated response" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">\n`;

sols.forEach(p => {
  const specText = (p.specifications || '').substring(0, 400);
  sol += `        <ProductCard name="${h(p.product_name)}" description="${h((p.description || '').substring(0, 250))}" specs={\`${esc(specText)}\`} source="${h(p.source)}" />\n`;
});

sol += `      </div>
      <SectionHeader title="Applications by Industry" subtitle="Tailored integrated solutions for every sector" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        <div class="rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-4 text-center hover:border-baolu-accent/50 transition-colors"><span class="text-sm font-medium text-white">Airports</span></div>
        <div class="rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-4 text-center hover:border-baolu-accent/50 transition-colors"><span class="text-sm font-medium text-white">Border Defense</span></div>
        <div class="rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-4 text-center hover:border-baolu-accent/50 transition-colors"><span class="text-sm font-medium text-white">Military</span></div>
        <div class="rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-4 text-center hover:border-baolu-accent/50 transition-colors"><span class="text-sm font-medium text-white">Critical Infrastructure</span></div>
        <div class="rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-4 text-center hover:border-baolu-accent/50 transition-colors"><span class="text-sm font-medium text-white">VIP Security</span></div>
        <div class="rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-4 text-center hover:border-baolu-accent/50 transition-colors"><span class="text-sm font-medium text-white">Correctional</span></div>
      </div>
      <div class="text-center mt-8 pt-8 border-t border-baolu-blue/20">
        <a href="/contact" class="inline-flex items-center px-8 py-4 rounded-lg bg-baolu-accent text-white font-semibold text-lg hover:bg-baolu-accent/90 transition-colors">Request a Custom Solution</a>
      </div>
    </div>
  </section>
</Layout>`;
fs.writeFileSync('src/pages/solutions.astro', sol);
console.log('solutions.astro: ' + sols.length + ' products');

// ===== 6. UPDATE products overview page =====
const prodOverview = `---
import Layout from "../layouts/Layout.astro";
---
<Layout title="Products — Baolu Tech Anti-Drone Systems">
  <section class="hero-gradient pt-32 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-white">Our Products</h1>
      <p class="mt-4 text-baolu-light/70 max-w-2xl">Comprehensive anti-drone product portfolio — from advanced radar detection to effective countermeasures. ${radars.length + jammers.length + spec.length + indiv.length + sols.length}+ systems available.</p>
    </div>
  </section>
  <section class="py-16 bg-baolu-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <a href="/products/radar" class="card-hover rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-8 group">
          <h2 class="text-2xl font-bold text-white group-hover:text-baolu-accent transition-colors">Radar Systems</h2>
          <p class="mt-2 text-baolu-gray">${radars.length} models — Low-altitude, ground, and maritime surveillance radars.</p>
          <span class="mt-4 inline-block text-baolu-accent font-medium">Browse ${radars.length} Radars →</span>
        </a>
        <a href="/products/jammer" class="card-hover rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-8 group">
          <h2 class="text-2xl font-bold text-white group-hover:text-baolu-accent transition-colors">Countermeasure Systems</h2>
          <p class="mt-2 text-baolu-gray">${jammers.length} systems — RF jammers, navigation deception, laser interception.</p>
          <span class="mt-4 inline-block text-baolu-accent font-medium">Browse ${jammers.length} Jammers →</span>
        </a>
        <a href="/products/spectrum" class="card-hover rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-8 group">
          <h2 class="text-2xl font-bold text-white group-hover:text-baolu-accent transition-colors">Spectrum Detection</h2>
          <p class="mt-2 text-baolu-gray">${spec.length} systems — Passive RF detection and spectrum analysis.</p>
          <span class="mt-4 inline-block text-baolu-accent font-medium">Browse ${spec.length} Detectors →</span>
        </a>
        <a href="/products/individual-gear" class="card-hover rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-8 group">
          <h2 class="text-2xl font-bold text-white group-hover:text-baolu-accent transition-colors">Individual Gear</h2>
          <p class="mt-2 text-baolu-gray">${indiv.length} systems — Portable integrated detection and countermeasure equipment.</p>
          <span class="mt-4 inline-block text-baolu-accent font-medium">Browse ${indiv.length} Gear →</span>
        </a>
        <a href="/solutions" class="card-hover rounded-xl bg-baolu-navy/50 border border-baolu-blue/20 p-8 group">
          <h2 class="text-2xl font-bold text-white group-hover:text-baolu-accent transition-colors">Integrated Solutions</h2>
          <p class="mt-2 text-baolu-gray">${sols.length} systems — Turnkey multi-sensor counter-UAS platforms.</p>
          <span class="mt-4 inline-block text-baolu-accent font-medium">Browse ${sols.length} Solutions →</span>
        </a>
      </div>
    </div>
  </section>
</Layout>`;
fs.writeFileSync('src/pages/products.astro', prodOverview);
console.log('products.astro updated');

console.log('\n=== ALL PAGES GENERATED ===');
console.log('Radar:', radars.length);
console.log('Jammer:', jammers.length);
console.log('Spectrum:', spec.length);
console.log('Individual:', indiv.length);
console.log('Solutions:', sols.length);
console.log('Total entries:', radars.length + jammers.length + spec.length + indiv.length + sols.length);
