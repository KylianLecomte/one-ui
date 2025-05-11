import { LocalStorageUtils } from './LocalStorage.utils';
import { AuthUser } from '../auth/domain/dtos/auth.dto';
import { JwtTokens } from '../auth/domain/dtos/auth-token.dto';

export enum TypeToken {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export const UserStorageUtils = {
  CURRENT_USER_KEY: 'current_user',

  set(authUser: AuthUser): void {
    LocalStorageUtils.set(UserStorageUtils.CURRENT_USER_KEY, authUser);
  },

  removeCurrentUser(): void {
    LocalStorageUtils.remove(UserStorageUtils.CURRENT_USER_KEY);
  },

  get(): AuthUser | undefined {
    return LocalStorageUtils.get<AuthUser>(UserStorageUtils.CURRENT_USER_KEY);
  },

  getToken(typeToken: TypeToken): string | undefined {
    let token: string | undefined = undefined;

    if (typeToken === TypeToken.ACCESS_TOKEN) {
      token = UserStorageUtils.get()?.accessToken;
    } else if (typeToken === TypeToken.REFRESH_TOKEN) {
      token = UserStorageUtils.get()?.user.refreshToken;
    }
    return token;
  },

  updateTokens(tokens: JwtTokens): void {
    const currentAuthUser: AuthUser | undefined = UserStorageUtils.get();

    if (!currentAuthUser) {
      throw new Error('Fail to get user from localStorage');
    }

    currentAuthUser.accessToken = tokens.accessToken;
    currentAuthUser.user.refreshToken = tokens.refreshToken;

    UserStorageUtils.set(currentAuthUser);
  },
};
