import React from 'react';
import { NumberInput, FormDataConsumer, TextInput } from 'react-admin';

class Quantity extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'space-between' }}>
                    <div>
                        <span>1 gram</span>
                        <NumberInput style={{marginLeft:'10px',marginRight:'10px'}}  label="Pcs" source="gram" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.gram*1||0} g</span>)}
                        </FormDataConsumer>
                        <TextInput style={{marginLeft:'10px',marginRight:'10px'}} source="gramLabel" label="label" />
                    </div>
                    <div>
                        <span>1/8 oz</span>
                        <NumberInput  style={{marginLeft:'10px',marginRight:'10px'}} label="Pcs" source="byEight" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byEight*3.5||0} g</span>)}
                        </FormDataConsumer>
                        <TextInput style={{marginLeft:'10px',marginRight:'10px'}} source="byEightOzLabel" label="label" />
                    </div>
                    <div>
                        <span>1/4 oz</span>
                        <NumberInput  style={{marginLeft:'10px',marginRight:'10px'}} label="Pcs" source="byFour" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byFour*7||0} g</span>)}
                        </FormDataConsumer>
                        <TextInput style={{marginLeft:'10px',marginRight:'10px'}} source="byFourOzLabel" label="label" />
                    </div>
                    <div>
                        <span>1/2 oz</span>
                        <NumberInput  style={{marginLeft:'10px',marginRight:'10px'}} label="Pcs" source="byTwo" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byTwo*14||0} g</span>)}
                        </FormDataConsumer>
                        <TextInput style={{marginLeft:'10px',marginRight:'10px'}} source="halfOzLabel" label="label" />
                    </div>
                    <div>
                        <span>1 oz</span>
                        <NumberInput  style={{marginLeft:'10px',marginRight:'10px'}} label="Pcs" source="byOne" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byOne*28||0} g</span>)}
                        </FormDataConsumer>
                        <TextInput style={{marginLeft:'10px',marginRight:'10px'}} source="byOneOzLabel" label="label" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Quantity;