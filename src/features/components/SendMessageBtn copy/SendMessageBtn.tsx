import { FC } from 'react'
import sendMessage from '../../../assets/img/send.svg'
import styles from './SendMessageBtn.module.scss'

type SendMessageBtn = {
    setIsSent: (isSent: boolean) => void,
    isFilledField: boolean
}

export const SendMessageBtn:FC<SendMessageBtn> = ({setIsSent, isFilledField}) => {

    return (
        <button 
            className={styles.send} 
            onClick={() => setIsSent(true)}
            disabled={!isFilledField}
        >
            <img height={'100%'} src={sendMessage} alt="send icon" />
        </button>
    )
}