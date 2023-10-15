export interface ApiRegisterRequest {
    RegistrationCode: string;
    Email: string;
    PasswordSha512: string;
    AcceptEula: boolean;
}