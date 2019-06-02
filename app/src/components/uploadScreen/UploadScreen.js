import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import {RdxVideo, Overlay, Controls} from 'react-html5-video-editor';

class UploadScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {files: []}
    }

    onChangeHandler = files => {
        this.setState({files: files});

        console.log(files)
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
                <RdxVideo autoPlay loop muted>
                    <Overlay />
                    <Controls />
                    <source src={this.state.files[0]} type="video/mp4" />
                </RdxVideo>            
            </div>
        )
    }
}

export default UploadScreen;