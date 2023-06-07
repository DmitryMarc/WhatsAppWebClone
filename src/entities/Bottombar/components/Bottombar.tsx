import styles from './Bottombar.module.scss'
import {FC} from 'react'

type BottombarPropsType = {
    children?: React.ReactNode
}

export const Bottombar: FC<BottombarPropsType> = ({ children }) => {
    return (
        <div className={styles.bottombar}>
            {children}
        </div>
    )
}

