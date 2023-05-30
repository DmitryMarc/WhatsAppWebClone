import { FC } from 'react'
import addContact from '../../../assets/img/add-contact.svg'
import styles from './AddContactBtn.module.scss'

type AddContactBtn = {
    setIsAdded: (isAdded: boolean) => void,
    isFilledField: boolean
}

export const AddContactBtn: FC<AddContactBtn> = ({setIsAdded, isFilledField}) => {
    return (
        <button 
            className={styles.add} 
            onClick={() => setIsAdded(true)}
            disabled={!isFilledField}
        >
            <img width='100%' src={addContact} alt='add icon' />
        </button>
    )
}
