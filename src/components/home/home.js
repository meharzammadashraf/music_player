import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Spinner, Button, ProgressBar } from "react-bootstrap";

const Home = () => {

    const [audio, setAudio] = useState();
    const [audioName, setAudioName] = useState("")
    const [multipleName, setMultipleName] = useState()
    const [selectedItem, setSelectedItem] = useState()
    const [isplaying, setIsplaying] = useState(false)
    const [presentTime, setPresentTime] = useState()
    const [totalTime, setTotalTime] = useState()
    const [totalTimeinformat, setTotaltimeinformat] = useState()
    const [progress, setProgress] = useState()
    var vals;

    
    var konsiChlrai = document.getElementById("audio")

        const timeUpdate = ()=>{
        setProgress(konsiChlrai.currentTime / konsiChlrai.duration * 100)
        Duration()

}
const Duration = ()=>{
    let date = new Date(null);
        date.setSeconds(Math.ceil(document.getElementById("audio").currentTime));
        let hhmmssFormat = date.toISOString().slice(11, 19);
        setPresentTime(hhmmssFormat)
}

    const addFile = (e) => {
        console.log("e.target.files[0]~~~~~~~~~~~~~~~~~~~~~~~~~~", e.target.files[0]);
        vals = [];
        for (var key in e.target.files) {
            if (e.target.files.hasOwnProperty(key)) {
                vals.push(e.target.files[key]);
            }
        }
        setMultipleName(vals)
        setAudio(URL.createObjectURL(vals[0]));
        setAudioName(vals[0].name)

    };
    const Yechlao = (a, index) => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~a", index);
        // setAudio(URL.createObjectURL(a));
        setAudio(URL.createObjectURL(multipleName[index]));
        konsiChlrai.pause();
        konsiChlrai.load();
        konsiChlrai.play();
        setIsplaying(true)
        setAudioName(a.name)
        totalTimeGet()
        console.log();
    }
    const Playmusic = () => {
        document.getElementById("audio").play()
        setIsplaying(true)
        console.log("bbbbbbbbbbbbbbbb", document.getElementById("audio").currentTime)
        console.log("vvvvvvvvvvvvvvvv", document.getElementById("audio").duration);

        // setTotalTime(Math.ceil(document.getElementById("audio").duration))
        totalTimeGet()
        

    }
    const Pausemusic = () => {
        document.getElementById("audio").pause()
        setIsplaying(false)
    }
    const totalTimeGet = ()=>{
        // console.log('a aa gya',a);
        let date = new Date(null);
        console.log("zammad", document.getElementById("audio").duration);
        date.setSeconds(Math.ceil(document.getElementById("audio").duration));
        let hhmmssFormat = date.toISOString().slice(11, 19);
        setTotaltimeinformat(hhmmssFormat)
        console.log("jagkjfkjaf", hhmmssFormat);
    }



    return (
        <div>
            <input type="file" name='files[]' onChange={addFile} multiple />
            <Container className="mx-auto square border border-warning">
                {
                    audio ? <Row className="text-center square border-bottom border-warning"><Col><p>{audioName}</p></Col></Row> : ""
                }
                {
                    audio ?
                        <Row style={{ height: "70vh" }}>
                            <Col lg={3} md={4} sm={4} xs={6} className="text-center text-light bg-warning mx-auto" >
                                {multipleName ? 
                                multipleName.map((e, index) => {
                                     return (
                                     <p onClick={() => Yechlao(e, index)} key={index}>{e.name.slice(0, 25)}</p>
                                     ) }) : 
                                     ""}
                                     </Col>
                            <Col className="text-warning"><Spinner animation="grow" /></Col>
                        </Row>
                        : ""

                }
                {
                    audio ?
                        <Row>
                            <Col>
                                <audio onTimeUpdate={timeUpdate} id="audio" className="w-100 outline-none">
                                    <source src={audio} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                {presentTime}/{totalTimeinformat}
                                <ProgressBar now={progress} />

                                
                                {
                                    isplaying ? <FontAwesomeIcon onClick={Pausemusic} icon={faPause} /> : <FontAwesomeIcon onClick={Playmusic} icon={faPlay} />
                                }

                            </Col>
                        </Row>
                        : ""
                }
            </Container>
        </div>
    );
};

export default Home;