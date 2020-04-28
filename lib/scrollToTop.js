export default function scrollToTop() {
  let hasWindow = Boolean(window);
  hasWindow && window.scrollTo(0, 0);
}
