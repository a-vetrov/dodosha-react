import React from 'react';
import ErrorMessage from "../../components/error-message/ErrorMessage";
import BackButton from "../../components/back-button/BackButton";
import CategoryLink from "./CategoryLink";
import {useAppSelector} from "../../__data__/hooks";
import usePaintLoader from "./hooks/usePaintLoader";

function PaintPage() {

    const categories = useAppSelector((state) => state.paint.categories)

    const {loaded, error} = usePaintLoader()

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <h1>Paint page</h1>
            {categories.map((item) => <CategoryLink {...item} key={item.title}/>)}
        </>
    );
}


export default PaintPage
