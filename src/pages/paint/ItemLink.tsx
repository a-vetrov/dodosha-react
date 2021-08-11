import React from 'react';
import {Link} from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";
import style from './ItemLink.module.css'

type ItemLinkProps = {
    categoryUrl:string,
    svg: string,
    index: number,
}

const ItemLink = ({categoryUrl, svg, index}: ItemLinkProps) => {

    return (
        <div className={style.container}>
            <Link to={`${NAVIGATION_URL.PAINT}/${categoryUrl}/${index}`}>
                <img src={`${process.env.PUBLIC_URL}/paint/${svg}`} alt='Ссылка на раскраску' className={style.image}/>
            </Link>

        </div>
    );
};

export default ItemLink;
