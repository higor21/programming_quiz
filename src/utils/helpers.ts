// eslint-disable-next-line import/prefer-default-export
export const RouteNames = {
  result: '/result',
  configuration: '/configuration',
  questions: '/questions',
};

export const range = (start: number, stop: number, step: number = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

export const secToHHMMSS = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};
