module.exports = {
  apps: [{
    name: 'CDLeesang_Api',
    script: './dist/main.js',
    instances: 1,
    restart_delay: 1000,
    wait_ready: true,
    vizion: false,
  }],
};