const buildRouteParams = <T extends Record<string, boolean>>(data: T) =>
  Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>;

export const noteRouteParams = buildRouteParams({ id: true });
export type TNoteRouteParams = typeof noteRouteParams;

export const routes = {
  notes: () => "/",
  note: ({ id }: TNoteRouteParams) => `/notes/${id}`,
  createNote: () => "/notes/create",
  updateNote: ({ id }: TNoteRouteParams) => `/notes/${id}/edit`,
  signUp: () => "/sign-up",
  signIn: () => "/sign-in",
  signOut: () => "/sign-out",
  updateProfile: () => "/edit-profile",
};
