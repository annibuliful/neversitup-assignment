import { apiPathMatcher } from '../../constant/apiPathMatcher';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewriteEndpoint } from './rewriteEndpoint';

export const apihandlerConfig = {
  matcher: apiPathMatcher.withSplat,
};

export function createApiHanlderMiddleware(enpointUrl: string) {
  function middleware(request: NextRequest) {
    const rewrittenURL = rewriteEndpoint({
      origin: request.nextUrl.origin,
      url: request.url,
      pathMatcher: apiPathMatcher.withoutSplat,
      replaceTo: enpointUrl,
    });

    if (!rewrittenURL) {
      //This will be used for debugging. It only appears on Netlify Edge function console and local console
      console.error('Incoming URL is invalid', {
        origin: request.nextUrl.origin,
        url: request.url,
        pathMatcher: apiPathMatcher.withoutSplat,
        replaceTo: enpointUrl,
      });
      return NextResponse.error();
    }

    return NextResponse.rewrite(rewrittenURL);
  }
  return middleware;
}
