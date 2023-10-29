export interface ApiRegisterRequest {
    registrationCode: string;
    email: string;
    passwordSha512: string;
    acceptEula: boolean;
}