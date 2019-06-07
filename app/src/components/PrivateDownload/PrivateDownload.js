import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FileService from '../../services/fileService';

class PrivateDownload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filename: props.filename,
            fileStr: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.download = this.download.bind(this);
         
    }

    handleChange(event) {
        this.setState({password: event.target.value});
    }

    async download() {
        const fileService = new FileService(),
            response = await fileService.download(this.state.filename, this.state.password),
            data = await response.json();
    
        this.setState({fileStr: `data:image/gif;base64,${data.fileStr}`});
    }

    render() {
        return (
            <div>
                <h1>UploadScreen</h1>
                <form noValidate autoComplete="off">
                    <TextField
                        label="Senha"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    
                    <Button variant="contained" color="primary" onClick={this.download}>
                        Baixar arquivo
                    </Button>
                </form>
                <iframe width='100%' title="download" height='100%' src={this.state.fileStr}>Baixar</iframe>

            </div>
        )
    }
}

export default PrivateDownload;