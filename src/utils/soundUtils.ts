import {Howl} from 'howler';

export const playSound = ({url, onEnd}: {url: string, onEnd?: () => any}) => {
    const sound = new Howl({
        src: [url],
        onend: onEnd,
    })
    return sound.play()
}

export const playSoundSequence = (urls: string[]) => {
    let index = 0

    const onEnd = () => {
        index++
        if (sounds[index])
            sounds[index].play()
    }

    const stopCurrentSound = () => {
        if (sounds[index])
            sounds[index].stop()
    }

    const sounds = urls.map(url => new Howl({
        src: [url],
        onend: onEnd,
    }))

    sounds[index].play()

    return stopCurrentSound
}
