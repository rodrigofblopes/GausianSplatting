const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build para Vercel...');
console.log('📂 Diretório atual:', process.cwd());

// Detecta o sistema operacional
const isWindows = process.platform === 'win32';
console.log('🖥️ Sistema operacional:', isWindows ? 'Windows' : 'Linux/Mac');

// Executa o build do GaussianSplats3D
const gaussianPath = path.join(__dirname, '../GaussianSplats3D');
console.log('📦 Instalando dependências do GaussianSplats3D em:', gaussianPath);

if (!fs.existsSync(gaussianPath)) {
  throw new Error(`Diretório GaussianSplats3D não encontrado: ${gaussianPath}`);
}

process.chdir(gaussianPath);
execSync('npm install', { stdio: 'inherit' });

console.log('🔨 Compilando bibliotecas...');
// No Vercel (Linux), usa build padrão
execSync('npm run build', { stdio: 'inherit' });

// Volta para a raiz
process.chdir(path.join(__dirname, '..'));

// Copia viewer.html, index.html e gs_Autismo.ply para a pasta de build
const buildDir = path.join(__dirname, '../GaussianSplats3D/build/demo');
const viewerHtml = path.join(__dirname, '../viewer.html');
const indexHtml = path.join(__dirname, '../index.html');
const plyFile = path.join(__dirname, '../gs_Autismo.ply');
const targetViewer = path.join(buildDir, 'viewer.html');
const targetIndex = path.join(buildDir, 'index.html');
const targetPly = path.join(buildDir, 'gs_Autismo.ply');

console.log('📁 Verificando diretórios...');
console.log('  Build dir:', buildDir);
console.log('  Viewer HTML:', viewerHtml);
console.log('  Index HTML:', indexHtml);
console.log('  PLY File:', plyFile);

// Garante que o diretório existe
if (!fs.existsSync(buildDir)) {
  console.log('⚠️ Criando diretório build/demo...');
  fs.mkdirSync(buildDir, { recursive: true });
}

// Verifica se os arquivos existem antes de copiar
if (!fs.existsSync(viewerHtml)) {
  throw new Error(`viewer.html não encontrado em: ${viewerHtml}`);
}

if (!fs.existsSync(indexHtml)) {
  throw new Error(`index.html não encontrado em: ${indexHtml}`);
}

if (!fs.existsSync(plyFile)) {
  console.log('⚠️ Arquivo gs_Autismo.ply não encontrado. Continuando sem ele...');
} else {
  // Copia gs_Autismo.ply
  fs.copyFileSync(plyFile, targetPly);
  console.log('✓ gs_Autismo.ply copiado para build/demo');
}

// Copia viewer.html
fs.copyFileSync(viewerHtml, targetViewer);
console.log('✓ viewer.html copiado para build/demo');

// Copia index.html
fs.copyFileSync(indexHtml, targetIndex);
console.log('✓ index.html copiado para build/demo');

// Verifica se os arquivos foram copiados
if (!fs.existsSync(targetViewer)) {
  throw new Error('Falha ao copiar viewer.html');
}

if (!fs.existsSync(targetIndex)) {
  throw new Error('Falha ao copiar index.html');
}

if (fs.existsSync(plyFile) && !fs.existsSync(targetPly)) {
  throw new Error('Falha ao copiar gs_Autismo.ply');
}

console.log('✅ Build concluído com sucesso!');
console.log('📦 Arquivos em:', buildDir);

