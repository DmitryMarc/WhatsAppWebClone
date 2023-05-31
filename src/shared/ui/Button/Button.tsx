import { FC } from 'react'
import styles from './Button.module.scss'

type ButtonType = {
    setIsClicked: (isClicked: boolean) => void,
    isFilledField: boolean,
    iconUrl?: string,
    alt: string
}

export const Button: FC<ButtonType> = ({setIsClicked, isFilledField, iconUrl, alt}) => {
    return (
        <button 
            className={styles.btn} 
            onClick={() => setIsClicked(true)}
            disabled={!isFilledField}
        >
            <img width='100%' src={iconUrl} alt={alt} />
        </button>
    )
}
