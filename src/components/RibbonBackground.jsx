import { useEffect, useRef, useState } from 'react';

// Visual inspiration: https://codepen.io/bsehovac/pen/jdawXK
// Independently implemented ribbon surface for the portfolio's light palette.
export default function RibbonBackground() {
  const host = useRef(null);
  const update = useRef(() => {});
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [ready, setReady] = useState(false);
  useEffect(() => { update.current(paused); }, [paused]);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    import('three').then(THREE => {
      if (disposed) return;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
      const container = host.current;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const geometry = new THREE.PlaneGeometry(2, 2, 180, 44);
      const material = new THREE.ShaderMaterial({
        transparent: true, side: THREE.DoubleSide, depthTest: false,
        uniforms: { time: { value: 0 }, aspect: { value: 1 } },
        vertexShader: `
          uniform float time;
          uniform float aspect;
          varying vec2 surface;
          varying float fold;
          void main() {
            surface = uv;
            float x = position.x;
            float crosswise = position.y;
            float phase = x * 3.4 + time * .24;
            float wave = sin(phase) * .19 + sin(x * 6.1 - time * .17) * .06;
            float twist = sin(x * 2.6 + time * .3);
            float y = -.25 + wave + crosswise * (.15 + .09 * twist);
            y += sin(crosswise * 2.2 + phase) * .08;
            fold = twist * crosswise;
            gl_Position = vec4(x * 1.12, y * min(aspect, 1.7), 0., 1.);
          }
        `,
        fragmentShader: `
          varying vec2 surface;
          varying float fold;
          void main() {
            float edge = pow(sin(surface.y * 3.14159), .65);
            float ends = smoothstep(0., .12, surface.x) * smoothstep(0., .12, 1. - surface.x);
            vec3 sage = vec3(.43, .51, .46);
            vec3 lilac = vec3(.49, .44, .60);
            vec3 tint = mix(sage, lilac, surface.x);
            float sheen = .5 + .5 * sin(surface.y * 8. + fold * 3.);
            gl_FragColor = vec4(tint, edge * ends * (.10 + sheen * .15));
          }
        `,
      });
      scene.add(new THREE.Mesh(geometry, material));
      let stopped = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let previous = 0;
      const render = () => renderer.render(scene, camera);
      const animate = now => {
        const delta = previous ? Math.min((now - previous) / 1000, .05) : 0;
        previous = now;
        material.uniforms.time.value += delta;
        render();
      };
      const sync = () => {
        previous = 0;
        renderer.setAnimationLoop(stopped || document.hidden ? null : animate);
        render();
      };
      update.current = value => { stopped = value; sync(); };
      const resize = () => {
        renderer.setSize(container.clientWidth, container.clientHeight, false);
        material.uniforms.aspect.value = container.clientWidth / container.clientHeight;
        render();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      const changed = event => setPaused(event.matches);
      preference.addEventListener('change', changed);
      document.addEventListener('visibilitychange', sync);
      resize(); sync(); setReady(true);
      cleanup = () => {
        update.current = () => {};
        renderer.setAnimationLoop(null);
        observer.disconnect();
        preference.removeEventListener('change', changed);
        document.removeEventListener('visibilitychange', sync);
        geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);
  return <><div ref={host} className="site-ribbon" aria-hidden="true" />{ready && <button className="ribbon-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Play background' : 'Pause background'}</button>}</>;
}
