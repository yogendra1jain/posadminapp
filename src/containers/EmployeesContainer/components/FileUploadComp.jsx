import React from 'react';
import Dropzone from 'react-dropzone';
import SampleEmployeeUpload from '../../../assets/SampleCSV/sampleEmployeeUpload.csv';
import _get from 'lodash/get';
import DropzoneArea from '../../../Global/Dropzone/dropzoneArea';


export default (props) => {
    return (
        <div>
            <a className="font-size-14px" href={SampleEmployeeUpload}>Download Sample</a>
            {/* <div className='panel-container'>
                 <span className='panel-heading'>Create Employees In Bulk </span> 
                <a href={SampleEmployeeUpload}>Download Sample</a>
            </div> */}
            <div>
                {/* <div className="row" style={{ marginBottom: '10px' }}>
                    <div className="col-sm-6">
                        <Select placeholder="Select Store" name='store' options={props.storeList} value={props.selectedStoreForAdd} onChange={(e) => props.handleChangeStore(e)} />
                    </div>
                </div> */}
                <div className='box-conversion-container'>
                    <section >
                        {/* <Dropzone
                            onDrop={props.onDrop}
                            onFileDialogCancel={props.onCancel}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="dropzone">Drop files here, or click to select files</div>
                                </div>
                            )}
                        </Dropzone> */}
                        <DropzoneArea
                            name='employeeBulkUpload'
                            fieldName='employeeBulkUpload'
                            progress={_get(props, 'state.employeeBulkUploadFileuploadProgress')}
                            onDrop={props.onDrop}
                            avialableFormat="Available File Formats: CSV"
                            accept={["text/csv"]} //"image/jpg", "image/png", "image/jpeg",

                        // dropzone={_get(props, 'state.photo.name', '') || _get(props, 'state.photolink', '')}
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