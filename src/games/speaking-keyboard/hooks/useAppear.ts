import { useState, useEffect } from 'react';

function useAppear(param: any) {
    const [isAppear, setIsAppear] = useState(false)
    const [localParam, setLocalParam] = useState(param)

    useEffect(() => {
        if (param) {
            setIsAppear(true)
            setLocalParam(param)
        }
    }, [param])

    const onAnimationEnd = () => {
        setIsAppear(false)
    }

    return {isAppear, onAnimationEnd, localParam}
}

export default useAppear
