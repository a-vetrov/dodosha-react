import React from 'react';

import style from './PaintModule.module.css'
import {ReactSVG} from "react-svg";
import LoadingIcon from '../../components/loading-icon/LoadingIcon';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import {useAppSelector} from "../../__data__/hooks";
import {getCurrentColor} from "../../__data__/slices/paintSlice";
import PaletteToolbox from "./palette/PaletteToolbox";

type PaintModuleProps = {
    src: string
}

const SVG = React.memo(({src}: PaintModuleProps) => (
    <ReactSVG
        beforeInjection={(svg) => {
            svg.setAttribute('style', 'width: calc(100vw - 400px); height: 80vh')
        }}
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

    const handleClick = (e: React.MouseEvent) => {
        // @ts-ignore
        if (e.target.ownerSVGElement) {
            // @ts-ignore
            e.target.setAttribute('fill', currentColor)
        }
    }

    return (
        <div className={style.mainContainer} onClick={handleClick}>
            <SVG src={src} />
            <PaletteToolbox />
        </div>
    );
};

export default PaintModule;

