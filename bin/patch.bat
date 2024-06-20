@echo off

call cd %~dp0\..

call git pull

call yarn

call yarn prisma:generate

call yarn build

call npx pm2 reload "CDLeesang_Api"

pause