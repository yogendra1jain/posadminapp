import React from 'react';
import { NumberInput, FormDataConsumer, TextInput } from 'react-admin';

class Quantity extends React.Component {
 
    render() {
        return (
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span>1 gram</span>
                        <NumberInput onChange={(value) => this.props.pcsSelection('grams', value,this.props.rest.dispatch)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Pcs" source="gram" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => {
                                return (<span>{formData.gram * 1 || 0} g</span>)
                            }}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1/8 oz</span>
                        <NumberInput onChange={(value) => this.props.pcsSelection('byEight', value,this.props.rest.dispatch)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Pcs" source="byEight" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byEight * 3.5 || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1/4 oz</span>
                        <NumberInput  onChange={(value) => this.props.pcsSelection('byFour', value,this.props.rest.dispatch)
                        }  style={{ marginLeft: '10px', marginRight: '10px' }} label="Pcs" source="byFour" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byFour * 7 || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1/2 oz</span>
                        <NumberInput onChange={(value) => this.props.pcsSelection('byTwo', value,this.props.rest.dispatch)
                        }  style={{ marginLeft: '10px', marginRight: '10px' }} label="Pcs" source="byTwo" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byTwo * 14 || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div>
                        <span>1 oz</span>
                        <NumberInput onChange={(value) => this.props.pcsSelection('byOne', value,this.props.rest.dispatch)
                        } style={{ marginLeft: '10px', marginRight: '10px' }} label="Pcs" source="byOne" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byOne * 28 || 0} g</span>)}
                        </FormDataConsumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quantity;