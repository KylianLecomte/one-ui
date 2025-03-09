export const LOCAL_API_PATH = 'http://localhost:3000/v1';

export const API_URI_CONF = {
  auth: {
    base: '/auth',
    signUp: (): string => `${API_URI_CONF.auth.base}/sign-up`,
    signIn: (): string => `${API_URI_CONF.auth.base}/sign-in`,
    refreshToken: (): string => `${API_URI_CONF.auth.base}/refresh-tokens`,
    logout: (): string => `${API_URI_CONF.auth.base}/logout`,
  },
  task: {
    base: '/task',
    create: (): string => `${API_URI_CONF.task.base}`,
    updateById: (id: string): string => `${API_URI_CONF.task.base}/${id}`,
    deleteById: (id: string): string => `${API_URI_CONF.task.base}/${id}`,
  },
};
