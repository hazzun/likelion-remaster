import React from 'react';
import { createPortal } from 'react-dom';
import AWS from 'aws-sdk';
import styled from 'styled-components';

const ModalBg = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #8b8b8b;
`;

const ModalBox = styled.div`
  width: 25rem;
  background-color: white;
`;

export default function SaveModal({ isVisible, onClose, fileBlob, usertoken }) {
  if (!isVisible) return null;

  /* AWS 설정 객체 업데이트 */
  AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_AWS_CONFIG,
    }),
  });

  const clickUpload = () => {
    const file = new File([fileBlob], 'soundBlob.mp3', {
      lastModified: new Date().getTime(),
    });

    const t_filename = usertoken + file.name;
    console.log(file);
    console.log(file.type);

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'record-upload-bucket',
        Key: t_filename,
        Body: file,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert('업로드에 성공했습니다.');
        // 백엔드에 usertoken으로 해당하는 유저에게 t_filename 값과 위도경도값 전달해줘야 함
        // 이후 요청 입력된 화면으로 이동 /
        onClose();
      },
      function (err) {
        return alert('오류가 발생했습니다: ', err.message);
      }
    );
  };

  return createPortal(
    <ModalBg>
      <ModalBox>
        <div>저장하시겠습니까?</div>
        <div>
          <button onClick={() => onClose()}>재녹음</button>
          <button onClick={() => clickUpload()}>확인</button>
        </div>
      </ModalBox>
    </ModalBg>,
    document.getElementById('modal')
  );
}
