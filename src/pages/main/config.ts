import alphabet from './images/alphabet.svg';
import paint from './images/paint.svg'
import {NAVIGATION_URL} from "../../__data__/constants";

type ConfigType = {
    title: string
    description: string
    image: string
    href: string
}

const config: Array<ConfigType> = [
    {
        title: 'Изучаем алфавит',
        description: 'Подборка игр для детей на изучение алфавита. Будет интересна и полезна малышам, которые только учатся читать.',
        image: alphabet,
        href: NAVIGATION_URL.ALPHABET
    },
    {
        title: 'Онлайн раскраски',
        description: 'Коллекция онлайн раскрасок на различные темы',
        image: paint,
        href: NAVIGATION_URL.PAINT
    }
]

export default config
