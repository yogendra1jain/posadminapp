import React from 'react';
import { SelectInput, NumberInput, TextInput, REDUX_FORM_NAME, withDataProvider } from 'react-admin';
import { change } from 'redux-form';
import dineroObj from '../conversion/DineroObj';
import splitDotWithInt from '../conversion/SplitDotWithInt';

class PriceInput extends React.Component {
    componentDidMount() {
        let originSource = this.props.source.split('.')[0];
        this.props.dispatch(change(REDUX_FORM_NAME, `${originSource}.currency`, 'USD'))
    }
    render() {
        let { record, source, label } = this.props;
        let priceSplit = this.props.source.split('.');
        let originSource = this.props.source.split('.')[priceSplit.length - 2];
        return (
            <React.Fragment>
                <NumberInput
                    label={label}
                    format={v => dineroObj(v).toUnit(2)}
                    parse={v => splitDotWithInt(v)}
                    source={source}
                    {...this.props}
                    
                />
                <div style={{display:'none'}}>
                    <TextInput source={`${originSource}.currency`} />

                </div>
            </React.Fragment>
        )
    }
}

export default withDataProvider(PriceInput);