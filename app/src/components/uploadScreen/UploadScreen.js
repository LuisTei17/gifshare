import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import FileService from '../../services/fileService';
import VideoEditing from './videoEditing/videoEditing';

class UploadScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {file: false, path: {}}
         
    }

    renderVideoEditing = () => {
        if (!this.state.file)
            return null;
        return <VideoEditing path={this.state.path} />
    }


    onChangeHandler = files => {
        const file = files[0],
            path = window.event.srcElement.result;
        this.setState({file: file, path: path});

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
                {this.renderVideoEditing()}
                <br></br>
                <br></br>
                <br></br>
                <Button variant="contained" color="primary" onClick={this.uploadFile}>
                    Salvar arquivo
                </Button>
            </div>
        )
    }
}

export default UploadScreen;