import { mkdir, copyFile, symlink } from 'node:fs/promises';
const destination = new URL('../.firebase-functions/', import.meta.url);
await mkdir(new URL('data/', destination), { recursive: true });
for (const name of ['app.js', 'blog-context.js', 'firebase.js', 'package.json', 'package-lock.json']) {
  await copyFile(new URL(name, import.meta.url), new URL(name, destination));
}
for (const name of ['profile', 'projects']) {
  await copyFile(new URL(`../src/data/${name}.json`, import.meta.url), new URL(`data/${name}.json`, destination));
}
console.log('Prepared Firebase package with public data; no local environment files included.');

// Local discovery uses installed dependencies; Firebase excludes node_modules from upload.
try { await symlink(new URL("./node_modules/", import.meta.url), new URL("node_modules", destination), "dir"); } catch (error) { if (error.code !== "EEXIST") throw error; }
