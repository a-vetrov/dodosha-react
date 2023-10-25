import React from 'react';
import style from './PageTemplate.module.css'
import MainHeader from "../header/MainHeader";
import MainFooter from "../footer/MainFooter";

interface Props {
    animateClouds?: boolean
}

const PageTemplate: React.FC<Props> = ({animateClouds=true, children}) => {
    return (
        <div className={style.container}>
            <MainHeader animateClouds={animateClouds} />
            {children}
            <MainFooter />
        </div>
    );
};

export default PageTemplate;