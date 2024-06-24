module.exports = {
    apps: [
      {
        name: "vite-react-app",
        script: "serve",
        args: "-s dist -l 3000", // -s for serving static files, -l for specifying the port
        env: {
          NODE_ENV: "production"
        }
      }
    ]
};
  