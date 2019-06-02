import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import FileService from '../../services/fileService';

class UploadScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {file: {}}
    }

    onChangeHandler = files => {
        this.setState({file: files[0]});

    }

    uploadFile = () => {
        const fileService = new FileService();

        fileService.saveFile(this.state.file)
    }

    render() {

        return (
            <div>
                <h1>UploadScreen</h1>
                <DropzoneArea 
                    onChange={this.onChangeHandler}
                    filesLimit={1}
                    acceptedFiles={['image/gif', 'video/*']}
                    dropzoneText="Escolha seu gif/vídeo"
                    showPreviews={false}
                />
                <Button variant="contained" color="primary" onClick={this.uploadFile}>
                    Salvar arquivo
                </Button>
            </div>
        )
    }
}

export default UploadScreen;