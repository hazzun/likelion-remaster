import Title from "../components/recipient/Title";
import Map from "../components/recipient/Map";
import Record from "../components/recipient/Record";
import { useState } from 'react';

export default function Recipient({ page, next }) {

  const [data, setData] = useState({
    category_name:'금융',
    latitude:'',
    longitude:'',
    building_name:'',
    address:'',
    voice_record_name:'',
  })

  switch (page) {
    case 1:
      return <Title click={next} setData={setData} prevData={data}/>;
    case 2:
      return <Map click={next} setData={setData} prevData={data}/>;
    case 3:
      return <Record click={next} prevData={data}/>;
    default:
      return <div>잘못된 페이지에 접근하셨습니다.</div>;
  }
}
