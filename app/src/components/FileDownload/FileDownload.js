import React, { Component } from 'react';
import FileService from '../../services/fileService';
import PrivateDownload from '../PrivateDownload/PrivateDownload';
import PublicDownload from '../PublicDownload/PublicDownload';

class FileDownload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileStr: null,
            filename: this.props.match.params.filename,
            private: false
        }
    }

    async componentDidMount() {
        const fileService = new FileService(),
            response = await fileService.checkPrivacy(this.state.filename),
            data = await response.json();

        this.setState({private: data.private});
    }

    render() {
        if (this.state.private)
            return (<PrivateDownload filename={this.state.filename} />);
        return (<PublicDownload filename={this.state.filename} />);
    }
}

export default FileDownload;