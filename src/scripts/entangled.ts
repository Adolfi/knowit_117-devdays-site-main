/** Paired, evolving particle clouds inspired by Bjørn Staal's Entangled.
 * Original procedural geometry; no external artwork or runtime dependencies.
 */
function initField() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tau = Math.PI * 2;
  let width = 0, height = 0, radius = 0;
  let frame = 0, resizeFrame = 0, lastFrame = 0, elapsed = 0;
  let colors: string[] = [];
  let particles: { orbit: number; angle: number; scatter: number; size: number; tone: number }[] = [];
  let bridge: { u: number; angle: number; spread: number }[] = [];
  // A repeatable distribution prevents the composition jumping on resize.
  let seed = 721;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  function readPalette() {
    const style = getComputedStyle(document.documentElement);
    colors = ['silver', 'violet', 'blue'].map(name => style.getPropertyValue(`--field-${name}`).trim());
  }

  function centers(t: number) {
    const portrait = width < height * 0.8;
    return portrait
      ? [{ x: width * 0.37, y: height * (0.37 + Math.sin(t * 0.09) * 0.025) },
         { x: width * 0.65, y: height * (0.76 + Math.cos(t * 0.08) * 0.025) }]
      : [{ x: width * (0.32 + Math.sin(t * 0.08) * 0.025), y: height * 0.53 },
         { x: width * (0.78 + Math.cos(t * 0.07) * 0.025), y: height * 0.57 }];
  }

  // Warped orbital shells, projected from 3D. Inner orbits form the bright knots.
  function point(orbit: number, angle: number, scatter: number, t: number, home: number) {
    const core = orbit >= 24;
    const phase = orbit * 2.39996;
    const a = angle + t * (home ? -0.085 : 0.075) + phase;
    const breathe = Math.sin(t * 0.23 + home * 2 + phase) * 0.025;
    const shell = core ? 0.19 + (orbit - 24) * 0.008 : 0.42 + (orbit % 9) * 0.07;
    const r = shell * (1 + Math.sin(a * 3 + phase + t * 0.12) * 0.18
      + Math.sin(a * 7 - phase - t * 0.08) * 0.075) + scatter + breathe;
    const inclination = Math.sin(phase) * 1.25;
    const tilt = phase + Math.sin(t * 0.1 + orbit) * 0.12;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r * Math.cos(inclination);
    const z = Math.sin(a) * r * Math.sin(inclination);
    const rotation = t * 0.045 * (home ? -1 : 1);
    const rx = x * Math.cos(rotation) + z * Math.sin(rotation);
    const rz = z * Math.cos(rotation) - x * Math.sin(rotation);
    const perspective = 1 + rz * 0.16;
    return {
      x: (rx * Math.cos(tilt) - y * Math.sin(tilt)) * radius * perspective,
      y: (rx * Math.sin(tilt) + y * Math.cos(tilt)) * radius * perspective,
      z: rz,
    };
  }

  function paint() {
    ctx!.clearRect(0, 0, width, height);
    const t = elapsed / 1000;
    const hubs = centers(t);
    const paths = Array.from({ length: 6 }, () => new Path2D());
    for (let home = 0; home < 2; home++) {
      const hub = hubs[home];
      // Dust lies along the same folded surfaces as the filaments.
      for (const p of particles) {
        const q = point(p.orbit, p.angle, p.scatter, t, home);
        const bucket = p.tone + (q.z > 0.1 ? 3 : 0);
        const size = p.size * (q.z > 0 ? 1 : 0.75);
        paths[bucket].rect(hub.x + q.x, hub.y + q.y, size, size);
      }
      // Sparse hairlines expose the topology without turning it into a wire globe.
      ctx!.strokeStyle = colors[0];
      ctx!.lineWidth = 0.45;
      for (let orbit = 0; orbit < 30; orbit++) {
        const path = new Path2D();
        const steps = width < 640 ? 90 : 150;
        for (let i = 0; i <= steps; i++) {
          const q = point(orbit, i / steps * tau, 0, t, home);
          if (i === 0) path.moveTo(hub.x + q.x, hub.y + q.y);
          else path.lineTo(hub.x + q.x, hub.y + q.y);
        }
        ctx!.globalAlpha = orbit >= 24 ? 0.28 : 0.1;
        ctx!.stroke(path);
      }
      // Occasional chords and bright nodes give the outer cloud a fragile web.
      const web = new Path2D();
      for (let i = 0; i < 28; i++) {
        const angle = i * 2.39996;
        const a = point(i % 24, angle, 0, t, home);
        const b = point(i % 24, angle + 0.4, 0, t, home);
        web.moveTo(hub.x + a.x, hub.y + a.y);
        web.lineTo(hub.x + b.x, hub.y + b.y);
        paths[3].rect(hub.x + a.x, hub.y + a.y, 1.2, 1.2);
      }
      ctx!.globalAlpha = 0.06;
      ctx!.stroke(web);
    }
    // An organic umbilical stream joins the two cores and gently twists in depth.
    const [a, b] = hubs;
    const dx = b.x - a.x, dy = b.y - a.y;
    const distance = Math.hypot(dx, dy);
    for (const p of bridge) {
      const u = (p.u + t * 0.035) % 1;
      const envelope = Math.sin(u * Math.PI);
      const winding = Math.sin(u * 13 - t * 0.45) * radius * 0.025 * envelope;
      const spread = (0.018 + Math.pow(Math.abs(u - 0.5) * 2, 3) * 0.07) * radius;
      const offset = Math.sin(p.angle + u * 9 + t * 0.22) * p.spread * spread + winding;
      paths[p.spread > 0.8 ? 0 : 3].rect(a.x + dx * u - dy / distance * offset,
        a.y + dy * u + dx / distance * offset, 0.65, 0.65);
    }
    for (let i = 0; i < paths.length; i++) {
      ctx!.fillStyle = colors[i % 3];
      ctx!.globalAlpha = i < 3 ? 0.38 : 0.8;
      ctx!.fill(paths[i]);
    }
    ctx!.globalAlpha = 1;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    radius = Math.min(width < height * 0.8 ? width * 0.55 : width * 0.22, height * 0.34);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75,
      Math.sqrt(3_000_000 / Math.max(1, width * height)));
    canvas!.width = Math.round(width * ratio);
    canvas!.height = Math.round(height * ratio);
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    seed = 721;
    particles = Array.from({ length: width < 640 ? 5500 : 14500 }, () => ({
      orbit: Math.floor(random() * 30), angle: random() * tau,
      scatter: (random() - 0.5) * (random() < 0.85 ? 0.032 : 0.18),
      size: random() < 0.025 ? 1.1 : 0.75 + random() * 0.3,
      tone: random() < 0.8 ? 0 : random() < 0.5 ? 1 : 2,
    }));
    bridge = Array.from({ length: width < 640 ? 1500 : 3500 }, () => ({
      u: random(), angle: random() * tau, spread: random(),
    }));
    readPalette();
    paint();
  }

  function tick(now: number) {
    frame = requestAnimationFrame(tick);
    if (!lastFrame) lastFrame = now;
    const delta = now - lastFrame;
    if (delta < 1000 / 30) return;
    elapsed += Math.min(delta, 100);
    lastFrame = now;
    paint();
  }
  function syncMotion() {
    cancelAnimationFrame(frame);
    lastFrame = 0;
    if (!document.hidden && !reduce.matches) frame = requestAnimationFrame(tick);
  }
  resize();
  syncMotion();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(resize);
  });
  document.addEventListener('visibilitychange', syncMotion);
  reduce.addEventListener('change', syncMotion);
  new MutationObserver(() => {
    readPalette();
    paint();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
if (document.readyState === 'complete') requestAnimationFrame(initField);
else window.addEventListener('load', () => requestAnimationFrame(initField), { once: true });
