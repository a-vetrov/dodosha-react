import React from 'react';
import { useParams } from 'react-router-dom';
import {useAppSelector} from "../../__data__/hooks";
import {getCategoryByUrl} from "../../__data__/slices/paintSlice";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import ItemLink from "./ItemLink";
import BackButton from "../../components/back-button/BackButton";

import style from './PaintCategory.module.css'
import usePaintLoader from "./hooks/usePaintLoader";
import useTitle from "../../utils/hooks/useTitle";

interface ICategoryType {
    category: string
}

const PaintCategory = () => {
    const {category: url} = useParams<ICategoryType>()
    const category = useAppSelector((state) => getCategoryByUrl(state.paint, url))

    const {loaded, error} = usePaintLoader()

    useTitle(category?.title)

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    if (!category)
        return <ErrorMessage message='Категория не найдена'/>

    return (
        <>
            <BackButton />
            <div>
                <h1>{category.title}</h1>

                <div className={style['image-container']}>
                    {category.items.map((item, index) =>
                        <ItemLink categoryUrl={url} {...item} index={index} key={item.svg}/>)}
                </div>
            </div>
        </>
    );
};

export default PaintCategory;
