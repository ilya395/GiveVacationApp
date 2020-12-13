import React from 'react';
import cn from 'classnames';
import s from './Date.module.scss';

const Date = (props) => {

    const { data, name } = props;
    // if (data) {
    //     console.log(`${name}: `,data)
    // }

    return (
        <>
            <div className={cn(s.root)}>
                {
                    data !== null ? 
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
                                    left: `${data[0].day/31*100}%`,
                                    right: `${(31 - +data[1].day)/31*100}%`,
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

export default Date;