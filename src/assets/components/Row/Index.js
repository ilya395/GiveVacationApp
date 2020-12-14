import React from 'react';
import cn from 'classnames';
import s from './Row.module.scss';

import DateCell from '../Date';

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
                        // console.log(result)

                        return (
                            <div key={index} className={cn(s.col)}>
                                <DateCell data={result || null} name={name} index={+index} />
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