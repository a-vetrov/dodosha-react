import Item from "./Item";

const getDefaultPosition = index => {

    return {top: 300, left: 50 + 100 * index}
}

class PuzzleStructure {

    constructor(word) {

        this.list = word.split('').map((s, index) => new Item(s, index))

        this.list.forEach((item, index) => {
            item.position = getDefaultPosition(index)
            if (index > 0) {
                const prev = this.list[index - 1]
                prev.rightItem = item
                item.leftItem = prev
            }
        })
    }
}

export default PuzzleStructure