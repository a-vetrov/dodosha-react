import React from 'react';
import {Link} from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";
import style from './ItemLink.module.css'

type ItemLinkProps = {
    categoryUrl:string,
    svg: string,
    index: number,
    title: string
}

const ItemLink = ({categoryUrl, svg, index, title}: ItemLinkProps) => {

    return (
        <div className={style.container}>
            <Link to={`${NAVIGATION_URL.PAINT}/${categoryUrl}/${index}`} className={style.link}>
                <div className={style.imageContainer}>
                    <img src={`${process.env.PUBLIC_URL}/paint/${svg}`} alt='Ссылка на раскраску' className={style.image}/>
                </div>
                <p className={style.title}>{title}</p>
            </Link>

        </div>
    );
};

export default ItemLink;
