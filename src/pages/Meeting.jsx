import React, { useState } from 'react';
import AskerMeeting from '../components/AskerMeeting';
import HelperMeeting from '../components/HelperMeeting';

export default function Meeting() {
  /**
   *      useEffect 로 사용자 정보 불러와서
   * 1. if) asker 이면 -> AskerMeeting 호출
   * 2. if) helper 이면 -> HelperMeeting 호출
   *
   *    OR
   *
   *      이전 경로값 불러와서
   * 1. if) recipient 이면 -> AskerMeeting 호출
   * 2. if) mainhelper 이면 -> HelperMeeting 호풀
   *
   */

  const [userType, setUserType] = useState('helper');

  return <>{userType === 'asker' ? <AskerMeeting /> : <HelperMeeting />}</>;
}
