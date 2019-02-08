import React, { Component, PropTypes, } from 'react';
import { reduxForm, Field } from 'redux-form';

import Dropzone from 'react-dropzone';


const renderDropzoneInput = (field) => {
  const files = field.input.value;
  
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>{files&&Array.isArray(files)?<img height={'200px'} width={'200px'} src={files[0].preview}/>:<div>Try dropping some files here, or click to select files to upload.</div>}</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

export default renderDropzoneInput;