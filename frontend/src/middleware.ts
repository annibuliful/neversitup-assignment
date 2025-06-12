import { createApiHanlderMiddleware } from './utils/middleware';

const API_ENDPOINT = process.env.API_ENDPOINT as string;

export const config = {
  matcher: '/bff/:path*',
};

export default createApiHanlderMiddleware(API_ENDPOINT);
