import React, { useState, useEffect } from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";
var a;
const Home = () => {

    const [audio, setAudio] = useState();


    const addFile = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]))
        if (e.target.files[0]) {
            setAudio(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div>
            <input type="file" onChange={addFile} />
            <Container className="mx-auto">
                
                {
                    audio ?
                <Row>
                <Col className="text-primary bg-warning p-5 mx-auto" ><Spinner animation="grow" /></Col>
                </Row>
                :""

                }
                {
                    audio ?
                        <Row>
                            <Col>
                                <audio controls autoplay className="w-100">
                                    <source src={audio} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </Col>
                        </Row>
                        : ""
                }
            </Container>
        </div>
    );
};

export default Home;