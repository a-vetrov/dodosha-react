import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap'
import PuzzleItem from "./PuzzleItem";
import PuzzleStructure from "./data/PuzzleStructure";

import style from './Puzzle.module.css'

const GRAB_SHIFT = 4
const defaultShift = {x: -GRAB_SHIFT, y: -GRAB_SHIFT}

class Puzzle extends Component{

    constructor(props) {
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

    componentDidUpdate(prevProps) {
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

    startAppearAnimation = (puzzleStructure) => {
        const arr = puzzleStructure.list.map(item => item.position)
        const top = arr[0].top
        arr.forEach(item => item.top = -1000)

        const onUpdate = () => {
            this.setState({puzzleStructure})
        }

        const onComplete = () => {
            this.setState({enabled: true})
        }

        gsap.to(arr, {top, onUpdate, duration: 0.5, stagger: 0.1, ease:'back.out(1.7)', onComplete})
    }

    startFinalAnimation = () => {
        const {puzzleStructure} = this.state
        this.setState({enabled: false})

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

    handleWindowResize = (e) => {
        const {puzzleStructure} = this.state

        if (puzzleStructure) {
            if (puzzleStructure.updateDimensions()) {
                this.setState({puzzleStructure})
            }
        }
    }

    handleMouseDown = (e, item) => {
        const {puzzleStructure, enabled} = this.state

        if (!enabled) {
            return
        }

        let currentItemShift
        const currentItemIndex = item.index

        if (item?.ref?.current) {
            const {x, y} = item.ref.current.getBoundingClientRect()
            currentItemShift = {x: e.clientX - x + GRAB_SHIFT, y: e.clientY - y + GRAB_SHIFT}
        } else {
            currentItemShift = defaultShift
        }

        const currentItem = puzzleStructure.getItem(currentItemIndex)
        const {left, top} = currentItem.position
        currentItem.setPosition(left - GRAB_SHIFT, top - GRAB_SHIFT)
        puzzleStructure.setOnTop(currentItem)

        this.setState({currentItemIndex, currentItemShift, puzzleStructure})
    }

    handleMouseMove = (e) => {
        const {puzzleStructure, currentItemIndex, currentItemShift} = this.state

        const currentItem = puzzleStructure.getItem(currentItemIndex)

        if (currentItem) {
            currentItem.setPosition(e.clientX - currentItemShift.x, e.clientY - currentItemShift.y)
            this.setState({puzzleStructure})
        }
    }

    handleMouseUp = () => {
        const {currentItemIndex, puzzleStructure} = this.state

        const currentItem = puzzleStructure.getItem(currentItemIndex)

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
        const currentItem = puzzleStructure.getItem(currentItemIndex)

        if (currentItem.closeToTheLeftItem()) {
            puzzleStructure.join(currentItem.leftItem, currentItem)
            return true
        } else if (currentItem.closeToTheRightItem()) {
            puzzleStructure.join(currentItem, currentItem.rightItem)
            return true
        }
        return false
    }

    getMouseEvents = () => {
        const {currentItemIndex, enabled} = this.state

        if (enabled && currentItemIndex !== null) {
            return {
                onMouseMove: this.handleMouseMove,
                onMouseUp: this.handleMouseUp,
            }
        }
        return {}
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

Puzzle.propTypes = {
    word: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    onComplete: PropTypes.func
}

Puzzle.defaultTypes = {
    onComplete: null,
}

export default Puzzle;