import { ID } from '../app/shared/api/domain/dtos/api.dtos';

export const LOCAL_API_PORT = '8080';
export const LOCAL_API_PREFIX = 'v1';
export const LOCAL_API_PATH = `http://localhost:${LOCAL_API_PORT}/${LOCAL_API_PREFIX}`;

export const API_URI_CONF = {
  auth: {
    base: '/auth',
    signUp: (): string => `${API_URI_CONF.auth.base}/sign-up`,
    signIn: (): string => `${API_URI_CONF.auth.base}/sign-in`,
    logout: (): string => `${API_URI_CONF.auth.base}/logout`,
    token: (): string => `${API_URI_CONF.auth.base}/token`,
  },
  task: {
    base: '/task',
    create: (): string => `${API_URI_CONF.task.base}`,
    updateById: (): string => `${API_URI_CONF.task.base}`,
    deleteById: (id: ID): string => `${API_URI_CONF.task.base}/${id}`,
  },
};
