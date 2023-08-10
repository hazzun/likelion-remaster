import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom';
import AWS from "aws-sdk"

export default function SaveModal({ isVisible, onClose, fileBlob, usertoken }) {
  
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

    const t_filename = usertoken + file.name
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
        // 백엔드에 POST
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
        className='absolute inset-y-2/4 inset-x-2/4 bg-white h-[10.125rem] w-full max-w-[19.375rem] rounded-[0.625rem]'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div>
          <p className="font-normal text-[20px] text-center py-10">저장하시겠습니까?</p>
          <div className="flex items-center justify-center">
            <button className="font-normal text-[16px] text-[#A3A5A4] px-10" onClick={() => onClose()}>재녹음</button>
            <button className="font-normal text-[16px] px-10" onClick={() => clickUpload()}>확인</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};