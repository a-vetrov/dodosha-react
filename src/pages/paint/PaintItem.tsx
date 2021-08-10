import React from 'react';
import {useParams} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import {useAppSelector} from "../../__data__/hooks";
import {getCategoryByUrl} from "../../__data__/slices/paintSlice";
import ErrorMessage from "../../components/error-message/ErrorMessage";

interface IUrlParams {
    categoryUrl: string,
    id: string,
}

const PaintItem = () => {

    const {categoryUrl, id} = useParams<IUrlParams>()

    const category = useAppSelector((state) => getCategoryByUrl(state.paint, categoryUrl))

    if (!category)
        return <ErrorMessage message='Категория не найдена'/>

    const item = category.items[parseInt(id)]

    if (!item)
        return <ErrorMessage message='Раскраска не найдена'/>

    return (
        <>
            <BackButton />
            <div>
                <h1>Paint item {category} {id}</h1>
            </div>
        </>
    );
};

export default PaintItem;
