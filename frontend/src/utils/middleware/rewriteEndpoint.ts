export type RewriteEndpointOptions = {
  origin: string;
  url: string;
  replaceTo: string;
  pathMatcher: string;
};

export function rewriteEndpoint(options: RewriteEndpointOptions) {
  if (!options.url.includes(options.pathMatcher)) return null;

  const origin = options.origin;
  const originalPath = options.url.replace(options.pathMatcher, '/');
  const rewrittenURL = new URL(originalPath.replace(origin, options.replaceTo));

  return rewrittenURL;
}
