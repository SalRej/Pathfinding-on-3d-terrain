function norm(value, min, max) {
    return (value - min) / (max - min);
}

export function lerp(norm, min, max) {
    return (max - min) * norm + min;
}

function mapping(value, sourceMin, sourceMax, destMin, destMax) {
    return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

export default mapping;