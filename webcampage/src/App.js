import React, { Component } from 'react';
import './App.css';
import Camera from 'react-camera';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
        this.getResponse = this.getResponse.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        //setInterval(this.takePicture, 3000);
        this.state = {
            url : "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZyRx-Nv-pimpzKJlrse4ik-qblG9Mgxc",
            arrayOfElems : ''
        }
    }

    takePicture() {
        this.camera.capture()
            .then(blob => {
                this.img.src = URL.createObjectURL(blob);
                this.img.onload = () => { URL.revokeObjectURL(this.src); };
                this.getBase64Image(this.img.src).then(blob => {
                    this.sendRequest(blob);
                });



            })
    }

    getBase64Image(url) {

        var promise = new Promise(function(resolve, reject) {

            var img = new Image();
            // To prevent: "Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported."
            img.crossOrigin = "Anonymous";
            img.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/png");
                resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg|pdf);base64,/, ""));
            };
            img.src = url;
        });

        return promise;
    };


    sendRequest(url) {
        var request = {
            "requests": [
                {
                    "features": [
                        {
                            "type": "TEXT_DETECTION"
                        }
                    ],
                    "image": {
                        "content" : url
                    }
                }
            ]
        };

        var arrayOfElements = [];

        const {labelAnnotations} =  fetch(this.state.url, {
            method: 'POST',
            body: JSON.stringify(request)
        }).then(blob => {
            blob.json().then(function(data) {
                console.log(data);
                var i;
                for(i=1; i<data.responses[0].textAnnotations.length; i++){
                    console.log(data.responses[0].textAnnotations[i]);
                    var style = "top: " + data.responses[0].textAnnotations[i].boundingPoly.vertices[0].y + "; left: " +
                    data.responses[0].textAnnotations[i].boundingPoly.vertices[1].x + "; background-color: black; z-index: 2;"
                    + "height: 20px; width: 20px;";
                    var element = (<div style={style}> {data.responses[0].textAnnotations[i].description}</div>);
                    arrayOfElements.push(element);
                }
            })
        });

        console.log(arrayOfElements);
        this.setState({
            arrayOfElems : arrayOfElements
        });

    }

    getResponse(response){
        console.log(response);
    }

    render() {
        return (
            <div style={style.container}>
                <div>
                    {this.state.arrayOfElems}
                </div>
                <Camera
                    style={style.preview}
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                >
                    <div style={style.captureContainer} onClick={this.takePicture}>
                        <div style={style.captureButton} />
                    </div>
                </Camera>
                <img id = "imageid"
                    style={style.captureImage}
                    ref={(img) => {
                        this.img = img;
                    }}
                />
            </div>
        );
    }
}

const style = {
    preview: {
        position: 'relative',
    },
    captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%'
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20
    },
    captureImage: {
        width: '100%',
    }
};

