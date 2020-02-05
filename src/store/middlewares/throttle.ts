interface IThrottledActions {
  [action: string]: any;
}

const throttled: IThrottledActions = {};

// @ts-ignore
export default ({ getState, dispatch }) => next => action => {
  const time = action.meta && action.meta.throttle;
  if (!time) {
    return next(action);
  }

  // @ts-ignore
  if (throttled[action.type]) {
    return;
  }

  throttled[action.type] = true;

  setTimeout(() => {
    throttled[action.type] = false;
  }, time);

  next(action);


}
