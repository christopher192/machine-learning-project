import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Input, Spinner, Badge } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const Home = (props) => {
    document.title = "Video Capture";

    const [videoSource, setVideoSource] = useState(null);
    const [keywordLoading, setKeywordLoading] = useState(false);
    const [keywords, setKeywords] = useState([]);
    const [caption, setCaption] = useState(null); 
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const requests = useRef([]);
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const isUrlDisabled = file !== null;
    const isFileDisabled = url.length > 0;

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleUploadClick = () => {
        setCaption(null);
        setKeywords([]);
        setKeywordLoading(false);
        requests.current = [];

        if (file) {
            const videoURL = URL.createObjectURL(file);
            setVideoSource(videoURL);
            setKeywordLoading(true);
        } else if (url.length > 0) {
            setVideoSource(url);
            setKeywordLoading(true);
        }
    };

    const sendImageToFlask = async (imageData) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', {
                image: imageData,
            });
            if (response.caption) {
                setCaption(response.caption);
                return response.caption
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const sendCaptionsToFlask = async (captionsArray) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/keywords_extraction', {
                captions: captionsArray,
            });

            if (response.keywords) {
                setKeywordLoading(false);
                setKeywords(response.keywords);
            }
        } catch (error) {
            setKeywordLoading(false);
            console.error(error);
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
            const request = sendImageToFlask(imageData);
            requests.current.push(request);
        };

        const intervalId = setInterval(() => {
            captureFrame();
        }, 1500);

        const onEnd = () => {
            clearInterval(intervalId);
            Promise.all(requests.current).then((captionsArray) => {
               sendCaptionsToFlask(captionsArray);
            });
        };

        const onPause = () => {
            // clearInterval(intervalId);
        };

        video.addEventListener('pause', onPause);
        video.addEventListener('ended', onEnd);

        return () => {
            clearInterval(intervalId);
            video.removeEventListener('loadeddata', onLoadedData);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('ended', onEnd);
        };
    }, [videoSource]);

    useEffect(() => {
        if (file === null) {
            setKeywords([]);
        }
    }, [file]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Video Caption & Keyword Extraction" pageTitle="Home" />
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col md={8}>
                                            <Input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleFileUpload}
                                                disabled={isFileDisabled}
                                            />
                                        </Col>
                                        {/* <Col md={4}>
                                            <Input
                                                type="url"
                                                placeholder="Enter URL"
                                                value={url}
                                                onChange={handleUrlChange}
                                                disabled={isUrlDisabled}
                                            />
                                        </Col> */}
                                        <Col md={4}>
                                            <Button color="primary" onClick={handleUploadClick}>Upload</Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="d-flex flex-column justify-content-center align-items-center">
                                    <Row className="justify-content-center align-items-center">
                                        <Col md={9} className="text-center">
                                            {videoSource && file && (
                                                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                                                    <video
                                                        ref={videoRef}
                                                        src={videoSource}
                                                        controls
                                                        width="100%"
                                                        height="100%"
                                                        autoPlay
                                                    />
                                                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                                                    {caption && (<div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '10%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -10%)',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            color: 'white',
                                                            padding: '10px 20px',
                                                            borderRadius: '5px',
                                                            fontSize: '1.2rem',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                            {caption}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* {videoSource && (url.length > 0) && (
                                                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                                                    <div >
                                                        <iframe width="500" height="450" src={videoSource} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                    </div>
                                                    {caption && (<div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '10%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -10%)',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            color: 'white',
                                                            padding: '10px 20px',
                                                            borderRadius: '5px',
                                                            fontSize: '1.2rem',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                            {caption}
                                                        </div>
                                                    )}
                                                </div>
                                            )} */}
                                        </Col>
                                        <Col md={3} className="text-center">
                                            {keywordLoading ? (
                                                <Spinner color="primary" className="mt-3" />
                                            ) : (
                                                <div>
                                                    {keywords.map((keyword, index) => (
                                                        <Badge
                                                            color="primary"
                                                            key={index}
                                                            style={{ 
                                                                fontSize: '0.8rem', 
                                                                padding: '0.5rem 0.5rem',
                                                                marginRight: '4px',
                                                                marginBottom: '3px',
                                                            }}
                                                        >
                                                            {keyword}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
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
