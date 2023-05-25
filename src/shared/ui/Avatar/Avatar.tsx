import { FC } from "react";
import styles from './Avatar.module.scss';

type InputFieldProps = {
    urlAvatar: string | undefined,
    name?: string | undefined
}
export const Avatar: FC<InputFieldProps> = ({urlAvatar, name}) => {
    return (
        <>
        { urlAvatar 
            ? <img src={urlAvatar} className={styles.avatar} alt='Ava' />
            : <div className={styles.avatar}>{name?.substring(0, 1)}</div>
        }
        </>
    )
}
