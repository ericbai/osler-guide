import everyPageLoad from './helpers/every-page-load';
import { contentElement } from './helpers/get-element';

everyPageLoad(() => {
  // FYI you can't move the HTML elements because they're reused across page loads.
  // Instead, you can just clone the nodes and move the clones to where you want them
  const header = document
    .getElementsByClassName('notion-header')[0]
    ?.cloneNode(true);
  const properties = document
    .getElementsByClassName('notion-page__properties')[0]
    ?.cloneNode(true);
  // Don't copy over header and properties if they have already been copied over. This edge case
  // can happen because the `routeChangeComplete` event fires even if you click on a link that
  // pertains to the current page which doesn't actually change the page
  const thisContent = contentElement();
  if (thisContent?.getElementsByClassName('notion-header')?.length === 0) {
    // Must prepend properties first
    if (properties) {
      thisContent.prepend(properties);
    }
    // Then must prepend header second so it appears on top
    if (header) {
      thisContent.prepend(header);
    }
  }
});
