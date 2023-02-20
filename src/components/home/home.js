import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Container, Col, Row, Spinner, ProgressBar } from "react-bootstrap";
const Home = () => {
    const [audio, setAudio] = useState();
    const [audioName, setAudioName] = useState("")
    const [multipleName, setMultipleName] = useState()
    const [selectedItem, setSelectedItem] = useState()
    const [isplaying, setIsplaying] = useState(false)
    const [presentTime, setPresentTime] = useState()
    const [musicIndex, setMusicIndex] = useState()
    const [totalMusicItems, setTotalMusicItems] = useState()
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
        vals = [];
        for (var key in e.target.files) {
            if (e.target.files.hasOwnProperty(key)) {
                vals.push(e.target.files[key]);
            }
        }
        setMultipleName(vals)
        setAudio(URL.createObjectURL(vals[0]));
        setAudioName(vals[0].name)
        setMusicIndex(0)
        setTotalMusicItems(e.target.files.length)
        Playmusic()
    }

    const Yechlao = (a, index) => {
        setAudio(URL.createObjectURL(multipleName[index]));
        konsiChlrai.load();
        konsiChlrai.play();
        setIsplaying(true)
        setMusicIndex(index)
        setAudioName(a.name)
        totalTimeGet()
    }

    const Playmusic = () => {
        document.getElementById("audio").play()
        setIsplaying(true)
        totalTimeGet()
    }

    const Pausemusic = () => {
        document.getElementById("audio").pause()
        setIsplaying(false)
    }

    const totalTimeGet = ()=>{
        let date = new Date(null);
        date.setSeconds(Math.ceil(document.getElementById("audio").duration));
        let hhmmssFormat = date.toISOString().slice(11, 19);
        setTotaltimeinformat(hhmmssFormat)
    }

    return (
        <div>
            <input type="file" name='files[]' onChange={addFile} multiple />
            {
            audio ?
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
                        <Col className="text-warning">
                            {
                                isplaying ?
                                <Spinner animation="grow" />
                                : ""
                            }
                            </Col>
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
                                musicIndex === 0 ? 
                                <FontAwesomeIcon className="text-muted" icon={faBackward}/>  :
                            <FontAwesomeIcon onClick={()=>Yechlao(1, musicIndex-1)} icon={faBackward}/> 
                            }
                            {
                                isplaying ? <FontAwesomeIcon className="px-2" onClick={Pausemusic} icon={faPause} /> : <FontAwesomeIcon className="px-2" onClick={Playmusic} icon={faPlay} />
                            }
                            {
                                musicIndex === totalMusicItems-1 ? 
                                <FontAwesomeIcon className="text-muted" icon={faForward} />:
                            <FontAwesomeIcon  onClick={()=>Yechlao(1, musicIndex+1)} icon={faForward} />
                            }
                        </Col>
                    </Row>
                    : ""
            }
        </Container>
        : ""
            }
        </div>
    );
};
export default Home;
