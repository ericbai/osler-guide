import { NOOP } from './constants';

const allActions = [];
let priorUrl;

// 1. register actions to run every page load
export default function (doAction = NOOP) {
  if (doAction !== NOOP) {
    allActions.push(doAction);
  }
  return doAction; // return original action to allow chaining
}

// 2. actually run the functions on initial load and page change
window.addEventListener('load', () => {
  // 1. Run all actions on initial page load
  runAllActions();
  // 2. Run all actions on every actual page change
  // see https://nextjs.org/docs/pages/api-reference/functions/use-router#routerevents
  next?.router?.events?.on('routeChangeComplete', (newUrl) => {
    // IMPORTANT: note that  `routeChangeComplete` is called even if the page does not change!
    // This can happen if the link that is clicked is the currently-shown page already. This is why
    // we need to check that the url has actually changed before calling `doAction`
    if (!priorUrl || priorUrl !== newUrl) {
      priorUrl = newUrl;
      runAllActions();
    }
  });
});
function runAllActions() {
  allActions.forEach((action) => action?.call());
}
