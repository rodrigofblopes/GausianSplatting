# Gaussian Splatting 3D Viewer

Visualizador 3D para modelos Gaussian Splatting com suporte para arquivos `.ply`.

## 🚀 Como usar

1. Coloque o arquivo `gs_Autismo.ply` na pasta raiz do projeto
2. Execute o script `run.bat` para compilar e iniciar o servidor
3. Acesse `http://localhost:8080/viewer.html` no navegador
4. O modelo `gs_Autismo.ply` será carregado automaticamente

**Nota:** O arquivo `gs_Autismo.ply` não está incluído no repositório devido ao tamanho. Você precisa adicioná-lo manualmente na pasta raiz.

## 📋 Requisitos

- Node.js instalado
- NPM instalado

## 🎮 Controles

- **Mouse**: Arraste para rotacionar a câmera
- **Scroll**: Zoom in/out
- **Botão direito**: Pan (mover a câmera)

## ⚙️ Configurações

A câmera está configurada para:
- Vista aérea inicial
- Altura mínima de 8 unidades (não permite descer muito)
- Rotação livre horizontal (360°)
- Rotação vertical limitada para manter vista aérea

## 📁 Estrutura

- `viewer.html` - Visualizador principal
- `gs_Autismo.ply` - Modelo 3D
- `run.bat` - Script de build e servidor
- `GaussianSplats3D/` - Biblioteca Gaussian Splatting 3D

## 🔧 Desenvolvimento

Para modificar o visualizador, edite `viewer.html` e execute `run.bat` novamente.

