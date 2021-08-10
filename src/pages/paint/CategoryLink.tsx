import React from 'react';
import { Link } from "react-router-dom";
import { NAVIGATION_URL } from "../../__data__/constants";
import {IPaintCategory} from "../../__data__/slices/paintSlice";

const CategoryLink = ({title, url}: IPaintCategory) => {

    return (
        <div>
            <Link to={`${NAVIGATION_URL.PAINT}/${url}`}>
                {title}
            </Link>

        </div>
    );
};


export default CategoryLink;
