import React from 'react';
import style from './PageTemplate.module.css'
import MainHeader from "../header/MainHeader";
import MainFooter from "../footer/MainFooter";

const PageTemplate: React.FC = ({children}) => {
    return (
        <div className={style.container}>
            <MainHeader />
            {children}
            <MainFooter />
        </div>
    );
};

export default PageTemplate;