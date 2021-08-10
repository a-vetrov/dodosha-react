import React from 'react';

import style from './Keyboard.module.css'
import {useAppSelector} from "../../__data__/hooks";
import {getLetters} from "../../__data__/slices/alphabetSlice";

type KeyboardProps = {
    onChange: (key: string) => void,
}

const Keyboard = ({onChange}: KeyboardProps) => {

    const letters: string[] = useAppSelector((state => getLetters(state.alphabet)))

    if (!letters.length)
        return null

    const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
        if (onChange && e.currentTarget.dataset.key)
            onChange(e.currentTarget.dataset.key)
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

export default Keyboard
