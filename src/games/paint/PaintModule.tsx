import React from 'react';

import style from './PaintModule.module.css'
import {ReactSVG} from "react-svg";
import LoadingIcon from '../../components/loading-icon/LoadingIcon';
import ErrorMessage from '../../components/error-message/ErrorMessage';
import Palette from "./palette/Palette";
import {useAppSelector} from "../../__data__/hooks";
import {getMainColor} from "../../__data__/slices/paintSlice";

type PaintModuleProps = {
    src: string
}

const SVG = React.memo(({src}: PaintModuleProps) => (
    <ReactSVG
        beforeInjection={(svg) => {
            svg.setAttribute('style', 'width: 80vw; height: 80vh')
        }}
        fallback={() => <ErrorMessage message='Ошибка загрузки раскраски'/>}
        loading={() => <LoadingIcon useGlobalState={false}/>}
        src={src}
    />
), (prevProps, nextProps) => {
    return prevProps.src === nextProps.src
} )


const PaintModule = ({src}: PaintModuleProps) => {

    const currentColor = useAppSelector((state) => getMainColor(state.paint))

    const handleClick = (e: React.MouseEvent) => {
        console.log('Click target', e.target)
        // @ts-ignore
        if (e.target.ownerSVGElement) {
            // @ts-ignore
            e.target.setAttribute('fill', currentColor)
            console.log('Fill target with color', e.target)
        }

    }

    return (
        <div className={style.mainContainer} onClick={handleClick}>
            <SVG src={src} />
            <Palette />
        </div>
    );
};

export default PaintModule;

