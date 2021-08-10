import React from 'react';
import { useParams } from 'react-router-dom';
import {useAppSelector} from "../../__data__/hooks";
import {getCategoryByUrl} from "../../__data__/slices/paintSlice";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import ItemLink from "./ItemLink";
import BackButton from "../../components/back-button/BackButton";

interface ICategoryType {
    category: string
}

const PaintCategory = () => {
    const {category: url} = useParams<ICategoryType>()
    const category = useAppSelector((state) => getCategoryByUrl(state.paint, url))

    if (!category)
        return <ErrorMessage message='Категория не найдена'/>

    return (
        <>
            <BackButton />
            <div>
                <h1>{category.title}</h1>

                Paint category {url}

                {category.items.map((item, index) =>
                    <ItemLink categoryUrl={url} svg={item.svg} index={index} key={item.svg}/>)}
            </div>
        </>
    );
};

export default PaintCategory;
