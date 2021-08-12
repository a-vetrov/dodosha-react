// Converts a #ffffff hex string into an [r,g,b] array
function h2r(hex: string): number[] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

// Converts  an [r,g,b] array into a #ffffff hex string
function r2h(rgb: number[]): string {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

//Interpolate color between from and to
export function interpolateColor(from: string, to: string, factor: number): string {
    const color1 = h2r(from)
    const color2 = h2r(to)
    if (!color1 || !color2)
        return from

    const result = color1.slice()

    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return r2h(result)
}
