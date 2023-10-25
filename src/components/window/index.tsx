import * as React from 'react'

import style from './game-window.module.css'

interface Props {
    onClose?: () => void
}

const GameWindow: React.FC<Props> = ({children, onClose}) => {
    return (
        <div className={style.absoluteContainer}>
            <div className={style.gameWindowContainer}>
                <div className={style.windowHeader}>
                    <svg className={style.closeButton} onClick={onClose} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"/>
                    </svg>
                </div>
                {children}
            </div>
        </div>
    )
}

export default GameWindow
