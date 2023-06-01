import { ChangeEvent, FC } from "react";
import styles from './InputField.module.scss';
type InputFieldProps = {
    placeholder: string,
    text: string,
    setText: (text: string) => void,
    setIsSent?: (isSent: boolean) => void,
}
export const InputField: FC<InputFieldProps> = ({placeholder, text, setText, setIsSent}) => {
    return (
        <input 
            className={styles.textField} type='text' 
            onChange={(e:ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            onKeyDown={(e) => e.code === 'Enter' && setIsSent ? setIsSent(true) : null}
            value={text}
            placeholder={placeholder}
            spellCheck="false"
        >
        </input>
    )
}
