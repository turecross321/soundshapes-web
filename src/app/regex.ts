const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export function validEmail(input: string): boolean {
    return emailRegex.test(input);
}

const usernameRegex = new RegExp(/^[A-Za-z][A-Za-z0-9-_]{2,15}$/);

export function validUsername(input: string): boolean {
    return usernameRegex.test(input);
}

const registrationRegex = new RegExp(/^\d{8}$/);

export function validRegistrationCode(input: string) {
    return registrationRegex.test(input);
}

const passwordRegex = new RegExp(/^[A-Z]{8}$/);

export function validPasswordResetCode(input: string) {
    return passwordRegex.test(input);
}