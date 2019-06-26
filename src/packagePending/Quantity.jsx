import React from 'react';
import { NumberInput, FormDataConsumer, TextInput } from 'react-admin';
import _get from 'lodash/get';

class Quantity extends React.Component {

    render() {
        return (
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span>1 gram</span>
                        <TextInput onKeyDown={(e) => this.props.pcsSelection('grams', e, this.props.rest, this.props.formData)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Scan Here" source="gram" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => {
                                return (<span>{_get(formData, 'itemPackages', []).filter(d => d.quantity == 1).reduce((acc, returnObj) => acc + (returnObj.quantity), 0) || 0} g</span>)
                            }}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1/8 oz</span>
                        <TextInput onKeyDown={(e) => this.props.pcsSelection('byEight', e, this.props.rest, this.props.formData)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Scan Here" source="byEight" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{_get(formData, 'itemPackages', []).filter(d => d.quantity == 3.5).reduce((acc, returnObj) => acc + (returnObj.quantity), 0) || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1/4 oz</span>
                        <TextInput onKeyDown={(e) => this.props.pcsSelection('byFour', e, this.props.rest, this.props.formData)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Scan Here" source="byFour" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{_get(formData, 'itemPackages', []).filter(d => d.quantity == 7).reduce((acc, returnObj) => acc + (returnObj.quantity), 0) || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1/2 oz</span>
                        <TextInput onKeyDown={(e) => this.props.pcsSelection('byTwo', e, this.props.rest, this.props.formData)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Scan Here" source="byTwo" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{_get(formData, 'itemPackages', []).filter(d => d.quantity == 14).reduce((acc, returnObj) => acc + (returnObj.quantity), 0) || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1 oz</span>
                        <TextInput onKeyDown={(e) => this.props.pcsSelection('byOne', e, this.props.rest, this.props.formData)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Scan Here" source="byOne" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{_get(formData, 'itemPackages', []).filter(d => d.quantity == 28).reduce((acc, returnObj) => acc + (returnObj.quantity), 0) || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quantity;