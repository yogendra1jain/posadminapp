import React from 'react';
import { Query, Loading,SelectInput } from 'react-admin';

const CategoryInput = ({ record }) => (
    <Query type="GET_LIST" resource="Level1ByRetailerId" payload={{ id: record.retailerId }}>
        {({ data, loading, error }) => {
            if (loading) { return <Loading />; }
            if (error) { return <p>ERROR</p>; }
            return(
            <div>
            <SelectInput source="category1" choices={data} optionText="name" optionValue="id" />
            {/* <Query type="GET_LIST" resource="GetChildren" payload={{ id: record['category1'] }}>
                {result2 => 
                    result2.loading ? <Loading />
                    : result2.error ? <Error />:
                     <div>
            <SelectInput source="category2" choices={result2} optionText="name" optionValue="id" />
            
            </div>
                }
            </Query> */}
            </div>)
        }}
    </Query>    
);

export default CategoryInput;