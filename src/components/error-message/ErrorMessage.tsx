import React from 'react';
import { Link } from "react-router-dom";

import style from './ErrorMessage.module.css'

const defaultMessage = 'Произошла ошибка'

const ErrorMessage = ({message = defaultMessage}: {message: string}) => {
    return (
        <div className={style.container}>
            <div className={style.popup}>
                <div>{message}</div>
                <div><Link to="/">Вернуться на главную</Link></div>
            </div>

        </div>
    )
}

export default ErrorMessage
