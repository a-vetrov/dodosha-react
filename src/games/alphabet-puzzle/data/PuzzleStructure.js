import _ from 'lodash'
import Item from "./Item";
import Rectangle from "../../../utils/geom/Rectangle";

const getDefaultPosition = (index, dimensions) => {

    return {top: 0.2*window.innerHeight, left: 100 + (dimensions.width + dimensions.gap) * index}
}

class PuzzleStructure {

    constructor(word) {

        this.word = word

        this.list = word.split('').map((s, index) => new Item(s, index))

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

    getItemDimensions = () => {
        const w = Math.min(window.innerWidth, window.innerHeight) * 0.6
        const count =this.list.length
        const width = w / count

        return {
            width,
            gap: width / 2
        }
    }

    updateDimensions = () => {
        this.dimensions = this.getItemDimensions()
        const maxX = window.innerWidth, maxY = window.innerHeight

        let union

        this.list.forEach((item, index) => {
            const rect = Rectangle.fromDOMRect(item.getBounds())
            item.width = item.letter.length * this.dimensions.width
            rect.width = item.width

            if (union) {
                union.extend(rect)
            } else  {
                union = rect
            }
        })

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
                const delta =  (center.x - item.position.left) * (1 - ratio)
                item.shift(delta)
            })
        }

        if (union.height > maxY) {
            const ratio = maxY / union.height * 0.9
            this.list.forEach((item) => {
                const delta = (center.y - item.position.top) * (1 - ratio)
                item.shift(0, delta)
            })
        }

    }

    getItem = index => this.list.find(item => item.index === index)

    setOnTop = item => {
        const arr = _.without(this.list, item)
        arr.push(item)
        this.list = arr
    }

    join = (item1, item2) => {
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
        let item = this.getItem(0)
        do  {
            item.backgroundShift = dw
            dw -= item.width
            item = item.rightItem
        } while (item)
    }
}

export default PuzzleStructure
