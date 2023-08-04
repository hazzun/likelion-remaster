import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { kakao } = window;

export default function MainHelper() {
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도

        setUserLocation(new kakao.maps.LatLng(lat, lon)); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치를 설정합니다
      alert('위치정보 수집을 동의해주세요');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: userLocation, //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      const displayMarker = (userLocation) => {
        var imageSrc = '/images/marker.png', // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(20, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          map: map,
          position: userLocation,
          image: markerImage,
        });

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(userLocation);
      };
      // 마커와 인포윈도우를 표시합니다
      displayMarker(userLocation);
    }
  }, [userLocation]);

  return (
    <>
      {!userLocation ? (
        <>
          <div className='w-full h-full flex items-center justify-center text-center'>
            현재 위치를 불러오는 중 ... <br /> (예상 소요시간 : 5초)
          </div>
        </>
      ) : (
        <>
          <div id='map' className='w-full h-full'></div>
        </>
      )}
    </>
  );
}
