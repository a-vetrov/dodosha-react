import React, { Component } from 'react';
import gsap from 'gsap'
import confetti from 'canvas-confetti'

import PuzzleItem from "./PuzzleItem";
import PuzzleStructure from "./data/PuzzleStructure";

import style from './Puzzle.module.css'
import {playSound} from "../../utils/soundUtils";
import {getAlphabetURL} from "../speaking-keyboard/utils";
import {isNotTouchable} from "../../utils/adaptive";
import Item from "./data/Item";
import {IDownEvent} from "./interfaces/IDownEvent";
import _ from "lodash";

const GRAB_SHIFT = 4
const WINDOW_SHIFT = 55
const defaultShift = {x: -GRAB_SHIFT, y: -GRAB_SHIFT}

type PuzzlePropType = {
    word: string,
    img: string,
    mp3: string,
    onComplete: () => void
}

type PuzzleStateType = {
    puzzleStructure: PuzzleStructure | null,
    currentItemIndex: number | null,
    currentItemShift: {x: number, y: number},
    enabled: boolean,

}

class Puzzle extends Component<PuzzlePropType, PuzzleStateType>{

    constructor(props: PuzzlePropType) {
        super(props);

        this.state = {
            puzzleStructure: null,
            currentItemIndex: null,
            currentItemShift: defaultShift,
            enabled: false,
        }
    }

    componentDidMount = () => {
       this.createPuzzleStructure()
        window.addEventListener('resize', this.handleWindowResize)
    }

    componentDidUpdate(prevProps: PuzzlePropType) {
        if (this.props.word !== prevProps.word) {
            this.createPuzzleStructure()
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    createPuzzleStructure = () => {
        const puzzleStructure = new PuzzleStructure(this.props.word.toUpperCase())
        puzzleStructure.list.forEach(item => item.ref = React.createRef())
        this.startAppearAnimation(puzzleStructure)
    }

    createPuzzleStructureDebounced = _.debounce(this.createPuzzleStructure, 300)

    playWordSound = () => {
        const {mp3} = this.props

        if (!mp3)
            return

        playSound({url:getAlphabetURL(mp3)})
    }

    startAppearAnimation = (puzzleStructure: PuzzleStructure) => {
        const arr = puzzleStructure.list.map(item => item.position || {top: 0})
        const top = arr[0].top
        arr.forEach(item => item.top = -1000)

        const onUpdate = () => {
            this.setState({puzzleStructure})
        }

        const onComplete = () => {
            this.setState({enabled: true})
        }

        this.playWordSound()
        gsap.to(arr, {top, onUpdate, duration: 0.5, stagger: 0.1, ease:'back.out(1.7)', onComplete})
    }

    startFinalAnimation = () => {
        const {puzzleStructure} = this.state
        if (!puzzleStructure)
            return

        this.setState({enabled: false})

        confetti({
            particleCount: 100,
            spread: 70,
        })

        const item = puzzleStructure.list[0]?.ref?.current

        if (!item) {
            return
        }

        const rect = item.getBoundingClientRect()
        const toObj = {left: (window.innerWidth - rect.width) / 2, top: (window.innerHeight - rect.height) / 2}

        gsap.to(item, {...toObj, duration:0.5, ease:'back.out(1.7)'})
        gsap.to(item, {
            y: '+500',
            rotation: 30,
            rotationY: 90,
            rotationX: 90,
            opacity: 0,
            duration: 1,
            delay: 1.5,
            ease: 'power1.in',
            onComplete: this.props.onComplete
        })
    }

    handleWindowResize = () => {
        const {puzzleStructure} = this.state

        if (puzzleStructure) {
            console.log('handleWindowResize', this)
            this.createPuzzleStructureDebounced()
            //puzzleStructure.updateDimensions()
            //this.setState({puzzleStructure})
        }
    }

    handleMouseDown = (e: IDownEvent, item: Item) => {
        const {puzzleStructure, enabled} = this.state

        if (!enabled || !puzzleStructure) {
            return
        }

        let currentItemShift
        const currentItemIndex = item.index

        if (item?.ref?.current) {
            const {x, y} = item.ref.current.getBoundingClientRect()
            currentItemShift = {x: e.clientX - x + GRAB_SHIFT, y: e.clientY - y + GRAB_SHIFT + WINDOW_SHIFT}
        } else {
            currentItemShift = defaultShift
        }

        const currentItem = puzzleStructure.getItem(currentItemIndex)
        if (!currentItem || !currentItem.position)
            return

        const {left, top} = currentItem.position
        currentItem.setPosition(left - GRAB_SHIFT, top - GRAB_SHIFT)
        puzzleStructure.setOnTop(currentItem)

        this.setState({currentItemIndex, currentItemShift, puzzleStructure})
    }

    handleMouseMove = (e: IDownEvent) => {
        const {puzzleStructure, currentItemIndex, currentItemShift} = this.state

        if (!puzzleStructure || currentItemIndex === null)
            return

        const currentItem = puzzleStructure.getItem(currentItemIndex)

        if (currentItem) {
            currentItem.setPosition(e.clientX - currentItemShift.x, e.clientY - currentItemShift.y)
            this.setState({puzzleStructure})
        }
    }

    handleTouchMove = (e: React.TouchEvent) => {
        const {puzzleStructure, currentItemIndex, currentItemShift} = this.state

        if (!puzzleStructure || currentItemIndex === null)
            return

        const currentItem = puzzleStructure.getItem(currentItemIndex)

        if (currentItem && e.targetTouches.length) {
            const {clientX, clientY} = e.targetTouches[0]
            currentItem.setPosition(clientX - currentItemShift.x, clientY - currentItemShift.y)
            this.setState({puzzleStructure})
        }
    }

    handleMouseUp = () => {
        const {currentItemIndex, puzzleStructure} = this.state

        if (!puzzleStructure || currentItemIndex === null)
            return

        const currentItem = puzzleStructure.getItem(currentItemIndex)

        if (!currentItem || !currentItem.position)
            return

        if (!this.joinToNeighbor()) {
            const {left, top} = currentItem.position
            currentItem.setPosition(left + GRAB_SHIFT, top + GRAB_SHIFT)
        }
        this.setState({currentItemIndex: null, puzzleStructure}, () => {
            if (puzzleStructure.list.length === 1) {
                this.startFinalAnimation()
            }
        })
    }

    joinToNeighbor = () => {
        const {currentItemIndex, puzzleStructure} = this.state

        if (!puzzleStructure || currentItemIndex === null)
            return

        const currentItem = puzzleStructure.getItem(currentItemIndex)

        if (!currentItem)
            return

        if (currentItem.leftItem && currentItem.closeToTheLeftItem()) {
            puzzleStructure.join(currentItem.leftItem, currentItem)
            return true
        } else if (currentItem.rightItem && currentItem.closeToTheRightItem()) {
            puzzleStructure.join(currentItem, currentItem.rightItem)
            return true
        }
        return false
    }

    getMouseEvents = () => {
        const {currentItemIndex, enabled} = this.state

        if (!enabled || currentItemIndex === null)
            return {}

        if (isNotTouchable()) {
            return {
                onMouseMove: this.handleMouseMove,
                onMouseUp: this.handleMouseUp,
            }
        } else {
            return {
                onTouchMove: this.handleTouchMove,
                onTouchEnd: this.handleMouseUp,
            }
        }
    }

    render() {
        const {puzzleStructure, currentItemIndex} = this.state
        const {img, word} = this.props
        const events = this.getMouseEvents()

        return (
            <div {...events} className={style['absolute-container']}>
                <div className={style.container}>
                    {puzzleStructure ?
                        puzzleStructure.list.map((item, index) =>
                            <PuzzleItem item={item} key={word + item.index} ref={item.ref} zIndex={index}
                                        grabbing={currentItemIndex === item.index} onMouseDown={this.handleMouseDown}
                                        img={img}
                            />)
                        : null
                    }
                </div>
            </div>
        )
    }

}

export default Puzzle;
