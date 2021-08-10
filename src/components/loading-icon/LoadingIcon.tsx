import React from 'react';
import style from './LoadingIcon.module.css'
import icon from './loading.svg'
import {useAppSelector} from "../../__data__/hooks";

const loadingComponent = (
    <div className={style.container}>
        <img src={icon} alt='Загрузка'/>
    </div>
)

const LoadingIcon = () => {
    const isLoading = useAppSelector((state => state.isLoading))
    return isLoading ? loadingComponent : null
}

export default LoadingIcon
