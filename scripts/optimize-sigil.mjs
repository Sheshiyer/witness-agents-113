import { spawnSync } from 'node:child_process';

const source = process.argv[2] ?? 'public/models/sigil-base.glb';
const target = process.argv[3] ?? 'public/models/sigil-hero.glb';
const textureSize = process.argv[4] ?? '1024';

const args = [
  '--yes',
  '@gltf-transform/cli@4.2.1',
  'optimize',
  source,
  target,
  '--compress',
  'draco',
  '--texture-compress',
  'webp',
  '--texture-size',
  textureSize
];

const result = spawnSync('npx', args, {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
