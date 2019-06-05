import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FileService from '../../services/fileService';

class UploadScreen extends Component {
    constructor(props) {
        super(props);

        
        this.state = {fileStr: null, filename: this.props.match.params.filename}

    }

    async componentDidMount() {
        const fileService = new FileService(),
            response = await fileService.download(this.state.filename),
            data = await response.json();
        console.log(data);
        this.setState({fileStr: `data:image/gif;base64,${data.fileStr}`})
    }

    render() {

        return (
            <div>
                <h1>Download</h1>
                <a href={this.state.fileStr} download>
                    Salvar arquivo
                </a>
            </div>
        )
    }
}

export default UploadScreen;