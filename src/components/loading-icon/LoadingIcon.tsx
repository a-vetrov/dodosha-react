import React from 'react';
import style from './LoadingIcon.module.css'
import icon from './loading.svg'
import {useAppSelector} from "../../__data__/hooks";

const loadingComponent = (
    <div className={style.container}>
        <img src={icon} alt='Загрузка'/>
    </div>
)

type LoadingIconProps = {
    useGlobalState?: boolean
}

const LoadingIcon = ({useGlobalState = true}: LoadingIconProps) => {
    const isLoading = useAppSelector((state => state.isLoading))
    if (useGlobalState) {
        return isLoading ? loadingComponent : null
    } else {
        return loadingComponent
    }
}

export default LoadingIcon
