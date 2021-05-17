const DISTANCE_THRESHOLD = 1000

class Item {

    constructor(letter, index) {
        this.letter = letter
        this.index = index
    }

    leftItem = null

    rightItem = null

    ref = null

    position = null

    width = 0

    backgroundShift = 0

    getBounds = () => {
        if (!this.ref || !this.ref.current) {
            return null
        }
        return this.ref.current.getBoundingClientRect()
    }

    setPosition = (left, top) => {
        this.position = {left, top}
    }

    shift = (dx = 0, dy = 0) => {
        const {left, top} = this.position
        this.setPosition(left + dx, top + dy)
    }

    closeToTheRightItem = () => {
        if (!this.rightItem)
            return false

        return Item.checkDistance(this, this.rightItem)
    }

    closeToTheLeftItem = () => {
        if (!this.leftItem)
            return false

        return Item.checkDistance(this.leftItem, this)
    }

    static checkDistance = (item1, item2) => {
        const rect1 = item1.getBounds()
        const rect2 = item2.getBounds()

        if (!rect1 || !rect2)
            return false

        const dx = rect1.right - rect2.x
        const dy = rect1.top - rect2.top
        return (dx * dx + dy * dy) < DISTANCE_THRESHOLD
    }
}

export default Item
