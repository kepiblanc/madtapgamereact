module.exports = {
  apps: [
    {
      name: "vite-react-app",
      script: "serve",
      args: ["-s", "dist", "-l", "3000"],
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
