//index.js

export default function test() {
  console.log('NPM TEST')
  return "test"
}

export { 
  elementsExist, 
  toggleScroll,
  isMobile,
  formatMoney,
  syncElementsHeight,
  calculatePixelsOnScreen,
  getElementMostVisible,
  debounce
} from './functions.js';

export { 
  extendJQueryFns
} from './plugins.js';