import React, { useState, useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import SaveModal from "../components/SaveModal";
import axios from 'axios';

export default function Record() {

  const [t_blob, setT_blob] = useState();
  const [usertoken, setUsertoken] = useState("");

  useEffect(()=> {
    setUsertoken("유저토큰코드");
  })

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    console.log(blob);
    setT_blob(blob);
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
      <div>도움이 필요한 내용을 녹음해주세요.</div>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        // downloadOnSavePress={true}
        // downloadFileExtension="mp3"
        showVisualizer={true}
      />
      <br />
      {/* <button onClick={recorderControls.stopRecording}>Stop recording</button> */}
      <button onClick={()=>setModalShow(true)}>저장</button>

      <SaveModal isVisible={modalShow} onClose={()=>setModalShow(false)} usertoken={usertoken} fileBlob={t_blob}/>
      <br />
    </div>
  );
}