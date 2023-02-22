import React, {useMemo} from 'react';
import { useParams } from 'react-router-dom';
import {useAppSelector} from "../../__data__/hooks";
import {getCategoryByUrl} from "../../__data__/slices/paintSlice";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import ItemLink from "./ItemLink";

import style from './PaintCategory.module.css'
import templates from '../../styles/templates.module.css'
import usePaintLoader from "./hooks/usePaintLoader";
import useTitle from "../../utils/hooks/useTitle";
import PageTemplate from "../../components/page-template/PageTemplate";
import {NAVIGATION_URL} from "../../__data__/constants";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

interface ICategoryType {
    category: string
}

const PaintCategory = () => {
    const {category: url} = useParams<ICategoryType>()
    const category = useAppSelector((state) => getCategoryByUrl(state.paint, url))

    const {loaded, error} = usePaintLoader()

    useTitle(category?.title)

    const breadCrumbs = useMemo(() => [
        {
            caption: 'Раскраски онлайн',
            link: NAVIGATION_URL.PAINT
        },
        {
            caption: category?.title || 'Раскраска'
        }
    ], [category?.title])

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    if (!category)
        return <ErrorMessage message='Категория не найдена'/>

    return (
        <PageTemplate>
            <div className={templates.mainFrame}>
                <Breadcrumb items={breadCrumbs}/>
                <h1>{category.title}</h1>

                <div className={style.imageContainer}>
                    {category.items.map((item, index) =>
                        <ItemLink categoryUrl={url} {...item} index={index} key={item.svg}/>)}
                </div>
            </div>
        </PageTemplate>
    );
};

export default PaintCategory;
