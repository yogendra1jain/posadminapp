import React from 'react';
import SampleVendorUpload from '../../assets/SampleCSV/vendorTemplate.csv';
import SampleCustomerUpload from '../../assets/SampleCSV/customerTemplate.csv';
import SampleInventoryUpload from '../../assets/SampleCSV/inventoryTemplate.csv';
import SampleProductOverrideUpload from '../../assets/SampleCSV/productOverrideTemplate.csv';
import SampleProductUpload from '../../assets/SampleCSV/productTemplate.csv';
import SampleVendorProductsUpload from '../../assets/SampleCSV/vendorProductsTemplate.csv';
import _get from 'lodash/get';
import DropzoneArea from '../Dropzone/dropzoneArea';
import _isEmpty from 'lodash/isEmpty';

export default (props) => {
    let SampleFile
    switch(props.entity) {
        case 'Vendor': 
            SampleFile = SampleVendorUpload
        break;
        case 'Product':
            SampleFile = SampleProductUpload
        break;
        case 'VendorProducts':
            SampleFile = SampleVendorProductsUpload
        break;
        case 'StoreProductOverride':
            SampleFile = SampleProductOverrideUpload
        break;
        case 'Inventory':
            SampleFile = SampleInventoryUpload
        break;
        case 'Customers':
            SampleFile = SampleCustomerUpload
        break;
    }
    return (
        <div>
            <a className="font-size-14px" href={SampleFile}>Download Sample</a>
            <div>
                <div className='box-conversion-container'>
                    <section >
                        <DropzoneArea
                            name='vendorBulkUpload'
                            fieldName='vendorBulkUpload'
                            progress={_get(props, 'state.vendorBulkUploadFileuploadProgress')}
                            onDrop={props.onDrop}
                            avialableFormat="Available File Formats: CSV"
                            accept={["text/csv"]} //"image/jpg", "image/png", "image/jpeg",
                        />
                    </section>
                    <aside>
                        <h4>File Details:</h4>
                        <ul className="font-size-14px">
                            <li key={props.file.name}>
                                {props.file.name} - {props.file.size} bytes
                            </li>
                        </ul>
                    </aside>
                    {props.showSuccess ? 
                    <aside>
                        <div>Success Lines: <span>{props.successLines}</span></div>
                        {!_isEmpty(props.errorLines) ? 
                        <ul>
                        {props.errorLines.map(error => {
                            return (
                                <li>
                                    <div>Error Line: <span>{error.line}</span></div>
                                    <div>Error Message: <span>{error.errorMessage}</span></div>
                                </li>
                            )
                        })}
                        </ul> : ''
                        }
                    </aside> : ''
                    }
                </div>
            </div>
        </div>
    )
}