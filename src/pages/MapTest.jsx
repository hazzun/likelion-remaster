import { useRef, useEffect, useState } from 'react';
// import mark from '../img/mark.png';

const { naver } = window;

export default function MapTest() {
  const mapElement = useRef(null);

  const [myLocation, setMyLocation] = useState('');
  const [isInfoModal, setIsInfoModal] = useState(false);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  // const [markers, setMarkers] = useState([]);
  const [isMarkerClick, setIsMarkerClick] = useState(false);

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

  useEffect(() => {
    // console.log(mapElement.current);
    if (!mapElement.current || !naver)
      return (
        <>
          <div>지도를 불러오지 못했습니다</div>
        </>
      );

    const mapOptions = {
      padding: 100,
      center: new naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
      zoom: 10, // default = 16
      scaleControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    /*    내 위치 마커생성    */
    let markerOptions = {
      position: new naver.maps.LatLng(
        myLocation.latitude,
        myLocation.longitude
      ),
      map,
    };
    new naver.maps.Marker(markerOptions);
    /* ----------------- */

    // const markerIcon = '/images/marker.png';

    const markerData = [
      { latitude: 37.4114916235998, longitude: 127.12920236033524 }, // 야탑역
      { latitude: 37.3102050791496, longitude: 126.85350336500038 }, // 한대앞역
      { latitude: 37.51541730466366, longitude: 127.07299456527649 }, // 잠실
      { latitude: 37.8154173046637, longitude: 127.47299456527652 }, // 잠실
    ];
    const markersArray = markerData.map((locations) => {
      const markers = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          locations.latitude,
          locations.longitude
        ),
        map: map,
        // icon: {
        //   url: markerIcon,
        //   size: new naver.maps.Size(50, 52),
        //   origin: new naver.maps.Point(0, 0),
        //   anchor: new naver.maps.Point(25, 26),
        // },
      });

      naver.maps.Event.addListener(markers, 'click', () => {
        setIsInfoModal((prev) => !prev);
        setSelectedMarkerInfo(locations);
        setIsMarkerClick((prev) => !prev);
        // map.setCenter(locations);
      });
      return markers;
    });
    console.log(markersArray);

    // setMarkers(markersArray);
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
          <div className='z-30 h-[45%] absolute bottom-0 left-0 right-0 bg-white rounded-t-[30px] pt-10 pl-5 pr-5 shadow-t-2xl'>
            {selectedMarkerInfo && (
              <div>
                {/* <h3>{selectedMarkerInfo.title}</h3> */}
                <p>Latitude: {selectedMarkerInfo.latitude}</p>
                <p>Longitude: {selectedMarkerInfo.longitude}</p>
              </div>
            )}
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
