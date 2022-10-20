import React, {useEffect, useRef} from 'react';

import style from './MainHeader.module.css'
import Clouds from "./Clouds";

const MainHeader = () => {

    const ref = useRef<HTMLDivElement>(null)

    /*useEffect(() => {
        let clouds: Clouds | undefined

        if (ref.current) {
            clouds = new Clouds(ref.current)
        }

        return () => {
            clouds?.destroy()
        }
    }, [])

     */


    return (
        <header className={style.header}>
            <div ref={ref} className={style.staticHeader}/>
        </header>
    );
};


export default MainHeader;