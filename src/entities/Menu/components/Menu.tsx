import { FC, useState } from 'react'
import menuIcon from '../../../shared/assets/img/menu.svg'
import { Popup } from '../../../shared/ui/Popup/Popup'
import styles from './Menu.module.scss'

type MenuType = {
    setSelectedMenuItem: (selectedMenuItem: string) => void
}

export const Menu: FC<MenuType> = ({setSelectedMenuItem}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <button 
            className={styles.menu} 
            onClick={() => setIsOpen(!isOpen)}
            onBlur={() => setIsOpen(!isOpen)}
        >
            <img width='100%' src={menuIcon} alt='menu icon' />
            <Popup 
                list={['Выйти', 'Пункт 2', 'Пункт 3']} 
                isOpen={isOpen} 
                setSelectedMenuItem={setSelectedMenuItem} 
            />
        </button>
    )
}
