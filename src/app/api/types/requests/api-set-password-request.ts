export interface ApiSetPasswordRequest {
    setPasswordTokenId: string;
    newPasswordSha512: string;
}