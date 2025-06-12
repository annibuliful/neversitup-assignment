import {
  ApiSchema,
  ExtractBody,
  ExtractParams,
  ExtractResponse,
  HttpMethod,
  PathForMethod,
} from '../@types/api';
import { BASE_URL_PREFIX } from '../constant/api';

function interpolatePath(path: string, params?: Record<string, string>) {
  if (!params) return path;
  return path.replace(/:([^/]+)/g, (_, key) => {
    const value = params[key];
    if (!value) {
      throw new Error(`Missing param "${key}" for path "${path}"`);
    }
    return encodeURIComponent(value);
  });
}

export async function apiFetcher<
  M extends HttpMethod,
  P extends PathForMethod<M> & string
>(
  method: M,
  path: P,
  options: {
    params?: ExtractParams<ApiSchema[M][P]>;
    body?: ExtractBody<ApiSchema[M][P]>;
    query?: Record<string, string | number | boolean>;
    headers?: HeadersInit;
  } = {}
): Promise<ExtractResponse<ApiSchema[M][P]>> {
  const { params, body, query, headers } = options;

  let url = interpolatePath(path, params as never);

  if (query) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      qs.append(k, String(v));
    }
    url += `?${qs.toString()}`;
  }

  const response = await fetch(`${BASE_URL_PREFIX}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}
