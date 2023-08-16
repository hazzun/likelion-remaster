import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HelperMeetingSuccess from '../components/HelperMeetingSuccess';
import HelperMeetingFail from '../components/HelperMeetingFail';
import AskerMeetingSuccess from '../components/AskerMeetingSuccess';
import AskerMeetingFail from '../components/AskerMeetingFail';

export default function MeetingAfter() {
  const location = useLocation();
  const userState = location.state.props;

  console.log(location.state.props);

  const [page, setPage] = useState(1);

  switch (userState) {
    case 'helperSuccess':
      return <HelperMeetingSuccess />;
    case 'helperFail':
      return <HelperMeetingFail />;
    case 'askerSuccess':
      return <AskerMeetingSuccess page={page} next={() => setPage(page + 1)} />;
    case 'askerFail':
      return <AskerMeetingFail />;
    default:
      return <div>test</div>;
  }
}
