module.exports = {
  apps : [{
    name: 'todo',
    script: 'build/index.js',
    node_args: "--env-file=.env",
    instances: 6,
    exec_mode: "cluster",
    watch: '.',
    env: {
        NODE_ENV: "production",
      },
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
