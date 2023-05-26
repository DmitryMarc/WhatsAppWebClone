import { FC } from "react"

import styles from './Popup.module.scss'

type PopupProps = {
    list: string[],
    isOpen: boolean,
    setSelectedMenuItem: (selectedMenuItem: string) => void
}

export const Popup: FC<PopupProps> = ({list, isOpen, setSelectedMenuItem}) => {
    return (
        <div className={styles.popup}>
            {isOpen &&
                <ul className={styles.list}>
                    {list.map(item => <li key={item} className={styles.item} onClick={() => setSelectedMenuItem(item)}>{item}</li>)}
                </ul>
            }
        </div>
    )
}
