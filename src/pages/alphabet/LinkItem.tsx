import * as React from 'react'

import style from './AlphabetPage.module.css'

interface LinkItemType {
    title: string
    image: string
}

const LinkItem: React.FC<LinkItemType> = ({title, image}) => {
    return (
        <div className={style.blueBox}>
            <img src={image} className={style.image} alt={title} />
            <h3>{title}</h3>
        </div>
    )
}

export default LinkItem
