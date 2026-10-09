// Resolve bundled images while keeping project entries independent of JSX.
const images = import.meta.glob('../assets/Projects/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function projectImage(path) {
  return images[`../assets/${path}`] || path;
}
