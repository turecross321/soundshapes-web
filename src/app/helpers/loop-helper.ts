export function loopRange(count: number, returnEmpty: boolean): number[] {
    if (returnEmpty)
        return [];
    return new Array(count).fill(0);
}