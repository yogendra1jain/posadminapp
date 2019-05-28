import React from 'react';
import { NumberInput, FormDataConsumer } from 'react-admin';

class Quantity extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', flex: 1, width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>1 gram</span>
                        <NumberInput label="Pcs" source="gram" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.gram*1||0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>1/8 oz</span>
                        <NumberInput label="Pcs" source="byEight" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byEight*3.5||0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>1/4 oz</span>
                        <NumberInput label="Pcs" source="byFour" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byFour*7||0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>1/2 oz</span>
                        <NumberInput label="Pcs" source="byTwo" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byTwo*14||0} g</span>)}
                        </FormDataConsumer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>1 oz</span>
                        <NumberInput label="Pcs" source="byOne" />
                        <FormDataConsumer>
                            {({ formData, dispatch, ...rest }) => (<span>{formData.byOne*28||0} g</span>)}
                        </FormDataConsumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quantity;