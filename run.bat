@echo off
echo Compilando o projeto GaussianSplats3D...
cd GaussianSplats3D
call npm install
if errorlevel 1 (
    echo Erro ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo Compilando bibliotecas...
call npm run build-windows
if errorlevel 1 (
    echo Erro ao compilar
    pause
    exit /b 1
)

echo.
echo Copiando arquivo gs_Autismo.ply para a pasta demo...
copy ..\gs_Autismo.ply .\build\demo\gs_Autismo.ply
copy ..\viewer.html .\build\demo\viewer.html

echo.
echo Iniciando servidor...
echo Acesse: http://localhost:8080/viewer.html
echo.
call npm run demo

