import React from "react";
import { change } from "redux-form";
import _get from 'lodash/get';
import {
  Query,
  LinearProgress,
  SelectInput,
  FormDataConsumer,
  REDUX_FORM_NAME,
} from "react-admin";
import _filter from 'lodash/filter';
import _find from 'lodash/find';
class MetricCategoryAndUOMInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <FormDataConsumer>
                    {({formData, dispatch, ...rest}) => (
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
                                        source="metrcCategory"
                                        choices={data}
                                        optionValue="name"
                                        onChange= { (valueObj, value) => {
                                            let selectedCategory = _find(data, ['name', value])
                                            this.setState({ selectedCategory })
                                            return dispatch(change(REDUX_FORM_NAME, "metrcUom", null))
                                        }
                                        }
                                    />
                                </div>
                            );
                        }}
                    </Query>
                    )}
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, dispatch, ...rest}) => (
                        <Query
                            type="GET_LIST"
                            resource="UOM"
                            payload={{}}
                        >
                            {({ data, loading, error }) => {
                                let filteredUOM = _filter(data, uom => {
                                    return uom.quantityType == _get(this.state,'selectedCategory.quantityType','')
                                })
                                if (loading) {
                                return <LinearProgress />;
                                }
                                if (error) {
                                return <p> Unit of measure not found!</p>;
                                }
                                return (
                                <div>
                                    <SelectInput
                                        source="metrcUom"
                                        choices={filteredUOM}
                                        optionText="name"
                                        optionValue="name"
                                        {...rest}
                                    />
                                </div>
                                );
                            }}
                        </Query>
                    )}
                </FormDataConsumer>
            </div>
          )
    }
}

export default MetricCategoryAndUOMInput