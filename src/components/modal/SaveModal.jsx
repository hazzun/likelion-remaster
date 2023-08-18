import React from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom';
import AWS from "aws-sdk"
import { client } from '../../client';

export default function SaveModal({ isVisible, onClose, fileBlob, category, lat, long, buildingName, address}) {
  
  const navigate = useNavigate();
  
  if(!isVisible) return null;

  /* AWS 설정 객체 업데이트 */
  AWS.config.update({
    region: "ap-northeast-2", 
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_AWS_CONFIG,
    }),
  })

  const clickUpload = () => {

    const file = new File([fileBlob], "soundBlob.mp3", {
      lastModified: new Date().getTime(),
    });

    const t_filename = localStorage.getItem('jwtToken') + file.name
    console.log(file)
    console.log(file.type)

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "record-upload-bucket",
        Key: t_filename,
        Body: file,
      },
    })

    const promise = upload.promise()

    promise.then(
      function (data) {
        alert("업로드에 성공했습니다.")
        const start = new Date(new Date().getTime());
        console.log(start)
        
        /* category, lat, long, buildingName, address Record.jsx에서 받아와야 합니다 */
        /* 백엔드에 POST */
        client.post(process.env.REACT_APP_BASE_URL+"recipient/",
        {
          category_name:category,
          latitude:lat,
          longtitude:long,
          building_name:buildingName,
          address:address,
          voice_record_name:"https://record-upload-bucket.s3.ap-northeast-2.amazonaws.com/"+t_filename,
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {
          console.log(res.data)
        })
        // 이후 ReqConfirm으로 이동
        navigate("/reqconfirm");
      },
      function (err) {
        return alert("오류가 발생했습니다: ", err.message)
      }
    )

  }

  return createPortal(
    <div
      className='fixed h-full w-full inset-x-0 inset-y-0 px-8'
      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div
        className='absolute inset-y-2/4 inset-x-2/4 bg-white h-[10.125rem] w-[310px] max-w-[19.375rem] rounded-[0.625rem]'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div>
          <p className="font-medium text-[20px] text-center py-10">
            저장하시겠습니까?
          </p>
          <div className="flex items-center w-[310px] max-w-[19.375rem] h-14 bg-[#F3F3F3] place-content-around rounded-b-[0.625rem] rounded-br-[0.625rem]">
            <button className="font-semibold text-[16px] w-[50%] h-[100%] text-[#181717] rounded-b-[0.625rem]" onClick={() => onClose()}>
              재녹음
            </button>
            <button className="font-semibold text-[16px] w-[50%] h-[100%] bg-[#FED130] rounded-br-[0.625rem]" onClick={() => clickUpload()}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};