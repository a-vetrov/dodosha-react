class Item {

    constructor(letter, index) {
        this.letter = letter
        this.index = index
    }

    leftItem = null

    rightItem = null

    ref = null

    position = null

    setPosition = (left, top) => {
        this.position = {left, top}
    }
}

export default Item