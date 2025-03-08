import { User } from '../../../user/domain/dtos/user.dto';

export type SignUp = {
  password: string;
  email: string;
};

export type SignIn = {
  email: string;
  password: string;
};

export type AuthUser = {
  user: User;
  accessToken: string;
};
