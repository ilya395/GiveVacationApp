import React from 'react';
import cn from 'classnames';
import s from './Dates.module.scss';

const Dates = (props) => {

    const data = [
        {
            id: 1,
            user_id: 1,
            vacation_end: 2,
            vacation_start: 1,
        }, 
        {
            id: 2,
            user_id: 1,
            vacation_end: 2,
            vacation_start: 1,
        }
    ]

    return (
        <>
            Dates, Dear!
            <div className={cn(s.root)}>

            </div>
        </>
    );
}

export default Dates;