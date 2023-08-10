import React, { useState, useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import SaveModal from '../SaveModal';
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
      document.getElementById('myDiv').insertBefore(audio, saveBtn)
    }
  };
  
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
    <div className='w-full bg-white px-5'>
      <div className='font-semibold text-[24px] mb-[118.62px]'>
          도움이 필요한 내용을 녹음해 주세요.
      </div>
      <div className="flex flex-col items-center justify-center gap-10 mb-[118.62px]">
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          showVisualizer={true}
        />
      </div>
      <div id='myDiv' className='flex flex-col items-center justify-center gap-10'>
        <button id='saveBtn' className='font-semibold text-[20px] bg-[#FED130] px-11 py-2 rounded-full' onClick={() => clickHelp()}>도움 요청하기</button>
      </div>

      <SaveModal
        isVisible={modalShow}
        onClose={() => setModalShow(false)} 
        usertoken={usertoken} fileBlob={t_blob}
      />
    </div>
  );
}