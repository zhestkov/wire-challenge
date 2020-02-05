export default class Util {
  /**
   *
   * @param f - function to throttle
   * @param ms - value in ms to throttle for
   * @param context - context to run function in
   */
  static throttle(f: Function, ms: number, context: any) {
    let isThrottled: boolean = false;
    let savedArgs: any = null;
    let savedThis: any = null;

    function wrapper(...args: any[]) {
      if (isThrottled) {
        savedArgs = args;
        savedThis = context;
        return;
      }

      f.apply(savedThis, args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  }
}
