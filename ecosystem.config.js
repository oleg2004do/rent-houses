module.exports = {
    apps: [
      {
        name: "journeyua-houses",
        script: "server.js",
        env: {
          NODE_ENV: "production",
          PORT: 3000,
        },
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        log_date_format: "YYYY-MM-DD HH:mm:ss Z",
        error_file: "logs/error.log",
        out_file: "logs/out.log",
        merge_logs: true,
      },
    ],
  }
  
  