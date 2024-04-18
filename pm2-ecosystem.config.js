module.exports = {
  apps: [{
    name: '청담이상 테이블오더',
    script: './dist/main.js',
    instances: 1,
    watch: true,
    ignore_watch: ['node_modules', 'prisma', '.git'],
    restart_delay: 1000,
    vizion: false,
  }],
};