// * Use this file for custom jQuery plugins

export function extendJQueryFns($) {
  if (typeof $ === undefined) return;
  
  /**
   * Uses MutationObserver to watch for added elements
   * 
   * @param {String | Element} child 
   * @param {Function} callback 
   * @param {String} parent 
   * 
   * @usage
   *  $('.element-to-watch-within').watchFor('.element-to-watch-for', function($el) {
          this.onElementRender($el);
      });
  */

  $.fn.watchFor = function (child, callback) {
    const parent = this[0]
  
    const observer = new MutationObserver(function (mutationsList) {
      mutationsList.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (addedNode) {
          const $foundNodes = $(addedNode).find(child)
  
          if ($foundNodes.length && callback) callback($foundNodes)
        })
      })
    })
    observer.observe(parent, { subtree: true, childList: true })
  
    if (callback) callback($(child))
  
    return this
  }
  
  /**
   * Uses MutationObserver to watch for element class list changing
   */
  $.fn.onClassChange = function (className, callback) {
    if (!this.length) return
  
    const node = this[0]
  
    const observer = new MutationObserver(function (mutationList) {
      mutationList.forEach(function (mutation) {
        if (mutation.type != 'attributes') return
        if (mutation.attributeName != 'class') return
  
        const hasClass = $(mutation.target).hasClass(className)
  
        callback.bind(node)(hasClass, observer)
      })
    })
    observer.observe(node, { attributes: true })
  
    return this
  }
  
  
  /**
   * Checks if node is visible within the viewport
   *
   * @returns {Boolean}
   */
  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top
    var elementBottom = elementTop + $(this).outerHeight()
  
    var viewportTop = $(window).scrollTop()
    var viewportBottom = viewportTop + $(window).height()
  
    return elementBottom > viewportTop && elementTop < viewportBottom
  }
  
  /**
   * * Listens to click events on element(s) and ignores if the mouse drags
   *
   * @param {Function} callback
   * @returns element
   */
  $.fn.onDraglessClick = function (callback) {
    const $target = $(this)
    let drag = false
  
    $target.on('mousedown', () => {
      drag = false
    })
    $target.on('mousemove', () => {
      drag = true
    })
    $target.on('mouseup', (e) => {
      if (drag) return
  
      callback(e)
    })
  
    return this
  }
}