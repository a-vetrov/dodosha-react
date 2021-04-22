import _ from 'lodash'
import Item from "./Item";

const getDefaultPosition = index => {

    return {top: 300, left: 50 + 100 * index}
}

class PuzzleStructure {

    constructor(word) {

        const list = word.split('').map((s, index) => new Item(s, index))

        this.list = _.shuffle(list)

        this.list.forEach((item, index) => {
            item.position = getDefaultPosition(index)
            if (index > 0) {
                const prev = this.list[index - 1]
                prev.rightItem = item
                item.leftItem = prev
            }
        })

    }

    getItem = index => this.list.find(item => item.index === index)

    setOnTop = item => {
        const arr = _.without(this.list, item)
        arr.push(item)
        this.list = arr
    }
}

export default PuzzleStructure