import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import BottomButton from '../components/BottomButton';

const { kakao } = window;

export default function MainHelper() {
  const [userLocation, setUserLocation] = useState();
  const [helpInfo, setHelpInfo] = useState();
  const [isInfoModal, setIsInfoModal] = useState(false);

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
        level: 10, //지도의 레벨(확대, 축소 정도), default = 3
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      /* ---------------------------------------------------------------------------- */
      /* --------------------------- 도움요청자의 정보 받아오기 ---------------------------- */
      /* ---------------------------------------------------------------------------- */
      let positions = [
        {
          title: '수원역',
          cate: ['핸드폰', '노트북', '사람살려'],
          latlng: new kakao.maps.LatLng(37.266714775928556, 127.00048478122952),
        },
        {
          title: '판교',
          cate: ['키오스크', '사람살려'],
          latlng: new kakao.maps.LatLng(37.39033774639587, 127.0905994639179),
        },
        {
          title: '인천국제공항',
          cate: ['인터넷뱅킹', '키오스크', '사람살려'],
          latlng: new kakao.maps.LatLng(37.47686451580999, 126.42996911223717),
        },
        {
          title: '야탑역',
          cate: ['핸드폰', '노트북', '인터넷뱅킹'],
          latlng: new kakao.maps.LatLng(37.4114916235998, 127.12920236033524),
        },
        {
          title: '한대앞역',
          cate: ['핸드폰', '키오스크'],
          latlng: new kakao.maps.LatLng(37.3102050791496, 126.85350336500038),
        },
        {
          title: '잠실역',
          cate: ['인터넷뱅킹', '사람살려'],
          latlng: new kakao.maps.LatLng(37.51541730466366, 127.07299456527649),
        },
        {
          title: 'test',
          cate: ['핸드폰', '노트북', '인터넷뱅킹', '키오스크', '사람살려'],
          latlng: new kakao.maps.LatLng(37.4051373046637, 126.99999456527652),
        },
      ];
      let helpImage = '/images/marker.png';
      // let helpMarker;

      for (let i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        let helpImageSize = new kakao.maps.Size(20, 40);

        // 마커 이미지를 생성합니다
        let helpMarkerImage = new kakao.maps.MarkerImage(
          helpImage,
          helpImageSize
        );

        // 마커를 생성합니다
        const helpMarker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: helpMarkerImage, // 마커 이미지
        });

        kakao.maps.event.addListener(
          helpMarker,
          'click',
          // helpInfoOpen(positions[i].title, positions[i].latlng)
          helpInfoOpen(positions[i])
        );
      }

      // 특정 마커를 클릭하면 동작하는 함수
      function helpInfoOpen(info) {
        return function () {
          console.log(info);
          setIsInfoModal((isInfoModal) => !isInfoModal);
          document.getElementById('map').style.height = '60%';
          map.setCenter(info.latlng);

          setHelpInfo(info);
        };
      }
      /* ---------------------------------------------------------------------------- */
      /* --------------------------- 도움요청자의 정보 받기완료 ---------------------------- */
      /* ---------------------------------------------------------------------------- */

      const displayMarker = (userLocation) => {
        let imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(24, 35), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(
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
        marker.setMap(map); // 마커가 지도 위에 표시되도록 설정
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
          <div className='w-full h-full flex flex-col items-center justify-center text-center gap-8'>
            <AiOutlineLoading3Quarters className='animate-spin text-[40px]' />
            <p className='text-md text-gray-500'>
              현재 위치를 불러오는 중 ... <br /> (예상 소요시간 : 5초)
            </p>
          </div>
        </>
      ) : (
        <>
          {isInfoModal ? (
            <>
              <div id='map' className='w-full rounded-b-3xl'></div>
              {helpInfo && (
                <div className='z-30 flex flex-col justify-between h-[45%] absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] pt-10 pl-5 pr-5 pb-5 shadow-t-2xl'>
                  <div className='flex items-center gap-5'>
                    <div className='w-16 h-16 rounded-full bg-gray-300'></div>
                    <div className='flex flex-col'>
                      <span className='font-bold'>user1234 님</span>
                      <span className='text-gray-500'>60대 남성</span>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex gap-2 mb-5'>
                      {helpInfo.cate.map((i) => {
                        return (
                          <span className='bg-gray-300 px-2 py-1 rounded-md'>
                            {i}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <span className='font-extrabold mr-8'>위치</span>
                      <span>{helpInfo.title}</span>
                    </div>
                    <div>
                      <span className='font-extrabold mr-8'>거리</span>
                      <span>
                        {helpInfo.latlng.La}, {helpInfo.latlng.Ma}
                      </span>
                    </div>
                    <div>
                      <span className='font-extrabold mr-8'>시간</span>
                      <span>구현해야함</span>
                    </div>
                    <button className='flex items-center justify-center w-[50%] h-[45px] mt-4 rounded-2xl bg-[#D9D9D9]'>
                      <p className='flex items-center text-[20px] font-medium'>
                        <BiMicrophone />
                        음성내용 듣기
                      </p>
                    </button>
                  </div>

                  <BottomButton text={'도움 수락하기'} />
                </div>
              )}
            </>
          ) : (
            <>
              <div id='map' className='w-full h-full'></div>
            </>
          )}
        </>
      )}
    </>
  );
}
