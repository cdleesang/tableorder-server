module.exports = {
  apps: [{
    name: '청담이상 테이블오더',
    script: './dist/main.js',
    instances: 1,
    restart_delay: 1000,
    wait_ready: true,
    vizion: false,
  }],
};