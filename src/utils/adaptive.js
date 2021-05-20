import _ from 'lodash'


/* from modernizr */
function isTouchDevice () {
    if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
        return true
    }

    return window.matchMedia('(touch-enabled),(-webkit-touch-enabled),(-moz-touch-enabled),(-o-touch-enabled),(-ms-touch-enabled),(heartz)').matches
}

/* Touch | No touch */
export const isTouchable = _.memoize(isTouchDevice)

export const isNotTouchable = _.memoize(() => !isTouchable())

export const applyForTouchable = (value, defaultValue) => isTouchable() ? value : defaultValue

export const applyForNotTouchable = (value, defaultValue) => isNotTouchable() ? value : defaultValue
