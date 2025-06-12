import { apiPathMatcher } from '../../../constant/apiPathMatcher';
import { rewriteEndpoint } from '../rewriteEndpoint';

const MOCK_BASE_URL = 'https://api.cat.app/v2';

const MOCK_INVALID_NEXT_REQ = {
  url: 'https://cat.moew.app/broken/path',
  nextUrl: {
    origin: 'https://cat.moew.app',
  },
};

const MOCK_VALID_NEXT_REQ = {
  url: 'https://cat.moew.app/bff/path',
  nextUrl: {
    origin: 'https://cat.moew.app',
  },
};

const MOCK_VALID_NEXT_URL_RES = 'https://api.cat.app/v2/path';

describe('rewriteEndpoint function', () => {
  it('returns null', () => {
    const invalidRequestResult = rewriteEndpoint({
      url: MOCK_INVALID_NEXT_REQ.url,
      origin: MOCK_INVALID_NEXT_REQ.nextUrl.origin,
      pathMatcher: apiPathMatcher.withoutSplat,
      replaceTo: MOCK_BASE_URL,
    });
    expect(invalidRequestResult).toBeNull();
  });
  it('rewrites url successfully', () => {
    const result = rewriteEndpoint({
      url: MOCK_VALID_NEXT_REQ.url,
      origin: MOCK_VALID_NEXT_REQ.nextUrl.origin,
      pathMatcher: apiPathMatcher.withoutSplat,
      replaceTo: MOCK_BASE_URL,
    });
    expect(result?.toString()).toBe(MOCK_VALID_NEXT_URL_RES);
  });
});
