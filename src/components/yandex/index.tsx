import React, {useEffect, useRef} from 'react';

const appendYaAds = (container: HTMLDivElement): void => {
    const yaDiv = document.createElement('div')
    yaDiv.setAttribute('id', 'yandex_rtb_R-A-83936-3')
    container.appendChild(yaDiv)

    const yaScript = document.createElement('script')
    yaScript.setAttribute('type', 'text/javascript')
    yaScript.innerHTML = `
        window.yaContextCb.push(()=>{
            Ya.Context.AdvManager.render({
                "blockId": "R-A-83936-3",
                "renderTo": "yandex_rtb_R-A-83936-3"
            })
    });`

    container.appendChild(yaScript)
}

export const YandexAds = () => {

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            appendYaAds(containerRef.current)
        }
    }, [])

    return (
        <div ref={containerRef}>

        </div>
    );
};