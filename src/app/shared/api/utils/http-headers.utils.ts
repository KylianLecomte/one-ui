export const HttpHeadersUtils = {
  BEARER: 'Bearer',

  getBearerHeader(accessToken: string): any {
    return { Authorization: `${HttpHeadersUtils.BEARER} ${accessToken}` };
  },
};
