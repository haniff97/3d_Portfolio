import { useEffect, useRef } from 'react';

export default function LakeShimmer() {
  const host = useRef(null);
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    import('three').then((THREE) => {
      if (cancelled || !host.current) return;
      const element = host.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, powerPreference: 'low-power' });
      } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
      camera.position.z = 1;
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false,
        uniforms: { time: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
        fragmentShader: `varying vec2 vUv; uniform float time;
          void main() {
            vec2 p = vUv;
            float wave = sin(p.y * 110. + sin(p.x * 12. + time * .3) * 1.8 + time * .6);
            float glint = pow(max(wave, 0.), 18.);
            float broken = smoothstep(.15, .9, sin(p.x * 28. + sin(p.y * 24.) + time * .2));
            float fade = smoothstep(0., .3, p.y) * (1. - smoothstep(.65, 1., p.y));
            gl_FragColor = vec4(.98, 1., .93, glint * broken * fade * .22);
          }`,
      });
      scene.add(new THREE.Mesh(geometry, material));
      const draw = () => renderer.render(scene, camera);
      const observer = new ResizeObserver(() => {
        renderer.setSize(element.clientWidth, element.clientHeight);
        draw();
      });
      observer.observe(element);
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      let visible = true;
      let previous = 0;
      const frame = (time) => {
        if (previous) material.uniforms.time.value += Math.min((time - previous) / 1000, .05);
        previous = time;
        draw();
      };
      const update = () => {
        previous = 0;
        renderer.setAnimationLoop(document.hidden || !visible || reducedMotion.matches ? null : frame);
        draw();
      };
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
      intersection.observe(element);
      reducedMotion.addEventListener('change', update);
      document.addEventListener('visibilitychange', update);
      update();
      cleanup = () => {
        observer.disconnect(); intersection.disconnect();
        reducedMotion.removeEventListener('change', update);
        document.removeEventListener('visibilitychange', update);
        renderer.setAnimationLoop(null);
        geometry.dispose(); material.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => { /* The landscape works without WebGL. */ });
    return () => { cancelled = true; cleanup(); };
  }, []);
  return <div className="lake-shimmer" ref={host} aria-hidden="true" />;
}
