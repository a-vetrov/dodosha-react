import { useEffect } from 'react';

function useTitle(title?:string) {
    useEffect(() => {
        if (title) {
            document.title = title
        }
    }, [title])
}

export default useTitle
