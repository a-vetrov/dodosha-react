import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import PuzzleItem from "./PuzzleItem";
import PuzzleStructure from "./data/PuzzleStructure";

const Puzzle = ({word, img}) => {

    const [puzzleStructure, setPuzzleStructure] = useState(null)

    const [currentItem, setCurrentItem] = useState(null)

    useEffect(() => {
        const struct = new PuzzleStructure(word)
        struct.list.forEach(item => item.ref = React.createRef())
        setPuzzleStructure(struct)
    }, [word])

    const onMouseDown = (e, item) => {
        setCurrentItem(item)
    }

    const handleMouseMove = e => {
        if (currentItem) {
            console.log(e)
            currentItem.position = {left: e.clientX, top: e.clientY}
            setCurrentItem(currentItem)
        }
    }

    console.log('Render')

    return (
        <div onMouseMove={handleMouseMove}>
            { puzzleStructure ?
                puzzleStructure.list.map(item =>
                    <PuzzleItem item={item} key={item.index} ref={item.ref} onMouseDown={onMouseDown}/>)
                : null
            }
        </div>
    );
};

Puzzle.propTypes = {
    word: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default Puzzle;