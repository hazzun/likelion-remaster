import React from 'react';
import ReviewBefore from './meetingAfterSuccess/ReviewBefore';
import ReviewCate from './meetingAfterSuccess/ReviewCate';
import ReviewStar from './meetingAfterSuccess/ReviewStar';
import ReviewFinish from './meetingAfterSuccess/ReviewFinish';

export default function AskerMeetingSuccess({ page, next }) {
  switch (page) {
    case 1:
      return <ReviewBefore click={next} />;
    case 2:
      return <ReviewStar click={next} />;
    case 3:
      return <ReviewCate click={next} />;
    case 4:
      return <ReviewFinish click={next} />;
    default:
      return <div>잘못된 페이지에 접근하셨습니다.</div>;
  }
}
