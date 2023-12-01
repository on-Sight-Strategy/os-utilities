//index.js

export default function test() {
  return "test"
}

export { 
  elementsExist, 
  toggleScroll,
  isMobile,
  currentUserNavigationMethod,
  formatMoney,
  syncElementsHeight,
  calculatePixelsOnScreen,
  getElementMostVisible,
  debounce
} from './functions.js';

export {
  extendJQueryFns
} from './plugins.js';