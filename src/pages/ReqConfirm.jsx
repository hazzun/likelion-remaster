import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CancelModal from '../components/modal/CancelModal';
import RecordIcon from '../components/icons/RecordIcon';
import TwoButton from '../components/TwoButton';
import { client } from '../client';

export default function ReqConfirm() {
  const location = useLocation();
  const route = location.pathname;

  const navigate = useNavigate();

  // 백엔드에서 GET해온 voice_record_name mp3Url에 저장
  const [mp3Url, setMp3Url] = useState('');

  // 백엔드에서 GET해온 category_name category에 저장
  const [category, setCategory] = useState('');

  // 백엔드에서 GET해온 building_name buildingName에 저장
  const [buildingName, setBuildingName] = useState('');

  // 백엔드에서 GET해온 address address에 저장
  const [address, setAddress] = useState('');

  useEffect(() => {
    /* post id 를 어떻게 알지....? asker는 갖고있는게 토큰뿐인디... 
    let res = client.get(process.env.REACT_APP_BASE_URL+"웅냥냥/", {
      params: {
        
      },
    });
    console.log("===GET 결과===")
    console.log(res.data);
    // 임시로 주소 넣어둔것임
    setMp3Url(
      "https://record-upload-bucket.s3.ap-northeast-2.amazonaws.com/Christmas_Is_Coming.mp3"
    );
    setCategory();
    setBuildingName();
    setAddress();
    */
  }, []);

  // audio 재생 함수
  const [start, setStart] = useState(false);
  const audio = document.querySelector('audio');

  const clickListenBtn = () => {
    if (start) {
      setStart(false);
      audio.pause();
      audio.currentTime = 0;
    } else {
      setStart(true);
      audio.play();
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const clickCancel = () => {
    setModalShow(true);
  };

  const clickAsk = () => {
    navigate('/meeting');
  };

  return (
    <div className='h-full w-full bg-white pb-[35.04px] flex flex-col px-5'>
      <div className='font-semibold text-[24px] pt-5 pb-14'>
        작성한 내용을 확인해 주세요.
      </div>
      <div className='hidden'>
        <ReactAudioPlayer src={mp3Url} controls />
      </div>
      <div className='flex-1'>
        <div className='mb-3.5 pb-[16.93px] font-semibold text-lg text-[#797979] border-b border-[#d9d9d9]'>
          내가 요청한 도움
        </div>
        <div className='mb-3.5 bg-[#FFF9E9] w-[100px] rounded-[5px] font-semibold text-2xl px-[8px] py-[4px]'>
          {category}
        </div>
        <div className='flex mb-8 font-normal text-lg'>
          <div className='font-semibold mr-5'>위치</div>
          <div>
            {buildingName}
            <br />
            {address}
          </div>
        </div>
        <div className='flex items-center justify-center text-center bg-[#5A5A5A] rounded-2xl mb-5'>
          <button
            className='flex items-center justify-center w-full py-4 rounded-2xl bg-[#5A5A5A]'
            onClick={() => clickListenBtn()}
            id='audio'
          >
            <p className='flex items-center text-[#FFC700] text-[16px] font-medium gap-2'>
              <RecordIcon size={'medium'} />
              음성내용 듣기
            </p>
          </button>
        </div>
      </div>
      <div className=''>
        <Link to='/meeting' state={{ route }}>
          asker 미팅화면ㄱ ㄱ
        </Link>
        <p className='w-full mb-[18.96px] text-center text-[#797979] text-[12px]'>
          작성한 내용이 맞다면 버튼을 눌러 도움을 요청하세요.
        </p>
        <TwoButton
          leftClick={clickCancel}
          rightClick={clickAsk}
          leftText='도움 취소하기'
          rightText='도움 요청하기'
        />
      </div>
      <CancelModal isVisible={modalShow} onClose={() => setModalShow(false)} />
    </div>
  );
}
