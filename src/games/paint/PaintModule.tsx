import React, {useEffect} from 'react';

import style from './PaintModule.module.css'
import {ReactSVG} from "react-svg";
import LoadingIcon from '../../components/loading-icon/LoadingIcon';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import {useAppDispatch, useAppSelector} from "../../__data__/hooks";
import {
    getCurrentColor,
    getCurrentInstrument,
    setCurrentInstrument
} from "../../__data__/slices/paintSlice";
import PaletteToolbox from "./palette/PaletteToolbox";

type PaintModuleProps = {
    src: string
}

const SVG = React.memo(({src}: PaintModuleProps) => (
    <ReactSVG
        fallback={() => <ErrorMessage message='Ошибка загрузки раскраски'/>}
        loading={() => <LoadingIcon useGlobalState={false}/>}
        src={src}
        className={style.svg}
    />
), (prevProps, nextProps) => {
    return prevProps.src === nextProps.src
} )


const PaintModule = ({src}: PaintModuleProps) => {

    const currentColor = useAppSelector((state) => getCurrentColor(state.paint))
    const currentInstrument = useAppSelector((state) => getCurrentInstrument(state.paint))

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentInstrument('brush'))
    }, [])

    const handleClick = (e: React.MouseEvent) => {
        // @ts-ignore
        const fill = e.target?.getAttribute('fill')
        if (fill && fill !== 'black') {
            // @ts-ignore
            e.target.setAttribute('fill', currentInstrument === "brush" ? currentColor : '#FFFFFF')
        }
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.canvasHolder} onClick={handleClick}>
                <SVG src={src} />
            </div>
            <PaletteToolbox />
        </div>
    );
};

export default PaintModule;

