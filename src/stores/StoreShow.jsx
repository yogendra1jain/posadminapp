
import { Show, SimpleShowLayout, TextField, BooleanField } from 'react-admin';
import { AddressField } from '../global/components/AddressField';
import React from 'react';
import paymentMethods from '../global/conversion/paymentMethods';



const PaymentMethodMapper = ({record,source})=>{
    let liArray = record.paymentMethods.map((pm)=>{
       return(<span style = {{marginRight:'4px'}}>{paymentMethods(pm)},</span>) 
    })
return <div>{liArray}</div>
}

 const StoreShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <AddressField addLabel = {true} label="Address" />
            <BooleanField source="active" />
            <PaymentMethodMapper label='Payment Methods' addLabel={true} source="paymentMethods" />
            <TextField source="code" />
        </SimpleShowLayout>
    </Show>
);

export default StoreShow;