import React from "react";
import { change } from "redux-form";
import {
  Query,
  LinearProgress,
  SelectInput,
  FormDataConsumer,
  REDUX_FORM_NAME,
} from "react-admin";

export const UOMInput = () => (
    <div>
    <Query
        type="GET_LIST"
        resource="UOM"
        payload={{}}
    >
        {({ data, loading, error }) => {
            if (loading) {
            return <LinearProgress />;
            }
            if (error) {
            return <p> Unit of measure not found!</p>;
            }
            return (
            <div>
                <SelectInput
                    source="uom"
                    choices={data}
                    optionText="name"
                    optionValue="id"
                    // onChange={value =>
                    //   dispatch(change(REDUX_FORM_NAME, "category2", null))
                    // }
                    // {...rest}
                />
            </div>
            );
        }}
    </Query>
    </div>
)

export const MetricCategoryAndUOMInput = ({ record }) => (
    <div>
        <Query
            type="GET_LIST"
            resource="MetricCategory"
            payload={{}}
        >
            {({ data, loading, error }) => {
                if (loading) {
                return <LinearProgress />;
                }
                if (error) {
                return <p> Metric category not found!</p>;
                }
                return (
                    <div>
                        <SelectInput
                            source="metricCategory"
                            choices={data}
                            optionText="name"
                            optionValue="id"
                            // onChange={UOMInput}
                        />
                    </div>
                );
            }}
        </Query>
    </div>
  )

//   export default MetricCategoryAndUOMInput