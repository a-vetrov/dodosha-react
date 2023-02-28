import React, {useMemo} from 'react';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../__data__/hooks";
import {getCategoryByUrl} from "../../__data__/slices/paintSlice";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import usePaintLoader from "./hooks/usePaintLoader";
import PaintModule from '../../games/paint/PaintModule';
import useTitle from "../../utils/hooks/useTitle";
import PageTemplate from '../../components/page-template/PageTemplate';
import {NAVIGATION_URL} from "../../__data__/constants";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

import style from './PaintItem.module.css'

interface IUrlParams {
    category: string,
    id: string,
}

const PaintItem = () => {

    const {category: categoryUrl, id} = useParams<IUrlParams>()

    const category = useAppSelector((state) => getCategoryByUrl(state.paint, categoryUrl))

    const {loaded, error} = usePaintLoader()

    const title = category?.items[parseInt(id)]?.title || 'Раскраска'

    useTitle(`${title} - Раскраски на Додоше`)

    const breadCrumbs = useMemo(() => [
        {
            caption: 'Раскраски онлайн',
            link: NAVIGATION_URL.PAINT
        },
        {
            caption: category?.title || 'Раскраска',
            link: `${NAVIGATION_URL.PAINT}/${categoryUrl}/`
        },
        {
            caption: title
        }
    ], [category?.title, categoryUrl, title])

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
        <PageTemplate>
            <div className={style.mainContainer}>
                <Breadcrumb items={breadCrumbs}/>
                <PaintModule src={`${process.env.PUBLIC_URL}/paint/${item.svg}`}/>
            </div>
        </PageTemplate>
    );
};

export default PaintItem;
