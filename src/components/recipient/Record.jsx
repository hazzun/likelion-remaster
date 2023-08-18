import React, { useState, useEffect } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import SaveModal from '../modal/SaveModal';
import { BsFillMicFill, BsFillStopFill } from 'react-icons/bs';

import { auth, client, login } from '../../client';

export default function Record(prevData) {
  /* category 는 Title.jsx에서 넘어온 값을 Map으로 그리고 */
  /* category, lat, long, buildingName, address Map.jsx에서 받아와야 합니다 */

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );

  /* 녹음 후 생성되는 audio 요소 관리 */
  const [existAudio, setExistAudio] = useState(false);
  const [t_blob, setT_blob] = useState();
  const addAudioElement = (blob) => {
    const saveBtn = document.getElementById('saveBtn');
    const url = URL.createObjectURL(blob);
    setT_blob(blob);
    if (existAudio) {
      const audio = document.querySelector('audio');
      audio.src = url;
      audio.controls = true;
      document.getElementById('myDiv').insertBefore(audio, saveBtn);
    } else {
      const audio = document.createElement('audio');
      setExistAudio(true);
      audio.src = url;
      audio.controls = true;
      audio.className += 'hidden';
      document.getElementById('myDiv').insertBefore(audio, saveBtn);
    }
  };

  /* 녹음 시작 멈춤 관리 */
  const [recording, setRecording] = useState(false);
  useEffect(() => {
    if (!recording) {
      recorderControls.stopRecording();
      console.log('녹음 중지');
    } else {
      recorderControls.startRecording();
      console.log('녹음 시작');
    }
  }, [recording]);

  /* 재생 시작 멈춤 관리 */
  const [start, setStart] = useState(false);
  const clickListenBtn = () => {
    const audio = document.querySelector('audio');
    console.log('audio? ', audio);
    if (audio != null) {
      if (start) {
        setStart(false);
        audio.pause();
        audio.currentTime = 0;
        console.log('재생 멈춤');
      } else {
        setStart(true);
        audio.loop = true;
        audio.play();
        console.log('재생 시작');
      }
    } else {
      alert('녹음된 내용이 없습니다!');
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const clickHelp = () => {
    if (existAudio) {
      // const loginData = {
      //   username: 'mihyunasker',
      //   password: 'algus1234!',
      // };
      // auth
      //   .post('/accounts/login/', loginData)
      //   .then((response) => {
      //     console.log(
      //       `${loginData.username} 으로 로그인 성공!\n 발급된 토큰 값 -> `,
      //       response.data.access_token
      //     );
      //     localStorage.setItem('jwtToken', response.data.access_token);
      //   })
      //   .catch((error) => console.log('err : ', error));
      setModalShow(true);
    } else {
      alert('녹음 후 도움을 요청해 주세요 :)');
    }
  };

  return (
    <div className='w-full h-full flex flex-col justify-between pb-[2.125rem] bg-white px-5'>
      <div className='font-semibold text-[24px] py-5'>
        도움이 필요한 내용을 녹음해 주세요.
      </div>
      <div className='hidden'>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          showVisualizer={true}
          className='hidden'
        />
      </div>
      <div className='flex gap-5 items-center justify-center'>
        <div
          id='side-round'
          className='rounded-full bg-transparent border-[#FFC700] w-[185px] h-[185px] border-4'
        >
          <button
            onClick={(e) => setRecording(!recording)}
            className='bg-[#5C5C5C] rounded-full p-14 ml-2 mt-2'
          >
            {!recording ? (
              <BsFillMicFill color='#FFC700' size='50' />
            ) : (
              <BsFillStopFill color='#FFC700' size='50' className='blinking' />
            )}
          </button>
        </div>
      </div>
      <div
        id='myDiv'
        className='flex flex-col items-center justify-center gap-5 mt-5'
      >
        <button
          className='w-full h-[3.25rem] text-xl font-medium rounded-2xl bg-[#5C5C5C] text-[#FFC700]'
          onClick={() => clickListenBtn()}
        >
          녹음된 내용 확인하기
        </button>
        <button
          id='saveBtn'
          className='w-full h-[3.25rem] text-xl font-medium rounded-2xl bg-[#FFC700]'
          onClick={() => clickHelp()}
        >
          도움 요청하기
        </button>
      </div>

      <SaveModal
        isVisible={modalShow}
        onClose={() => setModalShow(false)}
        fileBlob={t_blob}
        prevData={prevData}
      />
    </div>
  );
}
