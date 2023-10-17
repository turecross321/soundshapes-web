export async function hash(input: string) {
    const buf = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(input));
    return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
}