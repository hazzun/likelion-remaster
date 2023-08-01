import { useRef, useEffect, useState } from 'react';
// import mark from '../img/mark.png';

const { naver } = window;

export default function MapTest() {
  const mapElement = useRef(null);

  const [myLocation, setMyLocation] = useState('');

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
      navigator.geolocation.watchPosition(success, error);
    }
  }, []);

  useEffect(() => {
    // console.log(mapElement.current);
    if (!mapElement.current || !naver)
      return (
        <>
          <div>지도를 불러오지 못했습니다</div>
        </>
      );

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude
    );
    const mapOptions = {
      // baseTileOpacity: 0.9,
      padding: 100,
      center: location,
      // zoom: 18,
      scaleControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    const content = `<img src='/img/mark.png' width="85" height="85" alt="현재 위치"/>`;

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
    new naver.maps.Marker(markerOptions);

    let markerOptionss = {
      position: new naver.maps.LatLng(37.5656, 126.9769),
      map,
      icon: {
        url: content,
        size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    };
    new naver.maps.Marker(markerOptionss);
  }, [myLocation]);

  return (
    <div>
      {/* <img src='/img/mark.png' width='25' height='25' alt='현재 위치' /> */}
      <div ref={mapElement} className='w-full h-[500px]'></div>
    </div>
  );
}
