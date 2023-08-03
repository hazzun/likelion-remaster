import Title from "../components/recipient/Title";
import Map from "../components/recipient/Map";
import Record from "../components/recipient/Record";

export default function Recipient({ page, next }) {
  switch (page) {
    case 1:
      return <Title click={next} />;
    case 2:
      return <Map click={next} />;
    case 3:
      return <Record click={next} />;
    default:
      return <div>잘못된 페이지에 접근하셨습니다.</div>;
  }
}
