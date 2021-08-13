import React from 'react';
import {useParams} from "react-router-dom";
import BackButton from "../../components/back-button/BackButton";
import {useAppSelector} from "../../__data__/hooks";
import {getCategoryByUrl} from "../../__data__/slices/paintSlice";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import usePaintLoader from "./hooks/usePaintLoader";
import PaintModule from '../../games/paint/PaintModule';
import useTitle from "../../utils/hooks/useTitle";

interface IUrlParams {
    category: string,
    id: string,
}

const PaintItem = () => {

    const {category: categoryUrl, id} = useParams<IUrlParams>()

    const category = useAppSelector((state) => getCategoryByUrl(state.paint, categoryUrl))

    const {loaded, error} = usePaintLoader()

    useTitle(category?.title)

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    if (!category)
        return <ErrorMessage message='Категория не найдена'/>

    const item = category.items[parseInt(id)]

    if (!item)
        return <ErrorMessage message='Раскраска не найдена'/>

    return (
        <>
            <BackButton />
            <PaintModule src={`${process.env.PUBLIC_URL}/paint/${item.svg}`}/>
        </>
    );
};

export default PaintItem;
