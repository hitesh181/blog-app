import { createProxyMiddleware } from 'http-proxy-middleware';


export default function (app) {
    console.log("IN SETUP PROXY")
  app.use(
    '/api',
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );
};
