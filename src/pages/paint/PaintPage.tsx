import React, {useEffect} from 'react';
import {fetchPaintData} from "../../__data__/actions/fetchPaintData";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import BackButton from "../../components/back-button/BackButton";
import CategoryLink from "./CategoryLink";
import {useAppDispatch, useAppSelector} from "../../__data__/hooks";

function PaintPage() {

    const dispatch = useAppDispatch()

    const loaded = useAppSelector((state) => state.paint.loaded)
    const categories = useAppSelector((state) => state.paint.categories)

    useEffect(() => {
        if (!loaded) {
            // @ts-ignore
            dispatch(fetchPaintData)
        }
        // eslint-disable-next-line
    }, [])

    /*if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }
     */

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <h1>Paint page</h1>
            {categories.map((item) => <CategoryLink {...item}/>)}
        </>
    );
}


export default PaintPage
