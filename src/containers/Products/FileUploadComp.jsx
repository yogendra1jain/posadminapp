import React from 'react';
//!uncomment when sample csv Available
// import SampleEmployeeUpload from '../../../assets/SampleCSV/sampleEmployeeUpload.csv';
import _get from 'lodash/get';
import DropzoneArea from '../../Global/Dropzone/dropzoneArea';

export default (props) => {
    return (
        <div>
            //!uncomment when sample csv Available
            {/* <a className="font-size-14px" href={SampleEmployeeUpload}>Download Sample</a> */}
            <div>
                <div className='box-conversion-container'>
                    <section >
                        <DropzoneArea
                            name='productBulkUpload'
                            fieldName='productBulkUpload'
                            progress={_get(props, 'state.productBulkUploadFileuploadProgress')}
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
                </div>
            </div>
        </div>
    )
}