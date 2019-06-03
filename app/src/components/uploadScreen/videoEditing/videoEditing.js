import React, { Component } from 'react';
import './videoEditing.css';

const barwidth = 300;

class VideoEditing extends Component {
    constructor(props) {
        super(props);
        this.state = { path: props.path };
        this.dragElement = this.dragElement.bind(this);
    }

    componentDidMount() {
        const video = document.getElementsByTagName('video')[0],
            selectorOne = document.getElementsByClassName('selectorOne')[0],
            selectorTwo = document.getElementsByClassName('selectorTwo')[0],
            progressbar = document.getElementsByClassName('progressbar')[0],
            videoDuration = parseInt(video.duration),
            time = Math.round(video.currentTime),
            position = barwidth * (time / videoDuration);
        
        progressbar.style.width = barwidth + 'px';
        selectorTwo.style.left = (video.width  - ((parseInt(video.width) *10) /100)) + 'px';
        
        video.removeAttribute('controls');
        this.progressLength = video.width;
    }

    dragElement(event) {
        const selector = event.target;

        event = event || window.event;
        event.preventDefault();
        // get the mouse cursor position at startup:
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        function elementDrag(e) {
            let newSelectorPosition = e.clientX;

            e = e || window.event;
            e.preventDefault();
            if (newSelectorPosition > barwidth)
                newSelectorPosition = barwidth;
            // set the element's new position:
            selector.style.left = newSelectorPosition + "px";
          }
        
          function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
          }
    }

    render() {
        return (
            <div>
                <video width="320" height="240" controls>
                    <source src={this.state.path} type="video/mp4" />
                </video>
                <div className="progressbar">
                    <div className="selectorOne"></div>
                    <div onMouseDown={this.dragElement} className="selectorTwo"></div>
                </div>
            </div>
        )
    }
}

export default VideoEditing;