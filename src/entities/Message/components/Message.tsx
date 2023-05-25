import { FC } from 'react';
import { MessageType } from '../../../widgets/model/messages/messagesSlice';
import styles from './Message.module.scss';

type MessagePropsType = {
    message: MessageType;
}
export const Message: FC<MessagePropsType> = ({message}) => {
    return (
        <div className={`${styles.message} ${message.type === 'incoming' ? styles.incoming : styles.outgoing}`}>
            {message.textMessage}
        </div>
    )
}
