import React, { useEffect, useState } from 'react';
import BottomButton from '../components/BottomButton';
import LoadingIcon from '../components/icons/LoadingIcon';
import RecordIcon from '../components/icons/RecordIcon';
import ToggleClose from '../components/icons/ToggleClose';
import ToggleOpen from '../components/icons/ToggleOpen';
import ProfileImage from '../components/ProfileImage';
import Mypage from '../components/Mypage';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { client, login } from '../client';

const { kakao } = window;

export default function MainHelper({ mypage, closeMypage }) {
  const [userLocation, setUserLocation] = useState();
  const [helpInfo, setHelpInfo] = useState();
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [onToggle, setOnToggle] = useState(true);
  const [cateSelect, setCateSelect] = useState('전체');
  const [distance, setDistance] = useState(0);
  const [helpList, setHelpList] = useState([]);
  // const [keyValue, setKeyValue] = useState('');

  const category = [
    '전체',
    '금융',
    '문서 및 이메일 작성',
    '쇼핑',
    '인터넷',
    '기기고장',
    '영상 및 사진',
    '예약/예매',
    '기타',
  ];
  const categoryClose = ['전체', '금융', '문서 및 이메일 작성'];

  const location = useLocation();
  const route = location.pathname;
  // console.log('what = ', route);

  const loginData = {
    username: 'helpertest',
    password: '1234!@#$',
  };
  useEffect(() => {
    login
      .post('/accounts/login/', loginData)
      .then((response) => {
        console.log(
          `${loginData.username} 으로 로그인 성공!\n 발급된 토큰 값 -> `,
          response.data.access_token
        );
        localStorage.setItem('jwtToken', response.data.access_token);
      })
      .catch((error) => console.log('err : ', error));

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
    client
      .get('/mainhelper/')
      .then((res) => {
        console.log(res.data);
        setHelpList(res.data);
      })
      .catch((error) => console.log('에러입니다 : ', error));

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
          cate: '문서 및 이메일 작성',
          latlng: new kakao.maps.LatLng(37.266714775928556, 127.00048478122952),
        },
        {
          title: '판교',
          cate: '금융',
          latlng: new kakao.maps.LatLng(37.39033774639587, 127.0905994639179),
        },
        {
          title: '인천국제공항',
          cate: '쇼핑',
          latlng: new kakao.maps.LatLng(37.47686451580999, 126.42996911223717),
        },
        {
          title: '야탑역',
          cate: '인터넷',
          latlng: new kakao.maps.LatLng(37.4114916235998, 127.12920236033524),
        },
        {
          title: '한대앞역',
          cate: '기기고장',
          latlng: new kakao.maps.LatLng(37.3102050791496, 126.85350336500038),
        },
        {
          title: '잠실역',
          cate: '기타',
          latlng: new kakao.maps.LatLng(37.51541730466366, 127.07299456527649),
        },
        {
          title: '어디게?',
          cate: '핸드폰',
          latlng: new kakao.maps.LatLng(37.4051373046637, 126.99999456527652),
        },
      ];
      let helpImage = '/images/marker.png';
      // let helpMarker;

      for (let i = 0; i < helpList.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        let helpImageSize = new kakao.maps.Size(20, 40);

        let latlng = new kakao.maps.LatLng(
          helpList[i].location_latitude,
          helpList[i].location_longtitude
        );

        // 마커 이미지를 생성합니다
        let helpMarkerImage = new kakao.maps.MarkerImage(
          helpImage,
          helpImageSize
        );

        let helpMarker;
        // 마커를 생성합니다
        if (cateSelect === '전체') {
          console.log('cateSelect : ', cateSelect);
          helpMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            title: helpList[i].building_name, // 장소(건물명)
            image: helpMarkerImage, // 마커 이미지
          });
          kakao.maps.event.addListener(helpMarker, 'click', () =>
            helpInfoOpen(helpList[i])
          );
        } else if (cateSelect === helpList[i].category) {
          console.log('cateSelect : ', cateSelect);
          helpMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            title: helpList[i].building_name, // 장소(건물명)
            image: helpMarkerImage, // 마커 이미지
          });
          kakao.maps.event.addListener(helpMarker, 'click', () =>
            helpInfoOpen(helpList[i])
          );
        }
      }

      // 특정 마커를 클릭하면 동작하는 함수
      const helpInfoOpen = (info) => {
        console.log('마커클릭 넘어온 정보 : ', info);
        client
          .get(`/selecthelper/${info.id}/`)
          .then((response) => {
            console.log('selecthelper 호츌 : ', response.data);
            setHelpInfo(response.data);
          })
          .catch((error) => console.log(error));
        let latlng = new kakao.maps.LatLng(
          info.location_latitude,
          info.location_longtitude
        );

        let line = new kakao.maps.Polyline({
          path: [userLocation, latlng],
        });
        setDistance(Math.round(line.getLength()));

        setIsInfoModal(() => true);
        map.setCenter(latlng);

        // setHelpInfo(info);
      };
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

      // category select
    }
  }, [userLocation, cateSelect]);

  const selectCategory = (item) => {
    if (item !== cateSelect) setCateSelect(item);
  };
  const selectHelper = (postId) => {
    client
      .post(`/selecthelper/${postId}/`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  return (
    <div className='relative h-full flex flex-col'>
      {!userLocation ? (
        <>
          <div className='w-full h-full flex flex-col items-center justify-center text-center gap-8'>
            <LoadingIcon size='large' />
            <p className='text-md text-gray-500'>
              현재 위치를 불러오는 중 ... <br /> (예상 소요시간 : 5초)
            </p>
          </div>
        </>
      ) : (
        <>
          {onToggle ? (
            <div className='absolute p-2 bg-cate-rgba z-50 flex w-full justify-between gap-[2px]'>
              <div className='overflow-auto'>
                {categoryClose.map((item, key) =>
                  item === cateSelect ? (
                    <button
                      key={key}
                      className='bg-[#FED130] px-[10px] py-[2px] rounded-2xl text-lg m-1'
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    <button
                      key={key}
                      className='bg-white border border-[#D9D9D9] text-[18px] px-[10px] py-[2px] rounded-2xl text-lg m-1'
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => {
                  setOnToggle(false);
                }}
                className='flex pt-1 hover:cursor-default'
              >
                <ToggleOpen size={'medium'} />
              </button>
            </div>
          ) : (
            <div className='absolute p-2 bg-cate-rgba z-50 flex w-full justify-between gap-[2px]'>
              <div className='overflow-auto'>
                {category.map((item, key) =>
                  item === cateSelect ? (
                    <button
                      key={key}
                      className='bg-[#FED130] px-[10px] py-[2px] rounded-2xl text-lg m-1'
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    <button
                      key={key}
                      className='bg-white border border-[#D9D9D9] text-[18px] px-[10px] py-[2px] rounded-2xl text-lg m-1'
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => {
                  setOnToggle(true);
                }}
                className='flex pt-1 hover:cursor-default'
              >
                <ToggleClose size={'medium'} />
              </button>
            </div>
          )}

          {isInfoModal ? (
            <>
              <div id='map' className='w-full flex-1 h-[135%]'></div>
              {helpInfo && (
                <div className=' z-30 flex flex-col gap-3 justify-between bottom-0 left-0 right-0 relative bg-white rounded-t-[30px] p-5 shadow-t-2xl'>
                  <div className='flex items-center gap-5'>
                    <ProfileImage size='small' />
                    <div className='flex flex-col'>
                      <span className='font-bold'>
                        {helpInfo.asker.nickname} 님
                      </span>
                      <span className='text-gray-500'>{`${helpInfo.asker.age_range} 대 ${helpInfo.asker.gender}`}</span>
                    </div>
                    <button
                      className='absolute top-0 right-0 mt-7 mr-7 text-xl'
                      onClick={() => setIsInfoModal(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex gap-2 mb-5'>
                      <span className='bg-[#FFF9E9] px-2 py-1 rounded-md text-[16px] font-semibold'>
                        {helpInfo.post.category}
                      </span>
                    </div>
                    <div>
                      <span className='font-extrabold mr-8'>장소</span>
                      <span>{helpInfo.post.building_name}</span>
                    </div>
                    <div>
                      <span className='font-extrabold mr-8'>위치</span>
                      <span>{helpInfo.post.address}</span>
                    </div>
                    <div>
                      <span className='font-extrabold mr-8'>거리</span>
                      <span>{distance} m</span>
                      <span className='ml-1 text-gray-500 font-light text-sm'>
                        (도보 약 {Math.floor(distance / 67)}분 소요)
                      </span>
                    </div>
                    <button className='flex items-center justify-center w-[70%] h-[45px] mt-4 rounded-2xl bg-[#5A5A5A]'>
                      <p className='flex items-center text-[#FFC700] text-[16px] font-medium gap-2'>
                        <RecordIcon size={'medium'} />
                        음성내용 듣기
                      </p>
                    </button>
                  </div>
                  <Link
                    to='/meeting'
                    state={{
                      route,
                      postId: helpInfo.post.id,
                      distance: distance,
                    }}
                  >
                    <button
                      className='w-full h-[52px] min-h-[52px] rounded-2xl yellow'
                      onClick={() => selectHelper(helpInfo.post.id)}
                    >
                      <p className='text-[1.25rem] font-medium'>
                        도움 수락하기
                      </p>
                    </button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <div id='map' className='w-full flex-1'></div>
            </>
          )}
        </>
      )}
      {mypage ? <Mypage close={closeMypage} /> : ''}
    </div>
  );
}
