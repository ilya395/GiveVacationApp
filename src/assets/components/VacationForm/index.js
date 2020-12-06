import React from 'react';

const VacationForm = (props) => {
    const id = props.match.params.id;
    return (
        <>
            Vacation Form {id}
        </>
    );
}

export default VacationForm;