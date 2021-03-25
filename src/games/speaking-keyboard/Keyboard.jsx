import React from 'react';
import {getLetters} from "../../__data__/selectors/alphabet/getLetters";
import {connect} from "react-redux";
import style from './Keyboard.module.css'

const Keyboard = ({letters}) => {

    if (!letters?.length)
        return null

    const handleClick = e => {
        console.log(e.target.dataset.key)
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

const mapStateToProps = (state) => ({
    letters: getLetters(state),
})

export default connect(mapStateToProps)(Keyboard)
