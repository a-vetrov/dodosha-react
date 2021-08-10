import {RefObject} from "react";

const DISTANCE_THRESHOLD = 1000

export interface IPosition {
    left: number,
    top: number
}

class Item {

    leftItem: Item | null = null

    rightItem:Item | null = null

    ref: RefObject<HTMLDivElement> | null = null

    position: IPosition | null = null

    width: number = 0

    backgroundShift: number = 0

    letter: string

    index: number

    constructor(letter: string, index: number) {
        this.letter = letter
        this.index = index
    }


    getBounds = () => {
        if (!this.ref || !this.ref.current) {
            return null
        }
        return this.ref.current.getBoundingClientRect()
    }

    setPosition = (left: number, top: number) => {
        this.position = {left, top}
    }

    shift = (dx:number = 0, dy: number = 0) => {
        if (this.position) {
            const {left, top} = this.position
            this.setPosition(left + dx, top + dy)
        }
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

    static checkDistance = (item1: Item, item2: Item) => {
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
