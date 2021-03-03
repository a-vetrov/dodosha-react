import React from 'react';
import style from './LoadingIcon.module.css'
import icon from './loading.svg'

const LoadingIcon = () => {
    return (
        <div className={style.container}>
            <img src={icon} alt='Загрузка'/>
        </div>
    );
};

export default LoadingIcon;