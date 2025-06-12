import { Todo } from './todo';

export type ApiSchema = {
  GET: {
    '/health': { response: string };
    '/todo': { response: Todo[] };
    '/todo/all': { response: Todo[] };
    '/todo/:id': { params: { id: string }; response: Todo };
  };
  POST: {
    '/auth/login': {
      body: { username: string; password: string };
      response: { access_token: string };
    };
    '/users': {
      body: { username: string; password: string };
      response: unknown;
    };
    '/todo': {
      body: Pick<Todo, 'title' | 'description'>;
      response: Todo;
    };
  };
  PATCH: {
    '/todo/:id': {
      params: { id: string };
      body: Partial<Todo>;
      response: Todo;
    };
  };
  DELETE: {
    '/todo/:id': {
      params: { id: string };
      response: void;
    };
  };
};

export type HttpMethod = keyof ApiSchema;
export type PathForMethod<M extends HttpMethod> = keyof ApiSchema[M];

export type ExtractParams<T> = T extends { params: infer P } ? P : undefined;
export type ExtractBody<T> = T extends { body: infer B } ? B : undefined;
export type ExtractResponse<T> = T extends { response: infer R } ? R : never;
