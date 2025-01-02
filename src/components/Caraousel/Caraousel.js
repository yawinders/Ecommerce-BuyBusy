import React, { useEffect, useState } from 'react'
import styles from './Caraousel.module.css'


const images = [' https://picsum.photos/1920/400?random=1', ' https://picsum.photos/1920/400?random=2', ' https://picsum.photos/1920/400?random=3', ' https://picsum.photos/1920/400?random=4', ' https://picsum.photos/1920/400?random=5', ' https://picsum.photos/1920/400?random=6', ' https://picsum.photos/1920/400?random=7', ' https://picsum.photos/1920/400?random=8', ' https://picsum.photos/1920/400?random=9', ' https://picsum.photos/1920/400?random=10']
const Caraousel = () => {
    const [index, setIndex] = useState(0)
    const handleLeft = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
    const handleRight = () => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
    useEffect(() => {
        let timer = setInterval(() => {
            handleRight();
        }, 2000)

        return () => {
            clearInterval(timer)
        }

    }, [index])
    return (
        <div className={styles.caraousel}>
            <button className={styles.leftBtn} onClick={handleLeft} >{'<'}</button>
            <img className={styles.caraouselImages} src={images[index]} alt='caraousel-images' />
            <button className={styles.rightBtn} onClick={handleRight} >{'>'}</button>
        </div>
    )
}

export default Caraousel