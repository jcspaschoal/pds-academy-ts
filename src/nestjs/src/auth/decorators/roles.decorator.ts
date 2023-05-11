export const Roles = (...roles: string[]) => {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata('roles', roles, descriptor.value);
    return descriptor;
  };
};
