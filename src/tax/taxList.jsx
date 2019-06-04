import { 
   TextField, 
   Datagrid, 
   List,
   EditButton,
   ShowButton,
   FunctionField
} from 'react-admin';
import React from 'react';
import _find from 'lodash/find';
import _get from 'lodash/get';

const TaxAppliedToChoices = [
    { id: 0, name: 'Dummy Product' },
    { id: 1, name: 'Medical Cannabis' },
    { id: 2, name: 'Recreational Cannabis' },
    { id: 3, name: 'All Cannabis'},
    { id: 4, name: 'Non Cannabis'},
    { id: 5, name: 'All Products'}
  ]

const findTaxApplied = (record) => {
    let taxApplied = _find(TaxAppliedToChoices,['id', _get(record,'appliedTo',0)])
    return _get(taxApplied,'name','')
}

const TaxList = props => (
    <List  {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField label="Percentage" source="percentage" />
            <FunctionField label="Tax Applied To" render={record => findTaxApplied(record)} />
            <FunctionField label="Active" render={record => _get(record,'active', false) ? 'Yes' : 'No'} />
            <EditButton />
            <ShowButton/>
        </Datagrid>
    </List>
);

export default TaxList;
