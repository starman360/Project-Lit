import {Component} from "react";
import React from "react";
import App from "../App";

export class WebcamComponent extends React.Component {
    constructor(props) {
        super(props);
        this.videoTag = React.createRef()
        this.state = {
            url : "https://vision.googleapis.com/v1/images:annotate?key="
        }
    }

    componentDidMount() {
        // getting access to webcam
        navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => this.videoTag.current.srcObject = stream)
            .catch(console.log);
    }


    render() {
        return (<video id={this.props.id}
                      ref={this.videoTag}
                      width={this.props.width}
                      height={this.props.height}
                      autoPlay
                      title={this.props.title} />);
    }
}

export default WebcamComponent;
