import { UserStorageUtils } from '../../../shared/storage/UserStorage.utils';
import { RouterService } from '../../../shared/routing/route.service';

export const AuthUtils = {
  resetAuth(routerService: RouterService): void {
    UserStorageUtils.removeCurrentUser();
    routerService.toSignInPage();
  },
};
