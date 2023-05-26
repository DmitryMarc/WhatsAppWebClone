import { FC, useState } from 'react'
import menuIcon from '../../../assets/img/menu.svg'
import styles from './Menu.module.scss'
import { Popup } from '../../../shared/ui/Popup/Popup'

type MenuType = {
    setSelectedMenuItem: (selectedMenuItem: string) => void
}

export const Menu: FC<MenuType> = ({setSelectedMenuItem}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <button className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
            <img width='100%' src={menuIcon} alt='menu icon' />
            <Popup list={['Выйти', 'Пункт 2', 'Пункт 3']} isOpen={isOpen} setSelectedMenuItem={setSelectedMenuItem} />
        </button>
    )
}
