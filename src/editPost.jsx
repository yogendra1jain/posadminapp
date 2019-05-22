// in src/posts.js
import React from 'react';
import { ReferenceInput,DisabledInput,SelectInput,TextInput,LongTextInput,SimpleForm,Edit } from 'react-admin';
export const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);