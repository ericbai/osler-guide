const menuToggleMarkup = `<div class="super-navbar__button mobile-nav-control">
  <svg
    class="mobile-nav-control__icon-menu"
    xmlns="http://www.w3.org/2000/svg"
    width="1.25rem"
    height="1.25rem"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-menu"
    type="Menu"
  >
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
  <svg
    class="mobile-nav-control__icon-close"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style="width: 1.25rem; height: 1.25rem; fill: var(--color-text-default-light);"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
</div>`;

// The navbar is reused across page loads
window.addEventListener('load', () => {
  // 1. inject menu toggle into the navigation actions bar
  document
    .querySelector('.super-navbar .super-navbar__actions')
    // see https://stackoverflow.com/a/46994943
    // see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    ?.insertAdjacentHTML('beforeend', menuToggleMarkup);
  // 2. fetch menu toggle that we just inserted
  const toggleEl = document.querySelector(
      '.super-navbar__button.mobile-nav-control',
    ),
    rootEl = document.getElementsByClassName('super-root')[0];
  // 3. bind event handler to toggle parent class to show/hide mobile menu
  toggleEl.addEventListener('click', () =>
    rootEl.classList.toggle('mobile-nav-open'),
  );
});
