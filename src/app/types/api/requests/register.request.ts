export interface RegisterRequest {
  code: string;
  email: string;
  passwordSha512: string;
  acceptEula: boolean;
}
