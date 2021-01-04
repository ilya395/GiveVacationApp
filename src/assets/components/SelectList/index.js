import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import s from './SelectList.module.scss';

const SelectList = (props) => {
    const { identificate, title, defaultValue, handleFunction, data } = props;
    const [thisValue, setThisValue] = useState(defaultValue);

    useEffect(() => {
        setThisValue(defaultValue);
    }, [defaultValue]);

    const chooseId = (event) => {
        handleFunction(+event.target.value);
        setThisValue(+event.target.value);
    }

    return (
        <>
            {/* <label htmlFor={identificate}>{title}</label> */}
            <select
                id={identificate}
                name={identificate}
                value={+thisValue}
                onChange={chooseId}
                className={cn(s['select-element'])}
            >
                {data ? data.map((item) => {
                    return (
                        <option key={item.id} value={+item.id}>{item.name}</option>
                    );
                }) : (
                    <option>Загружаем года ...</option>
                )}
            </select>
        </>
    );
}

export default SelectList;