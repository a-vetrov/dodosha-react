import style from "./MainHeader.module.css";
import cloudSrc from "./cloud.svg";
import gsap from 'gsap'

type TimerId = ReturnType<typeof setTimeout>

export default class Clouds {

    container: HTMLDivElement

    constructor(container: HTMLDivElement) {
        this.container = container
        this.addCloud()
    }

    onCloudComplete = (cloud: HTMLImageElement) => {
        this.container.removeChild(cloud)
    }

    addCloud = () => {
        const cloud: HTMLImageElement = document.createElement('img')
        cloud.className = style.cloud
        cloud.src = cloudSrc
        cloud.alt = ''
        this.container.appendChild(cloud)

        const animation = gsap.to(cloud, {
            x: '+500',
            opacity: 0,
            scaleX: 0.1,
            scaleY: 0.1,
            duration: 3,
            ease: 'power1.in',
            onComplete: this.onCloudComplete,
            onCompleteParams: [cloud]
        })

    }
}