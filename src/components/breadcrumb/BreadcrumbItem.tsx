import * as React from 'react'
import {BreadcrumbItemType} from "./Breadcrumb";
import {Link} from "react-router-dom";
import styles from "./Breadcrumb.module.css";
import BreadcrumbDelimiter from "./BreadcrumbDelimiter";

const BreadcrumbItem: React.FC<{item: BreadcrumbItemType, showDelimiter: boolean}> = ({item, showDelimiter}) => {
    const body = item.link ? (
        <Link to={item.link} className={styles.item}>
            {item.caption}
        </Link>
    ) : (
        <span>
            {item.caption}
        </span>
    )

    const delimiter = showDelimiter ? <BreadcrumbDelimiter /> : null

    return (
        <>
            {body}
            {delimiter}
        </>
    )
}

export default BreadcrumbItem
