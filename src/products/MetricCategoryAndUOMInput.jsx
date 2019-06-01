import React from "react";
import { change } from "redux-form";
import _get from 'lodash/get';
import {
    Query,
    LinearProgress,
    SelectInput,
    NumberInput,
    TextInput,
    FormDataConsumer,
    REDUX_FORM_NAME,
    required
} from "react-admin";
import Typography from '@material-ui/core/Typography';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty'
class MetricCategoryAndUOMInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: []
        }
    }

    getVolumeUOM = (metrcUOM) => {
        return metrcUOM && _filter(metrcUOM, uom => {
            return _get(uom,'quantityType','') == 'VolumeBased'
        })
    }

    getWeightUOM = (metrcUOM) => {
        return  metrcUOM && _filter(metrcUOM, uom => {
            return _get(uom,'quantityType','') == 'WeightBased'
        })
    }

    render() {
        console.log(this.props.record, 'fydydgdudydfhy')
        const {selectedCategory} = this.state
        return (
            <div>
                <div>
                    <Query
                        type="GET_LIST"
                        resource="MetrcItemTypes"
                        payload={{}}
                    >
                        {({ data, loading, error }) => {
                            if (loading) {
                                return <LinearProgress />;
                            }
                            if (error) {
                                return <Typography>No Category Found</Typography>
                            }
                            return (
                                <div>
                                    <SelectInput
                                        label="Metrc Item Types"
                                        source="metrcItemType"
                                        choices={data}
                                        optionValue="name"
                                    />
                                </div>
                            );
                        }}
                    </Query>
                </div>
                <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => (
                        formData.metrcItemType &&
                        <Query
                            type="GET_LIST"
                            resource="MetrcCategory"
                            payload={{ id: _get(formData, 'metrcItemType', '') }}
                        >
                            {({ data, loading, error }) => {
                                if (loading) {
                                    return <LinearProgress />;
                                }
                                if (error) {
                                    return <Typography>No Category Found</Typography>
                                }
                                return (
                                    <div>
                                        <SelectInput
                                            label="Metrc Category"
                                            source="metrcCategory"
                                            choices={data}
                                            optionValue="name"
                                            onChange={(valueObj, value) => {
                                                    let selectedCategory = _find(data, ['name', value])
                                                    this.setState({ selectedCategory })
                                                    return dispatch(change(REDUX_FORM_NAME, "unitWeight", null))
                                                    dispatch(change(REDUX_FORM_NAME, "unitVolume", null))
                                                    dispatch(change(REDUX_FORM_NAME, "unitVolumeUnitOfMeasure", null))
                                                    dispatch(change(REDUX_FORM_NAME, "unitWeightUnitOfMeasure", null))
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
                    {({ formData, dispatch, ...rest }) => (
                        formData.metrcCategory &&
                        <Query
                            type="GET_LIST"
                            resource="UOM"
                            payload={{}}
                        >
                            {({ data, loading, error }) => {
                                console.log(formData, 'formData')
                                let filteredUOM = _filter(data, uom => {
                                    return uom.quantityType == _get(this.state, 'selectedCategory.quantityType', '')
                                })
                                if (loading) {
                                    return <LinearProgress />;
                                }
                                if (error) {
                                    return <Typography>No Category Found</Typography>
                                }
                                return (
                                    <div>
                                        {!_isEmpty(filteredUOM) ? <SelectInput
                                                label="Metrc UOM"
                                                source="metrcUom"
                                                choices={filteredUOM}
                                                optionValue="name"
                                                {...rest}
                                            /> : <SelectInput
                                                    label="Metrc UOM"
                                                    source="metrcUom"
                                                    optionValue="name"
                                                    choices={data}
                                                    optionValue="name"
                                                    {...rest}
                                            />}
                                        {_get(selectedCategory,'requiresUnitVolume', false) || _get(formData, 'unitVolume', false) ?
                                        <div>
                                            <NumberInput validate={_get(selectedCategory,'requiresUnitVolume',false) && required()} label="Unit Volume" source="unitVolume" /> 
                                            <SelectInput 
                                                label="Volume UOM"
                                                source="unitVolumeUnitOfMeasure" 
                                                optionValue="name"
                                                choices={this.getVolumeUOM(data)} 
                                                validate={_get(selectedCategory,'requiresUnitVolume',false) && required()}
                                            /> 
                                        </div> : ''}
                                        {_get(selectedCategory,'requiresUnitWeight',false) ||_get(formData, 'unitWeight', false) ?
                                        <div>
                                             <NumberInput validate={_get(selectedCategory,'requiresUnitWeight',false) && required()} label="Unit Weight" source="unitWeight" />
                                            <SelectInput 
                                                label="Weight UOM"
                                                source="unitWeightUnitOfMeasure" 
                                                optionValue="name"
                                                choices={this.getWeightUOM(data)} 
                                                validate={_get(selectedCategory,'requiresUnitWeight',false) && required()}
                                            />
                                        </div> : ''}
                                    </div>
                                );
                            }}
                        </Query>
                    )}
                </FormDataConsumer>
                <NumberInput label="Unit CBD Percent" source="unitCbdPercent" />
                <NumberInput label="Unit CBD Content" source="unitCbdContent" />
                <TextInput source="unitCbdContentUnitOfMeasure"
                label="Unit CBD UOM" />
                <NumberInput label="Unit THC Percent" source="unitThcPercent" />
                <NumberInput label="Unit THC Content" source="unitThcContent" />
                <TextInput source="unitThcContentUnitOfMeasure" label="Unit THC UOM" />
            </div>
        )
    }
}

export default MetricCategoryAndUOMInput