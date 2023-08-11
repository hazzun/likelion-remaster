import React, { useState, useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import SaveModal from '../SaveModal';
import { BsFillMicFill, BsFillStopFill, BsFillPlayFill } from 'react-icons/bs';
import axios from 'axios';

export default function Record() {

  // 추후 로그인 검사코드 추가 
  const [usertoken, setUsertoken] = useState('');

  useEffect(() => {
    setUsertoken('유저토큰코드');
  }, []);

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    }, (err) => console.table(err)
  );
  
  /* 녹음 후 생성되는 audio 요소 관리 */
  const [existAudio, setExistAudio] = useState(false);
  const [t_blob, setT_blob] = useState();
  const addAudioElement = (blob) => {
    const saveBtn = document.getElementById('saveBtn')
    const url = URL.createObjectURL(blob)
    setT_blob(blob)
    if(existAudio) {
      const audio = document.querySelector('audio')
      audio.src = url
      audio.controls = true
      document.getElementById('myDiv').insertBefore(audio, saveBtn)
    } else {
      const audio = document.createElement('audio')
      setExistAudio(true)
      audio.src = url
      audio.controls = true
      audio.className += "hidden"
      document.getElementById('myDiv').insertBefore(audio, saveBtn)
    }
  };

  /* 녹음 시작 멈춤 관리 */
  const [recording, setRecording] = useState(false);
  useEffect(() => {
    if(recording) {  
      recorderControls.stopRecording();
      console.log("녹음 중지")
    }
    if(!recording){
      recorderControls.startRecording();
      console.log("녹음 시작")
    }
  }, [recording]);

  const startAudio = () => {
    const audio = document.querySelector('audio');
    if(audio != null){
      audio.play();
    } else {
      alert("먼저 녹음을 진행해 주세요!")
    }
  }
  
  const [modalShow, setModalShow] = useState(false)
  const clickHelp = () => {
    if(existAudio) {
      setModalShow(true)
    }
    else {
      alert("녹음 후 도움을 요청해 주세요 :)")
    }
  }

  return (
    <div className='pt-[56px] h-screen'>
    <div className='w-full h-full flex flex-col justify-between pb-[2.125rem] bg-white px-5'>
      <div className='font-semibold text-[24px] py-5'>
          도움이 필요한 내용을 녹음해 주세요.
      </div>
      <div className="hidden">
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          showVisualizer={true}
          className="hidden"
        />
      </div>
      <div className="flex gap-5 items-center justify-center">
        <button onClick={(e) => setRecording(!recording)}
                  className='bg-[#5C5C5C] rounded-full p-5'
        >
          { !recording ? 
              <BsFillMicFill color='#FFC700' size='50'/> :
              <BsFillStopFill color='#FFC700' size='50' className='blinking'/>
          }
        </button>
        <button onClick={startAudio}
                className='bg-[#5C5C5C] rounded-full p-5'>
          <BsFillPlayFill color='#FFC700' size='50'/>
        </button>
      </div>
      <div id='myDiv' className='flex flex-col items-center justify-center gap-10'>
        <button id='saveBtn' 
                className='w-full h-[3.25rem] text-xl font-medium rounded-2xl bg-[#FFC700]' 
                onClick={() => clickHelp()}
        >
          도움 요청하기
        </button>
      </div>

      <SaveModal
        isVisible={modalShow}
        onClose={() => setModalShow(false)} 
        usertoken={usertoken} fileBlob={t_blob}
      />
    </div>
    </div>
  );
}