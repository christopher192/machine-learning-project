import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Input } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const Home = (props) => {
    document.title = "Video Capture";

    const [videoSource, setVideoSource] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoSource(videoURL);
        }
    };

    const sendImageToFlask = async (imageData) => {
        try {
            const response = await axios.post('http://flask-api-url/upload', {
                image: imageData,
            });
    
            console.log('Response from Flask:', response.data);
        } catch (error) {
            console.error('Error sending image to Flask:', error);
        }
    };

    useEffect(() => {
        if (videoSource === null || !videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        video.playbackRate = 0.5;

        const onLoadedData = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };

        video.addEventListener('loadeddata', onLoadedData);

        const captureFrame = () => {
            if (video.paused || video.ended) return;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg');
            console.log(imageData);
        };

        const intervalId = setInterval(() => {
            captureFrame();
        }, 1000);

        const onPauseOrEnd = () => {
            clearInterval(intervalId);
        };

        video.addEventListener('pause', onPauseOrEnd);
        video.addEventListener('ended', onPauseOrEnd);

        return () => {
            clearInterval(intervalId);
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('pause', onPauseOrEnd);
            video.removeEventListener('ended', onPauseOrEnd);
        };
    }, [videoSource]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Video Caption & Keyword Extraction" pageTitle="Home" />
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileUpload}
                                    />
                                </CardHeader>
                                <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                    {videoSource && (
                                        <div style={{ marginTop: '20px' }}>
                                            <video
                                                ref={videoRef}
                                                src={videoSource}
                                                controls
                                                width="100%"
                                                height="100%"
                                                autoPlay
                                            />
                                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Home;
