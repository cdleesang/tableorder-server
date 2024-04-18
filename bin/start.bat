@echo off

call cd %~dp0\..

call npx -y pm2 delete all

call yarn start:prod

call npx -y pm2 log