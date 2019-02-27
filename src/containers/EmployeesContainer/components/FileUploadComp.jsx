import React from 'react';
import Select from 'react-select';
import Dropzone from 'react-dropzone';

export default (props) => {
    return (
        <div>
            <div className='panel-container'>
                <span className='panel-heading'>Create Employees In Bulk </span>
            </div>
            <div>
                {/* <div className="row" style={{ marginBottom: '10px' }}>
                    <div className="col-sm-6">
                        <Select placeholder="Select Store" name='store' options={props.storeList} value={props.selectedStoreForAdd} onChange={(e) => props.handleChangeStore(e)} />
                    </div>
                </div> */}
                <div className='box-conversion-container'>
                    <section >
                        <Dropzone
                            onDrop={props.onDrop}
                            onFileDialogCancel={props.onCancel}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <span className="dropzone">Drop files here, or click to select files</span>
                                </div>
                            )}
                        </Dropzone>
                    </section>
                    <aside>
                        <h4>Files</h4>
                        <ul>
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