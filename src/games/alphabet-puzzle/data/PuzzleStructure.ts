import _ from 'lodash'
import Item, {IPosition} from "./Item";
import Rectangle from "../../../utils/geom/Rectangle";

interface IDimensions {
    width: number,
    gap: number,
    padding: number
}

const getDefaultPosition = (index: number, dimensions: IDimensions): IPosition => {
    return {
        top: 0.2*window.innerHeight,
        left: dimensions.padding + (dimensions.width + dimensions.gap) * index,
    }
}

class PuzzleStructure {

    word: string

    list: Item[]

    dimensions: IDimensions

    constructor(word: string) {

        this.word = word

        this.list = word.split('').map((s: string, index: number) => new Item(s, index))

        this.list.forEach((item, index) => {
            if (index > 0) {
                const prev = this.list[index - 1]
                prev.rightItem = item
                item.leftItem = prev
            }
        })

        this.list = _.shuffle(this.list)

        this.dimensions = this.getItemDimensions()

        this.list.forEach((item, index) => {
            item.width = this.dimensions.width
            item.position = getDefaultPosition(index, this.dimensions)
        })
        this.updateBackgroundShift()
    }

    getItemDimensions = (): IDimensions => {
        const w = Math.min(window.innerWidth, window.innerHeight)
        const count = this.list.length
        const effectiveCount = count + (count - 1) / 2 + 1
        const width = w / effectiveCount

        return {
            width,
            gap: width / 2,
            padding: (window.innerWidth - w) / 2 + width / 2,
        }
    }

    getListUnion = (): Rectangle | null => {
        this.dimensions = this.getItemDimensions()

        let union: Rectangle | null = null

        this.list.forEach((item, index) => {
            const domRect = item.getBounds()
            if (!domRect)
                return
            const rect = Rectangle.fromDOMRect(domRect)
            item.width = item.letter.length * this.dimensions.width
            rect.width = item.width

            if (union) {
                union.extend(rect)
            } else  {
                union = rect
            }
        })

        return union
    }

    updateDimensions = () => {
        const maxX = window.innerWidth, maxY = window.innerHeight

        const union = this.getListUnion()

        if (!union)
            return;

        if (union.right <= maxX && union.bottom <= maxY) {
            return
        }

        const center = union.center
        const dx = maxX / 2 - center.x
        const dy = maxY / 2 - center.y

        this.list.forEach((item) => item.shift(dx, dy))

        if (union.width > maxX) {
            const ratio = maxX / union.width * 0.9
            this.list.forEach((item) => {
                if (item.position) {
                    const delta = (center.x - item.position.left) * (1 - ratio)
                    item.shift(delta)
                }
            })
        }

        if (union.height > maxY) {
            const ratio = maxY / union.height * 0.9
            this.list.forEach((item) => {
                if (item.position) {
                    const delta = (center.y - item.position.top) * (1 - ratio)
                    item.shift(0, delta)
                }
            })
        }

    }

    getItem = (index: number) => this.list.find(item => item.index === index)

    setOnTop = (item: Item) => {
        const arr = _.without(this.list, item)
        arr.push(item)
        this.list = arr
    }

    join = (item1: Item, item2: Item) => {
        item1.letter += item2.letter
        item1.rightItem = item2.rightItem
        if (item1.rightItem) {
            item1.rightItem.leftItem = item1
        }
        item1.width = item1.letter.length * this.dimensions.width

        this.list = _.without(this.list, item2)
        this.setOnTop(item1)
        this.updateBackgroundShift()
    }

    updateBackgroundShift = () => {
        let dw = 0
        let item: Item | null | undefined = this.getItem(0)
        if (!item)
            return
        do  {
            item.backgroundShift = dw
            dw -= item.width
            item = item.rightItem
        } while (item)
    }
}

export default PuzzleStructure
