import { useEffect, useRef } from 'react';

// Decorative only: the canvas never receives pointer or keyboard input.
export default function BubbleBackground() {
  const host = useRef(null);
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    import('three').then((THREE) => {
      if (cancelled || !host.current) return;
      const element = host.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch {
        return; // Content remains fully usable when WebGL is unavailable.
      }
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 30);
      camera.position.z = 12;
      const geometry = new THREE.SphereGeometry(1, 32, 24);
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { tint: { value: new THREE.Color('#9cb5a0') } },
        vertexShader: `varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `uniform vec3 tint; varying vec3 vNormal;
          void main() {
            vec3 n = normalize(vNormal);
            float rim = pow(1.0 - abs(n.z), 2.6);
            float glow = pow(max(dot(n, normalize(vec3(-0.5, 0.7, 0.7))), 0.0), 24.0);
            vec3 color = mix(tint, vec3(1.0), glow * 0.85);
            gl_FragColor = vec4(color, 0.025 + rim * 0.28 + glow * 0.22);
          }`,
      });
      const positions = [
        [-0.94, 0.70, 0.95], [0.78, 0.85, 0.70], [-0.56, -0.06, 0.38],
        [0.95, -0.25, 1.25], [-0.85, -0.78, 0.65], [0.28, -0.72, 0.48],
        [0.26, 0.38, 0.30], [0.70, -0.96, 0.34],
      ];
      const bubbles = positions.map(([x, y, size]) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(size);
        scene.add(mesh);
        return { mesh, x, y };
      });
      let halfWidth = 8;
      let elapsed = 0;
      let previous = 0;
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      const onPointerMove = (event) => {
        if (motion.matches || event.pointerType === 'touch') return;
        const rect = element.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;
        pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
      };
      const onPointerLeave = () => { pointer.x = 0; pointer.y = 0; };
      const surface = element.parentElement;
      surface.addEventListener('pointermove', onPointerMove);
      surface.addEventListener('pointerleave', onPointerLeave);
      const draw = () => {
        eased.x += (pointer.x - eased.x) * 0.025;
        eased.y += (pointer.y - eased.y) * 0.025;
        bubbles.forEach(({ mesh, x, y }, index) => {
          mesh.position.set(
            x * halfWidth + Math.sin(elapsed * 0.16 + index * 1.8) * 0.35 + eased.x,
            y * 5 + Math.sin(elapsed * 0.22 + index * 1.3) * 0.5 + eased.y,
            0,
          );
        });
        renderer.render(scene, camera);
      };
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        halfWidth = (width / Math.max(height, 1)) * 5;
        camera.left = -halfWidth;
        camera.right = halfWidth;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        draw();
      };
      const animate = (time) => {
        if (previous) elapsed += Math.min((time - previous) / 1000, 0.05);
        previous = time;
        draw();
      };
      const updateMotion = () => {
        previous = 0;
        renderer.setAnimationLoop(document.hidden || motion.matches ? null : animate);
        draw();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      motion.addEventListener('change', updateMotion);
      document.addEventListener('visibilitychange', updateMotion);
      resize();
      updateMotion();
      dispose = () => {
        observer.disconnect();
        surface.removeEventListener('pointermove', onPointerMove);
        surface.removeEventListener('pointerleave', onPointerLeave);
        motion.removeEventListener('change', updateMotion);
        document.removeEventListener('visibilitychange', updateMotion);
        renderer.setAnimationLoop(null);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch(() => { /* Decoration is optional if the graphics module cannot load. */ });
    return () => { cancelled = true; dispose(); };
  }, []);
  return <div ref={host} className="bubble-background" aria-hidden="true" />;
}
