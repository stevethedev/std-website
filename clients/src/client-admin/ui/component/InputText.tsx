import React from "react";
import {isString} from "../../../common/types/string";
import $style from './InputText.module.css';

interface InputProps {
    label?: string;
    value?: string;
    setValue?: (value: string) => void;
    type?: 'password';
}

export const InputText: React.FC<InputProps> = ({label, value, setValue, type}) => (
    <div className={$style.input}>
        {isString(label) ? <label className={$style.inputLabel}>{label}</label> : <></>}
        <input className={$style.inputField} type={type} value={value}
               onInput={(evt) => setValue?.(evt.currentTarget.value)}/>
    </div>
);
