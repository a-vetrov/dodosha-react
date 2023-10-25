import React, {useEffect, useRef} from 'react';

import style from './MainHeader.module.css'
import Clouds from "./Clouds";
import Letters from "./Letters";

interface Props {
    animateClouds?: boolean
}

const MainHeader: React.FC<Props> = ({animateClouds=true}) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!animateClouds) {
            return
        }
        let clouds: Clouds | undefined

        if (ref.current) {
            clouds = new Clouds(ref.current)
        }

        return () => {
            clouds?.destroy()
        }
    }, [animateClouds])


    return (
        <header className={style.header}>
            <div ref={ref} className={style.staticHeader}/>
            <Letters />
        </header>
    );
};


export default MainHeader;