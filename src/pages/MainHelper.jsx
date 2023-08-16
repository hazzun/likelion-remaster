import React, { useEffect, useState } from "react";
import BottomButton from "../components/BottomButton";
import LoadingIcon from "../components/icons/LoadingIcon";
import RecordIcon from "../components/icons/RecordIcon";
import ToggleClose from "../components/icons/ToggleClose";
import ToggleOpen from "../components/icons/ToggleOpen";
import ProfileImage from "../components/ProfileImage";
import Mypage from "../components/Mypage";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const { kakao } = window;

export default function MainHelper({ mypage, closeMypage }) {
  const [userLocation, setUserLocation] = useState();
  const [helpInfo, setHelpInfo] = useState();
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [onToggle, setOnToggle] = useState(true);
  const [cateSelect, setCateSelect] = useState("전체");
  const [distance, setDistance] = useState(0);

  const category = [
    "전체",
    "금융",
    "쇼핑",
    "인터넷",
    "기기고장",
    "문서 및 이메일 작성",
    "영상 및 사진",
    "예약/예매",
    "기타",
  ];
  const categoryClose = ["전체", "금융", "문서 및 이메일 작성"];

  const location = useLocation();
  const route = location.pathname;
  // console.log('what = ', route);

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
      alert("위치정보 수집을 동의해주세요");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
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
          title: "수원역",
          cate: ["핸드폰", "노트북", "사람살려"],
          latlng: new kakao.maps.LatLng(37.266714775928556, 127.00048478122952),
        },
        {
          title: "판교",
          cate: ["키오스크", "사람살려"],
          latlng: new kakao.maps.LatLng(37.39033774639587, 127.0905994639179),
        },
        {
          title: "인천국제공항",
          cate: ["인터넷뱅킹", "키오스크"],
          latlng: new kakao.maps.LatLng(37.47686451580999, 126.42996911223717),
        },
        {
          title: "야탑역",
          cate: ["핸드폰", "노트북", "인터넷뱅킹"],
          latlng: new kakao.maps.LatLng(37.4114916235998, 127.12920236033524),
        },
        {
          title: "한대앞역",
          cate: ["핸드폰", "키오스크"],
          latlng: new kakao.maps.LatLng(37.3102050791496, 126.85350336500038),
        },
        {
          title: "잠실역",
          cate: ["인터넷뱅킹", "사람살려"],
          latlng: new kakao.maps.LatLng(37.51541730466366, 127.07299456527649),
        },
        {
          title: "어디게?",
          cate: ["핸드폰", "키오스크", "사람살려"],
          latlng: new kakao.maps.LatLng(37.4051373046637, 126.99999456527652),
        },
      ];
      let helpImage = "/images/marker.png";
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

        kakao.maps.event.addListener(helpMarker, "click", () =>
          helpInfoOpen(positions[i])
        );
      }

      // 특정 마커를 클릭하면 동작하는 함수
      const helpInfoOpen = (info) => {
        let line = new kakao.maps.Polyline({
          path: [userLocation, info.latlng],
        });
        setDistance(Math.round(line.getLength()));

        console.log(info);
        setIsInfoModal(() => true);
        map.setCenter(info.latlng);

        setHelpInfo(info);
      };
      /* ---------------------------------------------------------------------------- */
      /* --------------------------- 도움요청자의 정보 받기완료 ---------------------------- */
      /* ---------------------------------------------------------------------------- */

      const displayMarker = (userLocation) => {
        let imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
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
  }, [userLocation]);

  const selectCategory = (item) => {
    if (item !== cateSelect) setCateSelect(item);
  };

  return (
    <div className="relative h-full flex flex-col">
      {!userLocation ? (
        <>
          <div className="w-full h-full flex flex-col items-center justify-center text-center gap-8">
            <LoadingIcon size="large" />
            <p className="text-md text-gray-500">
              현재 위치를 불러오는 중 ... <br /> (예상 소요시간 : 5초)
            </p>
          </div>
        </>
      ) : (
        <>
          {onToggle ? (
            <div className="absolute p-2 bg-cate-rgba z-50 flex w-full justify-between gap-[2px]">
              <div className="overflow-auto">
                {categoryClose.map((item, key) =>
                  item === cateSelect ? (
                    <button
                      key={key}
                      className="bg-[#FED130] px-[10px] py-[2px] rounded-2xl text-lg m-1"
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    <button
                      key={key}
                      className="bg-white border border-[#D9D9D9] text-[18px] px-[10px] py-[2px] rounded-2xl text-lg m-1"
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
                className="flex pt-1 hover:cursor-default"
              >
                <ToggleOpen size={"medium"} />
              </button>
            </div>
          ) : (
            <div className="absolute p-2 bg-cate-rgba z-50 flex w-full justify-between gap-[2px]">
              <div className="overflow-auto">
                {category.map((item, key) =>
                  item === cateSelect ? (
                    <button
                      key={key}
                      className="bg-[#FED130] px-[10px] py-[2px] rounded-2xl text-lg m-1"
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </button>
                  ) : (
                    <button
                      key={key}
                      className="bg-white border border-[#D9D9D9] text-[18px] px-[10px] py-[2px] rounded-2xl text-lg m-1"
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
                className="flex pt-1 hover:cursor-default"
              >
                <ToggleClose size={"medium"} />
              </button>
            </div>
          )}

          {isInfoModal ? (
            <>
              <div id="map" className="w-full flex-1 h-[135%]"></div>
              {helpInfo && (
                <div className=" z-30 flex flex-col gap-3 justify-between bottom-0 left-0 right-0 relative bg-white rounded-t-[30px] p-5 shadow-t-2xl">
                  <div className="flex items-center gap-5">
                    <ProfileImage size="small" />
                    <div className="flex flex-col">
                      <span className="font-bold">user1234 님</span>
                      <span className="text-gray-500">60대 남성</span>
                    </div>
                    <button
                      className="absolute top-0 right-0 mt-7 mr-7 text-xl"
                      onClick={() => setIsInfoModal(false)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2 mb-5">
                      {helpInfo.cate.map((item, key) => {
                        return (
                          <span
                            key={key}
                            className="bg-[#FFF9E9] px-2 py-1 rounded-md text-[16px] font-semibold"
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <span className="font-extrabold mr-8">위치</span>
                      <span>{helpInfo.title}</span>
                    </div>
                    <div>
                      <span className="font-extrabold mr-8">거리</span>
                      {/* <span>
                        {helpInfo.latlng.La}, {helpInfo.latlng.Ma}
                      </span> */}
                      <span>{distance} m</span>
                    </div>
                    <div>
                      <span className="font-extrabold mr-8">시간</span>
                      <span>도보 약 {Math.floor(distance / 67)}분 소요</span>
                    </div>
                    <button className="flex items-center justify-center w-[70%] h-[45px] mt-4 rounded-2xl bg-[#5A5A5A]">
                      <p className="flex items-center text-[#FFC700] text-[16px] font-medium gap-2">
                        <RecordIcon size={"medium"} />
                        음성내용 듣기
                      </p>
                    </button>
                  </div>
                  <Link to="/meeting" state={{ route }}>
                    <BottomButton text={"도움 수락하기"} />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <div id="map" className="w-full flex-1"></div>
            </>
          )}
        </>
      )}
      {mypage ? <Mypage close={closeMypage} /> : ""}
    </div>
  );
}
