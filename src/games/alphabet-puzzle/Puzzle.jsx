import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import PuzzleItem from "./PuzzleItem";
import PuzzleStructure from "./data/PuzzleStructure";

const Puzzle = ({word, img}) => {

    const [puzzleStructure, setPuzzleStructure] = useState(null)

    useEffect(() => {
        const struct = new PuzzleStructure(word)
        setPuzzleStructure(struct)
    }, [word])

    return (
        <div>
            { puzzleStructure ?
                puzzleStructure.list.map(item => <PuzzleItem letter={item.letter} key={item.index} position={item.position}/>)
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