import React, { Component } from 'react';
import FileService from '../../services/fileService';

class PublicDownload extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filename: props.filename,
            fileStr: ''
        };

    }

    async componentDidMount () {
        const fileService = new FileService(),
            response = await fileService.download(this.state.filename),
            data = await response.json();
    
        this.setState({fileStr: `data:image/gif;base64,${data.fileStr}`});
    }

    render() {
        return (
            <div>
                <h1>Download arquivo</h1>
                <iframe width='100%' title="download" height='100%' src={this.state.fileStr}>Baixar</iframe>
            </div>
        )
    }
}

export default PublicDownload;