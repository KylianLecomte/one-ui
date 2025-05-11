import { UserStorageUtils } from '../../storage/UserStorage.utils';
import { RouterService } from '../../../shared/api/routing/route.service';

export const AuthUtils = {
  resetAuth(routerService: RouterService): void {
    UserStorageUtils.removeCurrentUser();
    routerService.toSignInPage();
  },
};
