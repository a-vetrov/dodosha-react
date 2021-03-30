import React from 'react';
import PropTypes from 'prop-types';
import PuzzleItem from "./PuzzleItem";

const Puzzle = ({word, img}) => {

    return (
        <div>
            {word.split('').map((letter, index) => {
                const leftItem = index > 0 ? index - 1 : null
                const rightItem = index < word.length - 1 ? index + 1 : null
                return (
                        <PuzzleItem letter={letter} key={index} leftItem={leftItem} rightItem={rightItem}/>
                    )

            })}
        </div>
    );
};

Puzzle.propTypes = {
    word: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default Puzzle;