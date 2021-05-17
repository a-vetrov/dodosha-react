/**
 * Rectangle class for geometry calculations
 * Copied from https://github.com/CreateJS/EaselJS/blob/master/src/easeljs/geom/Rectangle.js
 */
class Rectangle {

    constructor(x, y, width, height) {
        this.x = x || 0
        this.y = y || 0
        this.width = width || 0
        this.height = height || 0
    }

    get right() {
        return this.x + this.width
    }

    get left() {
        return this.x
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.height
    }

    get center() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        }
    }

    extend = (rect) => {
        if (rect.right > this.right) {
            this.width = rect.right - this.x
        }
        if (rect.bottom > this.bottom) {
            this.height = rect.bottom - this.y
        }
        if (rect.x < this.x) {
            this.width += this.x - rect.x
            this.x = rect.x
        }
        if (rect.y < this.y) {
            this.height += this.y - rect.y
            this.y = rect.y
        }
        return this;
    }

    clone = () => new Rectangle(this.x, this.y, this.width, this.height)

    toString() {
        return `Rectangle x=${this.x}, y=${this.y}, width=${this.width}, height=${this.height}`
    }

    static fromDOMRect(rect) {
        return rect ? new Rectangle(rect.left, rect.top, rect.width, rect.height) : new Rectangle()
    }
}

export default Rectangle
