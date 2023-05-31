import { FC } from 'react'
import reactIcon from '../../../shared/assets/react.svg'
import { Avatar } from '../../../shared'
import styles from './Topbar.module.scss'

type LocationStyle = {
    locationStyle?: 'messages' | null,
    currentChatAvatar?: string | undefined,
    chatName?: string | undefined,
    children?: React.ReactNode,
    selectedChatId?: string | null
}

export const Topbar: FC<LocationStyle> = (props) => {
    const { locationStyle, currentChatAvatar, children, chatName, selectedChatId } = props;

    const userAvatar = selectedChatId ? <Avatar urlAvatar={currentChatAvatar} name={chatName} /> : null;
    const myAvatar = <Avatar urlAvatar={reactIcon} />;
    
    return (
        <div className={`${styles.topbar} ${locationStyle && styles.extra}`}>
            {locationStyle
                ? userAvatar
                : myAvatar
            }
            { children }
        </div>
    )
}
