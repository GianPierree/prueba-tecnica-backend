export interface ExternalUser {
  id: string;
  email: string;
  name: string;
  provider: string;
}

export interface IAuthProvider {
  getAuthenticatedUser(code: string): Promise<ExternalUser>;
}