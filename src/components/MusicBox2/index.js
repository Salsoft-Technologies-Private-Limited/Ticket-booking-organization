import React, { useState } from "react";
import { Col, Row, Image } from "antd";

import Audiopic from "../../assets/audiopic.png";
import Waveform from "../../components/Waveform";
  const tracks = [
    {
      id: 0,
      title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
      url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
    },
    {
      id: 1,
      title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
      url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
    },
  ];
const MusicBox2 = (props) => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  return (
    <Row justify="center">
      <Col xs={24} md={4}>
        <Image
          preview={false}
          alt={"Failed to load image"}
          src={Audiopic}
          className="forimg-border sound-pic-sm"
        />
      </Col>
      <Col xs={24} md={16}>
        <div className="App">
          <Waveform url={selectedTrack.url} />
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default MusicBox2;
