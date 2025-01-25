export function range(start: number, end: number, step: number = 1) {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }

  return result;
}
