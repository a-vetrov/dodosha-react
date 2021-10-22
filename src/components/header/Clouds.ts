import style from "./MainHeader.module.css";
import cloudSrc from "./cloud.svg";
import gsap from 'gsap'
import _ from "lodash";

type TimerId = ReturnType<typeof setTimeout> | undefined

const VELOCITY = 30
const CLOUD_WIDTH = 270

export default class Clouds {

    container: HTMLDivElement
    timer: TimerId

    constructor(container: HTMLDivElement) {
        this.container = container
        this.addCloud()
    }

    onCloudComplete = (cloud: HTMLImageElement) => {
        this.container.removeChild(cloud)
    }

    createAnimation = (cloud: HTMLImageElement) => gsap.to(cloud, {
        x: this.width,
        opacity: 0,
        scaleX: 0.1,
        scaleY: 0.1,
        duration: this.width / VELOCITY,
        ease: 'none',
        onComplete: this.onCloudComplete,
        onCompleteParams: [cloud]
    })

    registerNextAdd = () => {
        const gap = _.random(CLOUD_WIDTH, 3 * CLOUD_WIDTH)
        const timeout = gap / VELOCITY
        this.timer = setTimeout(this.addCloud, timeout * 1000)
    }

    addCloud = () => {
        const cloud: HTMLImageElement = document.createElement('img')
        cloud.className = style.cloud
        cloud.src = cloudSrc
        cloud.alt = ''
        this.container.appendChild(cloud)
        this.createAnimation(cloud)
        this.registerNextAdd()
    }

    get width(): number {
        return window.innerWidth
    }

    destroy = () => {
        this.container.childNodes.forEach((item) => {
            gsap.getTweensOf(item).forEach((t) => t.kill())
        })
    }
}
