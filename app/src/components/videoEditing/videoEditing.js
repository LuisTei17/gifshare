import React, { Component } from 'react';
import './videoEditing.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import FileService from '../../services/fileService';

class VideoEditing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: props.path,
            file: props.file,
            closeModal: props.closeModal,
            video: {},
            selectorOne: {},
            selectorTwo: {}
        };
        this.dragElement = this.dragElement.bind(this);
        this.cropVideo = this.cropVideo.bind(this);
    }

    componentDidMount() {
        const video = document.getElementsByTagName('video')[0],
            selectorOne = document.getElementsByClassName('selectorOne')[0],
            selectorTwo = document.getElementsByClassName('selectorTwo')[0],
            progressbar = document.getElementsByClassName('progressbar')[0];
        
        progressbar.style.width = video.width + 'px';
        selectorTwo.style.left = video.width + 'px';

        selectorOne.style.left = 0 + 'px';
        
        video.removeAttribute('controls');
        video.progressLength = video.width;

        this.setState({selectorOne: selectorOne, selectorTwo, video: video})
    }

    dragElement(event) {
        const selector = event.target,
            self = this;

        event = event || window.event;
        event.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        function elementDrag(e) {
            let newSelectorPosition = e.clientX;

            e = e || window.event;
            e.preventDefault();
            if (newSelectorPosition > self.state.video.width)
                newSelectorPosition = self.state.video.width;
            if (newSelectorPosition < 0)
                newSelectorPosition = 0;

            const currentTime = ((newSelectorPosition * Math.floor(self.state.video.duration)) / self.state.video.width),
                newTime = moment.duration(currentTime, 'seconds'),
                timeData = newTime._data,
                timeStr = `${timeData.hours}:${timeData.minutes}:${timeData.seconds}`;

            self.state[selector.className].currentTime = timeStr;
            self.state.video.currentTime = currentTime;

            self.setState({selectorOne: self.state.selectorOne, selectorTwo: self.state.selectorTwo});
            
            selector.style.left = newSelectorPosition + "px";
          }
        
          function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
          }
    }

    async cropVideo () {
        const fileService = new FileService(),
            intervalOne = this.state.selectorOne.currentTime,
            intervalTwo = this.state.selectorTwo.currentTime;
        
        let intervalStart = intervalOne,
            intervalEnd = intervalTwo;

        if (intervalOne > intervalTwo) {
            intervalStart = intervalTwo;
            intervalEnd = intervalOne;
        }

        const response = await fileService.cropFile(this.state.file, intervalStart, intervalEnd),
            file = await response.blob();                
        this.state.closeModal(file);
    };

    render() {
        return (
            <div className="form">
                <div className="video-cropper">
                    <video width="320" height="240" controls>
                        <source src={this.state.path} type="video/mp4" />
                    </video>
                    <div className="progressbar">
                        <div onMouseDown={this.dragElement} className="selectorOne"><p className="label">{this.state.selectorOne.currentTime}</p></div>
                        <div onMouseDown={this.dragElement} className="selectorTwo"><p className="label">{this.state.selectorTwo.currentTime}</p></div>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.cropVideo}>
                        Cortar arquivo
                    </Button>
                </div>
            </div>
        )
    }
}

export default VideoEditing;