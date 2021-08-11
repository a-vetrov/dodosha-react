import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../../__data__/hooks";
import { fetchPaintData } from "../../../__data__/slices/paintSlice";

function usePaintLoader() {
    const dispatch = useAppDispatch()

    const loaded = useAppSelector((state) => state.paint.loaded)
    const error = useAppSelector((state) => state.alphabet.error)

    useEffect(() => {
        if (!loaded) {

            // @ts-ignore
            dispatch(fetchPaintData())
        }
        // eslint-disable-next-line
    }, [])

    return {loaded, error}
}

export default usePaintLoader
