import { useRef, useEffect, useState } from 'react';
// import mark from '../img/mark.png';

const { naver } = window;

export default function MapTest() {
  const mapElement = useRef(null);

  const [myLocation, setMyLocation] = useState('');
  const [isInfoModal, setIsInfoModal] = useState(false);

  useEffect(() => {
    const success = (position) => {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const error = () => {
      window.alert('현재위치를 알수 없습니다.');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  let contentString = [
    '<div class="iw_inner">',
    '   <h3>서울특별시청</h3>',
    '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br>',
    '       02-120 | 공공,사회기관 > 특별,광역시청<br>',
    '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    '   </p>',
    '</div>',
  ].join('');

  const content = `<img src='/img/mark.png' width="85" height="85" alt="현재 위치"/>`;

  useEffect(() => {
    // console.log(mapElement.current);
    if (!mapElement.current || !naver)
      return (
        <>
          <div>지도를 불러오지 못했습니다</div>
        </>
      );

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣기
    const location = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );
    const mapOptions = {
      // baseTileOpacity: 0.9,
      padding: 100,
      center: location,
      // zoom: 18, // default = 16
      scaleControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    /*    mapOption 을 포함한  map 객체 생성!!    */
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    /* ----------------- */
    /* ----------------- */
    /* ----------------- */
    let markerOptions = {
      position: location,
      map,
      icon: {
        url: content,
        size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    };
    /*     markerOption 을 포함한 marker 객체 생성!!    */
    let marker = new naver.maps.Marker(markerOptions);

    // let markerOptionss = {
    //   position: new naver.maps.LatLng(37.5656, 126.9769),
    //   map,
    //   icon: {
    //     url: content,
    //     size: new naver.maps.Size(50, 52),
    //     origin: new naver.maps.Point(0, 0),
    //     anchor: new naver.maps.Point(25, 26),
    //   },
    // };
    // let marker = new naver.maps.Marker(markerOptionss);

    let infowindow = new naver.maps.InfoWindow({
      content: contentString,

      borderWidth: 0,
      disableAnchor: true,
      backgroundColor: 'transparent',

      pixelOffset: new naver.maps.Point(0, -10),
    });

    naver.maps.Event.addListener(marker, 'click', function (e) {
      if (infowindow.getMap()) {
        map.setCenter(location);
        infowindow.close();
        setIsInfoModal(false);
      } else {
        map.setCenter(location);
        infowindow.open(map, marker);
        setIsInfoModal(true);
      }
    });
  }, [myLocation]);

  return (
    <>
      {isInfoModal ? (
        <>
          {/* <div className='h-full relative'> */}
          <div
            ref={mapElement}
            className='z-10 w-full h-[60%] rounded-b-3xl'
          ></div>
          <div className='z-30 h-[45%] absolute bottom-0 left-0 right-0 bg-gray-200 rounded-t-[30px] pt-10 pl-5 pr-5'>
            <img
              src='/img/mark.png'
              width='25'
              height='25'
              alt='현재 위치'
              className=''
            />
            <div className=''> test testsetest</div>
          </div>
          {/* </div> */}
        </>
      ) : (
        <>
          <div ref={mapElement} className='w-full h-full'></div>
        </>
      )}
    </>
  );
}
