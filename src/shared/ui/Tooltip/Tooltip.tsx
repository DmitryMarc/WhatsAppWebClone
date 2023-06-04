import { FC, ReactNode } from 'react'
import { Status } from '../../../widgets/model/chats/chatsSlice'
import styles from './Tooltip.module.scss'

type TooltipType = {
    children: ReactNode,
    data: {
        status: Status,
        error: string | undefined
    }
}

export const Tooltip: FC<TooltipType> = ({ children, data }) => {
    return (
        <div className={styles.tooltip}>
            {children}
            {data.status === Status.ERROR &&
                <span className={styles.content}>
                    {data.error}
                </span>
            }
        </div>
    )
}

