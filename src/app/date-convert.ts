export function unixToDate(unix: number): Date {
    return new Date(Date.UTC(1970, 0, 1, 0, 0, unix));
}