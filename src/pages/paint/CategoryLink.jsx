import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { NAVIGATION_URL } from "../../__data__/constants";

const CategoryLink = ({title, url, items}) => {

    return (
        <div>
            <Link to={`${NAVIGATION_URL.PAINT}/${url}`}>
                {title}
            </Link>

        </div>
    );
};

CategoryLink.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};

export default CategoryLink;
