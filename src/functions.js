/**
 * * Checks if the given elements exist on the DOM
 *
 * @param  {Object[]} elements - A list of jQuery objects
 * @returns {boolean} Whether the elements were found on the DOM
 */
export function elementsExist(elements = []) {
  return elements.filter((el) => el.length).length == elements.length
}

/**
 * * Applies scroll locked styles to the docuemnt body
 *
 * @param  {Object[]} elements - A list of jQuery objects
 * @returns {boolean} Whether the elements were found on the DOM
 */
export function toggleScroll({ lock, yPosition }) {
  const body = document.body

  // Check if the scroll should be locked or unlocked
  const lockScroll = lock != null ? lock == true : body.style.overflow != 'hidden'

  if (lockScroll) {
    // Lock the scroll
    let scrollPosition = window.pageYOffset
    if (yPosition != null) scrollPosition = yPosition

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollPosition}px`
    body.style.width = '100%'
  } else {
    // Unlock the scroll
    const scrollPosition = parseInt(body.style.top) * -1

    body.style.removeProperty('overflow')
    body.style.removeProperty('position')
    body.style.removeProperty('top')
    body.style.removeProperty('width')

    window.scrollTo({ top: scrollPosition, behavior: 'instant' })
  }
}

/**
 * * Determines if the current screen is mobile-sized
 *
 * @returns {boolean} Whether the current screen width is within the mobile threshhold
 */
export function isMobile() {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    return true
  }

  return false
}

/**
 *
 * @param {*} cents
 * @param {*} format
 * @returns
 */
export function formatMoney(cents, format) {
  if (typeof cents == 'string') cents = cents.replace('.', '')

  var value = ''
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/
  var formatString = format || '${{ amount_no_decimals }}'

  function defaultOption(opt, def) {
    return typeof opt == 'undefined' ? def : opt
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2)
    thousands = defaultOption(thousands, ',')
    decimal = defaultOption(decimal, '.')

    if (isNaN(number) || number == null) {
      return 0
    }

    number = (number / 100.0).toFixed(precision)

    var parts = number.split('.'),
      dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
      cents = parts[1] ? decimal + parts[1] : ''

    return dollars + cents
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2)
      break

    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0)
      break

    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',')
      break

    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',')
      break
  }

  return formatString.replace(placeholderRegex, value)
}

/**
 * Updates a list of elements to all match the height of the tallest element provided
 *
 * @param {jQuery node list} $elements
 */
export function syncElementsHeight($elements) {
  if (!$elements.length) return

  // Reset heights to get accurate measurement
  $elements.height('auto')

  // Sort elements by intrinsic height
  const sortedByHeight = $elements.sort((a, b) => {
    return b.offsetHeight - a.offsetHeight
  })
  const maxHeight = sortedByHeight[0].offsetHeight

  // Set all elements to match the tallest element found
  $elements.height(maxHeight)
}

// Get the number of pixels an element is on screen
export function calculatePixelsOnScreen(element) {
  // Make sure we have a jQuery object
  let $element = element
  if (element instanceof HTMLElement) $element = $(element)

  // Get the element height, top, and bottom
  const elementHeight = $element.outerHeight()
  const elementTop = $element.offset().top
  const elementBottom = elementTop + elementHeight

  // Get the viewport top and bottom
  const viewportTop = window.scrollY
  const viewportBottom = viewportTop + window.innerHeight

  // Calculate the number of pixels above and below the screen
  const pixelsAboveScreen = Math.max(viewportTop - elementTop, 0)
  const pixelsBelowScreen = Math.max(elementBottom - viewportBottom, 0)

  // Return the remaining number of pixels on screen
  return Math.max(elementHeight - pixelsAboveScreen - pixelsBelowScreen, 0)
}

// Get the element that is taking up the most visible space on screen
export function getElementMostVisible($elements) {
  const elementsArray = $elements.toArray()

  const elementMostVisible = elementsArray.reduce((elementA, elementB) => {
    // Compare the number of pixels on screen for each element in the array
    const pixelsOnScreenA = calculatePixelsOnScreen(elementA)
    const pixelsOnScreenB = calculatePixelsOnScreen(elementB)

    // Return the element with the most pixels on screen
    if (pixelsOnScreenB > pixelsOnScreenA) return elementB
    return elementA
  }, $elements[0])

  return elementMostVisible
}

export function debounce(callback, wait = 200) {
  let timeoutId = null

  return (...args) => {
    window.clearTimeout(timeoutId)

    timeoutId = window.setTimeout(() => {
      callback.apply(this, args)
    }, wait)
  }
}