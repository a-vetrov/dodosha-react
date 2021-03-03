import React from 'react';
import { connect } from 'react-redux'
import style from './LoadingIcon.module.css'
import icon from './loading.svg'

const loadingComponent = (
    <div className={style.container}>
        <img src={icon} alt='Загрузка'/>
    </div>
)

const LoadingIcon = ({isLoading}) => isLoading ? loadingComponent : null


const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
})

export default connect(mapStateToProps)(LoadingIcon)