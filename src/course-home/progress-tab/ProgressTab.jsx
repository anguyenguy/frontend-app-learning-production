import React from 'react';
// import { useSelector } from 'react-redux';
// import { breakpoints, useWindowSize } from '@edx/paragon';
import { useWindowSize } from '@edx/paragon';

// import CertificateStatus from './certificate-status/CertificateStatus';
// import CourseCompletion from './course-completion/CourseCompletion';
// import CourseGrade from './grades/course-grade/CourseGrade';
import DetailedGrades from './grades/detailed-grades/DetailedGrades';
// import GradeSummary from './grades/grade-summary/GradeSummary';
// import ProgressHeader from './ProgressHeader';
// import RelatedLinks from './related-links/RelatedLinks';

// import { useModel } from '../../generic/model-store';

function ProgressTab() {
  // const {
  //   courseId,
  // } = useSelector(state => state.courseHome);

  // const {
  //   gradesFeatureIsFullyLocked,
  // } = useModel('progress', courseId);

  // const applyLockedOverlay = gradesFeatureIsFullyLocked ? 'locked-overlay' : '';

  const windowWidth = useWindowSize().width;
  if (windowWidth === undefined) {
    // Bail because we don't want to load <CertificateStatus/> twice, emitting 'visited' events both times.
    // This is a hacky solution, since the user can resize the screen and still get two visited events.
    // But I'm leaving a larger refactor as an exercise to a future reader.
    return null;
  }

  // const wideScreen = windowWidth >= breakpoints.large.minWidth;
  return (
    <>
      {/* <ProgressHeader />
      <div className="row w-100 m-0">
        Main body
        <div className="col-12 col-md-8 p-0">
          <CourseCompletion />
          {!wideScreen && <CertificateStatus />}
          <CourseGrade />
 <div className={`grades my-4 p-4 rounded raised-card ${applyLockedOverlay}`} aria-hidden={gradesFeatureIsFullyLocked}>
            <GradeSummary />
            <DetailedGrades />
          </div>
          <DetailedGrades />
        </div>
        <div className="col-12 col-md-4 p-0 px-md-4">
          {wideScreen && <CertificateStatus />}
          <RelatedLinks />
        </div>
      </div> */}
      <div className="tab--item view-course-progress" id="view-course-progress">
        <h2>Course Progress</h2>
        <div className="course-progress d-flex">
          <div className="tab-left">
            <DetailedGrades />
          </div>
          <div className="tab-right">
            <div className="overlay" />
            <div className="remove">
              <i className="icon-remove" />
            </div>
            <ul>
              <li className="current--item"><a href="#progress-quiz">Quiz</a></li>
              <li><a href="#progress-ass">Assignment</a></li>
              <li><a href="#progress-ask">Câu hỏi</a></li>
              <li><a href="#progress-lab">Lab</a></li>
              <li><a href="#progress-test">Progress test</a></li>
              <li><a href="#progress-score">Điểm tổng kết</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgressTab;
