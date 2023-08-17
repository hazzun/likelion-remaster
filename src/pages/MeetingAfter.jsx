import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HelperMeetingSuccess from '../components/HelperMeetingSuccess';
import HelperMeetingFail from '../components/HelperMeetingFail';
import AskerMeetingSuccess from '../components/AskerMeetingSuccess';
import AskerMeetingFail from '../components/AskerMeetingFail';
import { client } from '../client';
import ConfirmLoading from '../components/ConfirmLoading';

export default function MeetingAfter() {
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [helperState, setHelperState] = useState('');

  const location = useLocation();
  const userState = location.state.props;
  const postId = location.state.postId;

  console.log(location.state);

  const confirmCheck = (interval) => {
    client
      .get(`/reqconfirm/${postId}/`)
      .then((response) => {
        console.log(response.data);
        console.log('interval = ', interval);
        console.log('asker 뭔데 = ', response.data.asker_confirm);
        if (response.data.asker_confirm === null) {
          console.log(isLoading);
          setLoading(true);
          console.log(isLoading);
          console.log('1번');
        } else if (
          response.data.asker_confirm === true &&
          response.data.helper_confirm === true
        ) {
          console.log('2번');
          setHelperState('helperSuccess');
          setLoading(false);
          clearInterval(interval);
        } else if (
          response.data.asker_confirm === false ||
          response.data.helper_confirm === false
        ) {
          console.log('3번 잡았다ㄴ');
          setHelperState('helperFail');
          setLoading(false);
          clearInterval(interval);
        }
      })
      .catch((error) => console.log('그만 - ', error));
  };

  useEffect(() => {
    let interval = null;
    if (isLoading) {
      interval = setInterval(() => {
        confirmCheck(interval);
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  switch (userState) {
    case 'helper':
      if (helperState === 'helperFail')
        return <>{isLoading ? <ConfirmLoading /> : <HelperMeetingFail />}</>;
      if (helperState === 'helperSuccess')
        return <>{isLoading ? <ConfirmLoading /> : <HelperMeetingSuccess />}</>;
      break;
    case 'askerSuccess':
      return <AskerMeetingSuccess page={page} next={() => setPage(page + 1)} />;
    case 'askerFail':
      return <AskerMeetingFail />;
    default:
      return <div>test</div>;
  }
}

//   return (
//     <>
//       {isLoading ? (
//         <ConfirmLoading />
//       ) : (
//         <>
//           {userState === 'helper' && helperState === 'helperFail' && (
//             <HelperMeetingFail />
//           )}
//           {userState === 'helper' && helperState === 'helperSuccess' && (
//             <HelperMeetingSuccess />
//           )}
//           {userState === 'askerSuccess' && (
//             <AskerMeetingSuccess page={page} next={() => setPage(page + 1)} />
//           )}
//           {userState === 'askerFail' && <AskerMeetingFail />}
//         </>
//       )}
//     </>
//   );
// }
