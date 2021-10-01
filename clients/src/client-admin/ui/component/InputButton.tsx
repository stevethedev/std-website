import React from "react";
import $style from './InputButton.module.css';

interface InputButtonProps {
    onClick?: React.HTMLProps<HTMLButtonElement>['onClick'];
    label?: string;
}

export const InputButton: React.FC<InputButtonProps> = ({ onClick , label }) => (
    <button className={$style.inputButton} onClick={onClick}>{label}</button>
)