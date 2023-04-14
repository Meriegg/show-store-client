export default (delayInMilliseconds: number) => {
  return new Date(Date.now() + delayInMilliseconds);
};