import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import style from './ErrorMessage.module.css'

const defaultMessage = 'Произошла ошибка'

const ErrorMessage = ({message}) => {
    return (
        <div className={style.container}>
            <div className={style.popup}>
                <div>{message}</div>
                <div><Link to="/">Вернуться на главную</Link></div>
            </div>

        </div>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
}

ErrorMessage.defaultProps = {
    message: defaultMessage,
}

export default ErrorMessage