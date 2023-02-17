import React from 'react';
import ErrorMessage from "../../components/error-message/ErrorMessage";
import BackButton from "../../components/back-button/BackButton";
import CategoryLink from "./CategoryLink";
import {useAppSelector} from "../../__data__/hooks";
import usePaintLoader from "./hooks/usePaintLoader";
import useTitle from "../../utils/hooks/useTitle";
import {TITLE} from "../../__data__/constants";
import PageTemplate from "../../components/page-template/PageTemplate";
import style from './PaintPage.module.css'

function PaintPage() {

    const categories = useAppSelector((state) => state.paint.categories)
    const title = useAppSelector((state) => state.paint.title)

    const {loaded, error} = usePaintLoader()

    useTitle(TITLE.PAINT)

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    return (
        <PageTemplate>
            <div className={style.mainFrame}>
                <BackButton />
                <h1>{title}</h1>
                <div className={style.categoryContainer}>
                    {categories.map((item) => <CategoryLink {...item} key={item.title}/>)}
                </div>
            </div>
        </PageTemplate>
    );
}


export default PaintPage
