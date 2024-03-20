import debounce from 'lodash.debounce';
import everyPageLoad from './helpers/every-page-load';
import { navElement } from './helpers/get-element';

let previousScrollTop = null;
// see https://lodash.com/docs/4.17.15#debounce
const scrollWatcher = debounce(
  ({ target }) => (previousScrollTop = target.scrollTop),
);

everyPageLoad(() => {
  const navEl = navElement();
  // 1. Mark all links to the currently-shown page as active
  // from https://sites.super.so/aether/script.js
  const currentPage = document.querySelectorAll(
    'a[href="' + window.location.pathname + '"]',
  );
  currentPage.forEach(function (page) {
    if (
      !page.classList.contains('super-navbar__logo') &&
      !page.classList.contains('super-footer__logo') &&
      !page.parentNode.classList.contains('notion-image')
    ) {
      page.classList.add('page-active');
    }
  });
  // 2. Restore navigation bar position so that the clicked nav item is in the same position
  if (previousScrollTop) {
    navEl.scrollTop = previousScrollTop;
  }
  // 3. Start the scroll position tracking, the sidebar is re-rendered every page so we will need to
  // re-attach scroll watcher on every page re-render. NOTE: `addEventListener` will NOT attach the
  // same function twice to an event, see https://stackoverflow.com/a/10364316
  navEl.addEventListener('scroll', scrollWatcher);
});
