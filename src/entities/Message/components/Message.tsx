import { FC } from 'react';
import styles from './Message.module.scss';
import { MessageType } from '../../../shared/types';

type MessagePropsType = {
    message: MessageType;
}
export const Message: FC<MessagePropsType> = ({ message }) => {
    return (
        <div className={`${styles.message} ${message.type === 'incoming' ? styles.incoming : styles.outgoing}`}>
            {message.textMessage}
        </div>
    )
}
