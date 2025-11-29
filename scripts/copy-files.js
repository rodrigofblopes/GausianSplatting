const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build para Vercel...');

// Detecta o sistema operacional
const isWindows = process.platform === 'win32';

// Executa o build do GaussianSplats3D
console.log('📦 Instalando dependências do GaussianSplats3D...');
process.chdir(path.join(__dirname, '../GaussianSplats3D'));
execSync('npm install', { stdio: 'inherit' });

console.log('🔨 Compilando bibliotecas...');
if (isWindows) {
  execSync('npm run build-windows', { stdio: 'inherit' });
} else {
  execSync('npm run build', { stdio: 'inherit' });
}

// Volta para a raiz
process.chdir(path.join(__dirname, '..'));

// Copia viewer.html para a pasta de build
const buildDir = path.join(__dirname, '../GaussianSplats3D/build/demo');
const viewerHtml = path.join(__dirname, '../viewer.html');
const targetViewer = path.join(buildDir, 'viewer.html');

// Garante que o diretório existe
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Copia viewer.html
if (fs.existsSync(viewerHtml)) {
  fs.copyFileSync(viewerHtml, targetViewer);
  console.log('✓ viewer.html copiado para build/demo');
}

console.log('✅ Build concluído com sucesso!');

