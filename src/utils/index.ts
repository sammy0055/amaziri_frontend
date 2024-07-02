export const debounce = (callBack: Function, timer: number) => {
  let timeOut;
  clearTimeout(timeOut);
  timeOut = setTimeout(callBack, timer);
};
