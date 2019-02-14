import React, {Component} from 'react';
import DropzoneArea from '../../components/common/dropzone/dropzoneArea';
import { withState } from 'recompose';
import dropzoneHandler from '../../components/common/dropzone/onDropDecorater';
import _get from 'lodash/get';

class FileUpload extends Component {
    render() {
        return (
            <div className="col-sm-4">
                <DropzoneArea
                    name='photo'
                    fieldName='photo'
                    progress={_get(this.props, 'state.photouploadProgress')}
                    onDrop={this.props.onDrop}
                    avialableFormat="Available File Formats: jpeg, png"
                    accept={["image/jpg", "image/png", "image/jpeg"]}
                    dropzone={_get(this.props, 'state.photo.name', '') || _get(this.props, 'state.photolink', '')}
                />
            </div>
        )
    }
} 

const state = withState('state', 'setState', '')
FileUpload = state(dropzoneHandler(FileUpload));

export default FileUpload;