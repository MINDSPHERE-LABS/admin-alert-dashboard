// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ai-backend-1-8udr.onrender.com',
      changeOrigin: true,
    })
  );
};