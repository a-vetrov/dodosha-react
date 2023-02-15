import React from 'react';

import style from './BlueBox.module.css'

type Props = {
    title: string
    description: string
    image: string
}

const MainBlueBox: React.FC<Props> = ({title, description, image}) => (
    <div className={style.container}>
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        <img src={image} className={style.image} alt={title} />
    </div>
)

export default MainBlueBox;
