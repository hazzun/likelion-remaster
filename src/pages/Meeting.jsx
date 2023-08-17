import React, { useState } from 'react';
import AskerMeeting from '../components/AskerMeeting';
import HelperMeeting from '../components/HelperMeeting';
import { useLocation } from 'react-router-dom';

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
   *
   * ==> 우선 Link 태그로 props 값 전달해서 해결함
   */

  const location = useLocation();
  console.log(location.state.route);
  const routeCheck = location.state.route;

  return (
    <>{routeCheck === '/mainhelper' ? <HelperMeeting /> : <AskerMeeting />}</>
  );
}
