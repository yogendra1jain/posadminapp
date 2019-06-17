import React from 'react';

export const CreateTitle = (props) => {
    return <span>Create {props.name}</span>
}

export const EditTitle = (props) => {
    const {record, source} = props
    return <span>Edit {record[source]}</span>
}
