import React from 'react';
import {Link} from "react-router-dom";
import {NAVIGATION_URL} from "../../__data__/constants";

type ItemLinkProps = {
    categoryUrl:string,
    svg: string,
    index: number,
}

const ItemLink = ({categoryUrl, svg, index}: ItemLinkProps) => {

    return (
        <div>
            <Link to={`${NAVIGATION_URL.PAINT}/${categoryUrl}/${index}`}>
                {svg}
            </Link>

        </div>
    );
};

export default ItemLink;
