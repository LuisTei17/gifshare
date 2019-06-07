import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import FileService from '../../services/fileService';
import VideoEditing from '../videoEditing/videoEditing';
import Modal from '@material-ui/core/Modal';
import './uploadScreen.css';
import TextField from '@material-ui/core/TextField';

class UploadScreen extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            file: false,
            path: {},
            open: false,
            link: false,
            expirationDate: new Date(),
            password: ''
        };

        this.closeModal = this.closeModal.bind(this);
        this.onDropFile = this.onDropFile.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
         
    }

    closeModal(file) {
        this.setState({open: false, file: file});
    }

    renderVideoEditing = () => {
        if (!this.state.file)
            return null;
        return <VideoEditing path={this.state.path} />
    };

    onDropFile = file => {
        const path = window.event.srcElement.result,
            regex = /^video\/\w+/,
            regexReturn = regex.exec(file.type),
            regexValue = regexReturn === null ? false : regexReturn,
            open = regexValue && regexValue[0] === file.type;

        this.setState({file: file, path: path, open: open});

    };

    handleFormChange (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async uploadFile () {
        const fileService = new FileService();

        const response = await fileService.saveFile(
                this.state.file,
                this.state.expirationDate,
                this.state.password
            ),
            data = await response.json(),
            filename = data.filename,
            link = `localhost:3000/download/${filename}`;

        this.setState({link: link});
    }

    render() {
        return (
            <div>
                <h1>UploadScreen</h1>
                <form noValidate autoComplete="off">
                    <TextField
                        label="Data de expiração"
                        type="date"
                        name="expirationDate"
                        value={this.state.expirationDate}
                        onChange={this.handleFormChange}
                        margin="normal"
                    />
                    <TextField
                        label="Senha (opcional)"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleFormChange}
                        margin="normal"
                    />
                    <DropzoneArea
                        onDrop={this.onDropFile}
                        filesLimit={1}
                        acceptedFiles={['image/gif', 'video/*']}
                        dropzoneText="Escolha seu gif/vídeo"
                        showPreviews={false}
                    />
                    <Button variant="contained" color="primary" onClick={this.uploadFile}>
                        Salvar arquivo
                    </Button>
                </form>
                <Modal className="modalVideo" open={this.state.open} onClose={this.onVideoConverted}>
                    <VideoEditing path={this.state.path} file={this.state.file} open={this.state.open} closeModal={this.closeModal}/>
                </Modal>
                <Modal className="modalLink" open={this.state.link}>
                    <div>
                        <input type="text" value={this.state.link} />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default UploadScreen;