import React, { useState } from 'react';
import style from './Select.module.css'
import { useAppDispatch } from '../../firebase-config/store';
import { createNode } from '../../features/flowSlice';

interface Option {
    id: number;
    label: string;
    checked: boolean;
}


export const MySelectField: React.FC= ( ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch()
    const [options, setOptions] = useState<Option[]>([
        { id: 1, label: 'Option 1', checked: false},
        { id: 2, label: 'Option 2', checked: false },
        { id: 3, label: 'Option 3', checked: false },
        { id: 4, label: 'Option 4', checked: false },
        { id: 5, label: 'Option 5', checked: false },
        { id: 6, label: 'Option 6', checked: false },
    ]);

    const handleCheckboxChange = (optionId: number, optionChecked: boolean) => {
        setOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.id === optionId ? { ...option, checked: !option.checked } : option
            )
        );
        if(optionChecked) {
            dispatch(createNode(optionId))
        }
    };

    return (
        <div className={style.dropdown_container}>
            <div
                className={`${style.dropdown_text} ${isModalOpen ? 'active' : ''}`}
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                Виберіть значення
            </div>
            {isModalOpen && (
                <div className={style.modal}>
                    {options.map((option) => (
                        <label key={option.id}>
                            <input
                                type="checkbox"
                                checked={option.checked}
                                onChange={() => handleCheckboxChange(option.id, !option.checked)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};