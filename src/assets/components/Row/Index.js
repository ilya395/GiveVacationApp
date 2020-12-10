import React from 'react';
import cn from 'classnames';
import s from './Row.module.scss';

import Date from '../Date';

import { months } from '../../services/constants';

const Row = (props) => {

    const { name, id, vacations } = props;
    // console.log(vacations)

    return (
        <>
            <div className={cn(s.root)}>
                <div className={cn(s['start-col'])}>
                    {name}
                </div>
                {
                    months.map((item, index) => {
                        
                        const result = vacations.find(item => +item[0].monthNumber === +index);

                        return (
                            <div key={index} className={cn(s.col)}>
                                <Date data={result || null} name={name} />
                                {/* {`${id}_${index}`} */}
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default Row;