import { useEffect, useRef, useState } from 'react';

export default function AboutSculpture() {
  const host = useRef(null);
  const paused = useRef(false);
  const [isPaused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [ready, setReady] = useState(false);
  useEffect(() => { paused.current = isPaused; }, [isPaused]);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    import('three').then(THREE => {
      if (disposed) return;
      const container = host.current;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.set(0, 0, 9);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x6e7368, 3));
      const light = new THREE.DirectionalLight(0xffffff, 4);
      light.position.set(3, 5, 4);
      scene.add(light);
      const sculpture = new THREE.Group();
      scene.add(sculpture);
      const geometry = new THREE.TorusGeometry(1.35, 0.09, 16, 96);
      const materials = ['#57516c', '#9ca595', '#c4b7a0'].map(color => new THREE.MeshStandardMaterial({ color, metalness: 0.45, roughness: 0.32 }));
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(geometry, materials[i]);
        ring.rotation.set(i * Math.PI / 3, i * Math.PI / 3, 0.3);
        sculpture.add(ring);
      }
      const coreGeometry = new THREE.OctahedronGeometry(0.64);
      const core = new THREE.Mesh(coreGeometry, materials[0]);
      sculpture.add(core);
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();
      let visible = true;
      const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      visibility.observe(container);
      const pointer = { x: 0, y: 0 };
      const move = event => {
        const rect = container.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
        pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
      };
      const leave = () => { pointer.x = 0; pointer.y = 0; };
      container.addEventListener('pointermove', move);
      container.addEventListener('pointerleave', leave);
      let last = 0;
      let time = 0;
      renderer.setAnimationLoop(now => {
        const delta = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!visible || document.hidden) return;
        if (!paused.current) {
          time += delta;
          sculpture.rotation.y = time * 0.17 + pointer.x;
          sculpture.rotation.x += (pointer.y - sculpture.rotation.x) * 0.04;
          sculpture.position.y = Math.sin(time * 0.65) * 0.09;
          core.rotation.y = time * 0.25;
        }
        renderer.render(scene, camera);
      });
      setReady(true);
      cleanup = () => {
        renderer.setAnimationLoop(null);
        observer.disconnect(); visibility.disconnect();
        container.removeEventListener('pointermove', move);
        container.removeEventListener('pointerleave', leave);
        geometry.dispose(); coreGeometry.dispose(); materials.forEach(material => material.dispose());
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);
  return <figure className="about-sculpture">
    <div className="sculpture-stage" ref={host} role="img" aria-label="Three intersecting sculptural rings surrounding a geometric core">
      {!ready && <div className="sculpture-fallback" aria-hidden="true">◇</div>}
      <span className="sculpture-label" aria-hidden="true">FORM / CONNECTION / BALANCE</span>
    </div>
    <figcaption><span>A little exploration in motion</span>{ready && <button type="button" onClick={() => setPaused(value => !value)}>{isPaused ? 'Play motion' : 'Pause motion'}</button>}</figcaption>
  </figure>;
}
