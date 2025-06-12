// Limit the middleware to paths starting with `/bff/`

export const apiPathMatcher = {
  withSplat: '/bff/:path*',
  withoutSplat: '/bff/',
};

export const fontPathMatcher = {
  withSplat: 'assets/fonts/:path*',
  withoutSplat: 'assets/fonts/',
};
