import React from 'react';
import cn from 'classnames';
import s from './Date.module.scss';

const DateCell = (props) => {

    const { data, name, index } = props;
    let daysCount = 31;

    if (data) {
        // console.log(`${name}: `,data, index);

        daysCount = new Date(data[0].year, data[0].monthNumber, 0).getDate(); // data[0].monthNumber + 1 === 12 ? ( new Date(data[0].year, data[0].monthNumber + 1, 1) - new Date(data[0].year, data[0].monthNumber + 1, 1) ) : ( new Date(data[0].year, data[0].monthNumber + 1, 1) - new Date(data[0].year + 1, 1, 1) );
        // console.log(daysCount, data[0].monthNumber + 1)
    }
    // console.log(data)

    return (
        <>
            <div className={cn(s.root)}>
                {
                    data !== null && typeof data !== 'undefined' ? 
                    (
                        <div 
                            className={cn(s['inner-elem'])}
                            style={
                                // data.type === 'start' ?
                                // {
                                //     right: 0,
                                //     left: `${data[0].day/30*100}%`
                                // } :
                                // {
                                //     right: `${data.day/30*100}%`,
                                //     left: 0
                                // }
                                {
                                    left: `${ (data[0].day - 1) / (daysCount - 1) * 100 }%`,
                                    right: `${ daysCount === +data[1].day ? 0 : ( ( (daysCount - 1) - (+data[1].day - 1) ) / ( daysCount - 1) * 100 ) }%`,
                                }
                            }
                        >

                        </div>
                    ) : 
                    (
                        <>
                        </>
                    )
                }
            </div>
        </>
    );
}

export default DateCell;