export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtRefreshToken = {
  refreshToken: string;
  expiresAt: Date;
};
