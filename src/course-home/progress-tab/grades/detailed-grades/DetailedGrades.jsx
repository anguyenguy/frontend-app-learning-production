import React from 'react';
import { useSelector } from 'react-redux';

// import { sendTrackEvent } from '@edx/frontend-platform/analytics';
// import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
// import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
// import { Blocked } from '@edx/paragon/icons';
// import { Icon, Hyperlink } from '@edx/paragon';
// import { Hyperlink } from '@edx/paragon';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModel } from '../../../../generic/model-store';

import DetailedGradesTable from './DetailedGradesTable';

// import messages from '../messages';

function DetailedGrades({ intl }) {
  // const { administrator } = getAuthenticatedUser();
  console.log(intl);
  const {
    courseId,
  } = useSelector(state => state.courseHome);
  // const {
  //   org,
  // } = useModel('courseHomeMeta', courseId);
  const {
    // gradesFeatureIsFullyLocked,
    // gradesFeatureIsPartiallyLocked,
    sectionScores,
  } = useModel('progress', courseId);

  const hasSectionScores = sectionScores.length > 0;

  // const logOutlineLinkClick = () => {
  //   sendTrackEvent('edx.ui.lms.course_progress.detailed_grades.course_outline_link.clicked', {
  //     org_key: org,
  //     courserun_key: courseId,
  //     is_staff: administrator,
  //   });
  // };

  // const outlineLink = (
  //   <Hyperlink
  //     variant="muted"
  //     isInline
  //     destination={`/course/${courseId}/home`}
  //     onClick={logOutlineLinkClick}
  //     tabIndex={gradesFeatureIsFullyLocked ? '-1' : '0'}
  //   >
  //     {intl.formatMessage(messages.courseOutline)}
  //   </Hyperlink>
  // );

  return (
    // <section classNameName="text-dark-700">
    //   <h3 classNameName="h4 mb-3">{intl.formatMessage(messages.detailedGrades)}</h3>
    //   {gradesFeatureIsPartiallyLocked && (
    //     <div classNameName="mb-3 small ml-0 d-inline">
    // <Icon classNameName="mr-1 mt-1 d-inline-flex" style={{ height: '1rem', width: '1rem' }}
    // src={Blocked} data-testid="blocked-icon" />
    //       {intl.formatMessage(messages.gradeSummaryLimitedAccessExplanation)}
    //     </div>
    //   )}
    //   {hasSectionScores && (
    //     <DetailedGradesTable />
    //   )}
    //   {!hasSectionScores && (
    //     <p classNameName="small">{intl.formatMessage(messages.detailedGradesEmpty)}</p>
    //   )}
    //   <p classNameName="x-small m-0">
    //     <FormattedMessage
    //       id="progress.ungradedAlert"
    //       defaultMessage="For progress on ungraded aspects of the course, view your {outlineLink}."
    //       description="Text that precede link that redirect to course outline page"
    //       values={{ outlineLink }}
    //     />
    //   </p>
    // </section>
    <>
      <div className="item--content progress-quiz" id="progress-quiz">
        <h3 className="progress-title d-flex">
          <FontAwesomeIcon icon={faBroom} />Quiz
        </h3>
        <div className="progress-item-content">
          {hasSectionScores && (
            <DetailedGradesTable />
          )}
        </div>
      </div>
    </>
  );
}

DetailedGrades.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DetailedGrades);
