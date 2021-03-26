import React from 'react';
import {getLetters} from "../../__data__/selectors/alphabet/getLetters";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import style from './Keyboard.module.css'

const Keyboard = ({letters, onChange}) => {

    if (!letters.length)
        return null

    const handleClick = e => {
        if (onChange)
            onChange(e.target.dataset.key)
    }

    return (
        <div className={style.keyboard}>
            {letters.map(item => (
                <div key={item} data-key={item} className={style.button} onClick={handleClick}>
                    {item.toUpperCase()}
                </div>
            ))}
        </div>
    );
};

Keyboard.propTypes = {
    onChange: PropTypes.func.isRequired,
    letters: PropTypes.arrayOf(PropTypes.string),
}

Keyboard.defaultProps = {
    letters: [],
}

const mapStateToProps = (state) => ({
    letters: getLetters(state),
})

export default connect(mapStateToProps)(Keyboard)
