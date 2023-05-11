export type JwtPayload = {
  permissions: string[];
  sub: string;
  roles?: string[];
};
