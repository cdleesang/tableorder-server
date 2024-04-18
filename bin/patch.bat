@echo off

call cd %~dp0\..

call git pull

call yarn

call yarn prisma:generate:prod

call yarn build

pause