import React from 'react';
import { Query, Loading, SelectInput, FormDataConsumer } from 'react-admin';

const CategoryInput = ({ record }) => (
    <div>
        <Query type="GET_LIST" resource="Level1ByRetailerId" payload={{ id: record.retailerId }}>
            {({ data, loading, error }) => {
                if (loading) { return <Loading />; }
                if (error) { return <p>ERROR</p>; }
                return (
                    <div>
                        <SelectInput source="category1" choices={data} optionText="name" optionValue="id" />
                    </div>)
            }}
        </Query>
        <FormDataConsumer>
            {({ formData, ...rest }) =>
                <Query type="GET_LIST" resource="GetChildren" payload={{ id: formData.category1 }}>
                    {({ data, loading, error }) => {
                        if (loading) { return <Loading />; }
                        if (error) { return <p>ERROR</p>; }
                        return (
                            <div>
                                <SelectInput source="category2" choices={data} optionText="name" optionValue="id" />
                            </div>)
                    }}
                </Query>
            }
        </FormDataConsumer>

        <FormDataConsumer>
            {({ formData, ...rest }) =>
                <Query type="GET_LIST" resource="GetChildren" payload={{ id: formData.category2 }}>
                    {({ data, loading, error }) => {
                        if (loading) { return <Loading />; }
                        if (error) { return <p>ERROR</p>; }
                        return (
                            <div>
                                <SelectInput source="category3" choices={data} optionText="name" optionValue="id" />
                            </div>)
                    }}
                </Query>
            }
        </FormDataConsumer>
    </div>

);

export default CategoryInput;