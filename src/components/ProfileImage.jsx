import React, { useState } from 'react';

const ProfileImages = ({ size = 'medium' }) => {
  const profileImagePaths = [
    require('../assets/profileImage/profile1.png'),
    require('../assets/profileImage/profile2.png'),
    // 나머지 프로필이미지 파일 경로도 추가해주세요
  ];

  const randomIndex = Math.floor(Math.random() * profileImagePaths.length);
  const randomImagePath = profileImagePaths[randomIndex];

  return (
    <div>
      <img
        src={randomImagePath}
        alt='Random Profile'
        className={`${getSize(size)}`}
      />
    </div>
  );
};

const getSize = (size) => {
  switch (size) {
    case 'small':
      return 'w-16 h-16 rounded-full';
    case 'medium':
      return 'w-[120px] h-[120px] rounded-full';
    case 'large':
      return 'w-[216px] h-[216px] rounded-full';
  }
};

export default ProfileImages;
