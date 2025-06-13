import { Todo } from './todo';
import { User } from './user';

export type ApiSchema = {
  GET: {
    '/health': { response: string };
    '/todo': { response: { isSuccess: boolean; data: Todo[] } };
    '/todo/all': { response: Todo[] };
    '/todo/:id': { params: { id: string }; response: Todo };
    '/users/:id': {
      params: { id: string };
      response: { isSuccess: boolean; data: User };
    };
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
      body: Pick<Todo, 'title' | 'description' | 'completed'>;
      response: {
        isSuccess: boolean;
        data: Todo;
      };
    };
  };
  PATCH: {
    '/todo/:id': {
      params: { id: string };
      body: Partial<Omit<Todo, 'id'>>;
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

export type ErrorResponse = { statusCode: number; message: string };
