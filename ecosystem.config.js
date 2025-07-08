module.exports = {
  apps : [
    {
      name      : 'ecosystem',
      script    : 'dist/main.js', // Your main application entry file
      instances : 'max', // Run as many instances as CPU cores (for Node.js clu>
      exec_mode : 'fork',
      watch     : true, // Watch for file changes and auto-restart
      ignore_watch : ['node_modules', 'logs', 'public'], // Directories to igno>
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      combine_logs: true, // Combine out_file and error_file into one
      restart_delay: 3000, // Wait 3 seconds before restarting a crashed app

      env: {
        NODE_ENV: 'production',
        MONGO_URI: 'mongodb://localhost:27017/eco',
        PORT: 3001,
        JWT_SECRET: 'mySecret',
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 3001,
        DB_HOST: 'mongodb://localhost:27017/eco',
        API_KEY: 'your_production_api_key'
      },
      env_staging : {
        NODE_ENV: 'staging',
        PORT: 8000,
        DB_HOST: 'mongodb://localhost:27017/eco'
      }
    },
  ],

  deploy : {
    production : {
      user : 'root',
      host : '138.128.241.134',
      ref  : 'origin/main',
      repo : 'git@github.com:Megacoderuzb/ecosystem.git',
      path : '/var/www/ecosystem',
      'pre-setup': 'npm install --production',
      'post-setup': 'npm install && pm2 startOrRestart ecosystem.config.js --env production',
      'pre-deploy-local': '', // Commands to run on local machine before deploy>
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
    }
  }
};
