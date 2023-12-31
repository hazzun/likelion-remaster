import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import BottomButton from '../BottomButton';

const { kakao } = window;

export default function Map({ click, prevData, setData }) {
  const [userLocation, setUserLocation] = useState();
  const [callLoc, setCallLoc] = useState();
  const [placeName, setPlaceName] = useState();

  /* 페이지가 처음 로드됨과 동시에 현재위치정보 가져오기 */
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude; // 위도
        let lon = position.coords.longitude; // 경도

        setUserLocation(new kakao.maps.LatLng(lat, lon)); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치를 설정
      alert('위치정보 수집을 동의해주세요');
    }
  }, []);

  /* 위치정보 가져온 뒤 도움요청자가 요청할 장소를 고르는 코드 */
  useEffect(() => {
    if (userLocation) {
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: userLocation, //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도), default = 3
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 주소-좌표 변환 객체를 생성
      const geocoder = new kakao.maps.services.Geocoder();

      /* ---------------------------------------------------------------------------- */
      /* ------------------ 가져온 위치정보를 통해 하단 팝업창 세부정보 갱신하기 ----------------- */
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(
            '사용자 위치정보를 통해 얻은 주소 = ',
            result[0].address.address_name
          );
          setCallLoc(result[0].address.address_name);
          searchPlaceByAddress(result[0].address.address_name);
        }
      };
      geocoder.coord2Address(
        userLocation.getLng(),
        userLocation.getLat(),
        callback
      );
      /* ---------------------------------------------------------------------------- */

      /* ---------------------------------------------------------------------------- */
      /* ------------------------------ 마커 초기 세팅 --------------------------------- */
      let imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소
        imageSize = new kakao.maps.Size(24, 35), // 마커이미지의 크기
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      let markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      // 마커 생성
      let marker = new kakao.maps.Marker({
        map: map,
        position: userLocation,
        image: markerImage,
        draggable: true,
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
      });

      marker.setMap(map); // 마커가 지도 위에 표시되도록 설정
      map.setCenter(userLocation); // 지도 중심좌표를 접속위치로 변경
      /* ---------------------------------------------------------------------------- */

      /* ---------------------------------------------------------------------------- */
      /* ------------------- 마커를 옮기고 내려놓은 마커의 위치와 건물명 가져오기 --------------------- */
      kakao.maps.event.addListener(marker, 'dragend', function () {
        let moveMarker = marker.getPosition();
        map.setCenter(moveMarker);

        console.log(
          '클릭한 위치의 위도는 ' + moveMarker.getLat() + ' 이고, ',
          '경도는 ' + moveMarker.getLng() + '임'
        );

        const callback = (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            console.log(
              '주소 = ',
              result[0].address.address_name + '\n장소명 = '
            );
            setCallLoc(result[0].address.address_name);
            searchPlaceByAddress(
              result[0].address.address_name,
              moveMarker.getLat(),
              moveMarker.getLng()
            );
          }
        };
        geocoder.coord2Address(
          moveMarker.getLng(),
          moveMarker.getLat(),
          callback
        );
      });
      /* ---------------------------------------------------------------------------- */
    }
  }, [userLocation]);

  // 건물명 찾기 함수
  const searchPlaceByAddress = (address, lat, lon) => {
    if (lat === undefined) lat = userLocation.getLat();
    if (lon === undefined) lon = userLocation.getLng();
    let places = new kakao.maps.services.Places();
    places.keywordSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        if (result.length > 0) {
          console.log('건물명 = ', result);
          setPlaceName(result[0].place_name);
          setData({
            ...prevData,
            latitude: lat,
            longitude: lon,
            address: address,
            building_name: result[0].place_name,
          });
        } else {
          console.log('해당 위치에 해당하는 건물명을 찾을 수 없습니다.');
        }
      }
    });
  };

  return (
    <>
      {!userLocation ? (
        <div className='w-full h-full flex flex-col items-center justify-center text-center gap-8'>
          <AiOutlineLoading3Quarters className='animate-spin text-[40px]' />
          <p className='text-md text-gray-500'>
            현재 위치를 불러오는 중 ... <br /> (예상 소요시간 : 5초)
          </p>
        </div>
      ) : (
        <div className='flex flex-col h-full'>
          <div className='py-3 px-5 font-semibold text-[24px]'>
            핀을 이동하여 도움을 요청할 장소를 골라주세요!
          </div>
          <div id='map' className='w-full h-[73%]'></div>
          <div className='z-30 flex flex-col h-[23%] justify-between absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] p-8 pl-5 pr-5 shadow-t-2xl'>
            <div className='flex items-center gap-3 font-bold text-2xl'>
              <FaMapMarkerAlt />
              {placeName}
            </div>
            <div className='text-lg'>{callLoc}</div>
            <BottomButton text={'이 위치로 도움받기'} click={click} />
          </div>
        </div>
      )}
    </>
  );
}
