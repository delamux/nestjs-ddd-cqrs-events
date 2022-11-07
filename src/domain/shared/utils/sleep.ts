export const sleep = (timeout: number = 5000) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};
