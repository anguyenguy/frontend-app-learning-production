/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  injectIntl, intlShape, isRtl, getLocale,
} from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';

import { FcPrevious, FcNext } from 'react-icons/fc';
import { getCourseExitNavigation } from '../../course-exit';

import UnitNavigationEffortEstimate from './UnitNavigationEffortEstimate';
import { useSequenceNavigationMetadata } from './hooks';
import messages from './messages';

function UnitNavigation({
  intl,
  sequenceId,
  unitId,
  onClickPrevious,
  onClickNext,
  goToCourseExitPage,
}) {
  const { isFirstUnit, isLastUnit } = useSequenceNavigationMetadata(sequenceId, unitId);
  const { courseId } = useSelector(state => state.courseware);

  const renderNextButton = () => {
    const { exitActive, exitText } = getCourseExitNavigation(courseId, intl);
    const buttonOnClick = isLastUnit ? goToCourseExitPage : onClickNext;
    const buttonText = (isLastUnit && exitText) ? exitText : intl.formatMessage(messages.nextButton);
    const disabled = isLastUnit && !exitActive;
    const nextArrow = isRtl(getLocale()) ? faChevronLeft : faChevronRight;
    return (
      <div className="next">
        <a
          variant="outline-primary"
          className="next-button d-flex align-items-center justify-content-center"
          onClick={buttonOnClick}
          disabled={disabled}
        >
          <span>Next</span>
          <FcNext />
        </a>
      </div>
      // <Button
      //   variant="outline-primary"
      //   className="next-button d-flex align-items-center justify-content-center"
      //   onClick={buttonOnClick}
      //   disabled={disabled}
      // >
      //   <UnitNavigationEffortEstimate sequenceId={sequenceId} unitId={unitId}>
      //     {buttonText}
      //   </UnitNavigationEffortEstimate>
      //   <FontAwesomeIcon icon={nextArrow} className="ml-2" size="sm" />
      // </Button>
    );
  };

  const prevArrow = isRtl(getLocale()) ? faChevronRight : faChevronLeft;
  return (
    <div className="pagination">
      <div className="prev">
        <a
          variant="outline-secondary"
          className="previous-button mr-2 d-flex align-items-center justify-content-center"
          disabled={isFirstUnit}
          onClick={onClickPrevious}
        >
          <FcPrevious />
          <span>Previous</span>
        </a>
      </div>
      {/* <Button
        variant="outline-secondary"
        className="previous-button mr-2 d-flex align-items-center justify-content-center"
        disabled={isFirstUnit}
        onClick={onClickPrevious}
      >
        <FontAwesomeIcon icon={prevArrow} className="mr-2" size="sm" />
        {intl.formatMessage(messages.previousButton)}
      </Button> */}
      {renderNextButton()}
    </div>
  );
}

UnitNavigation.propTypes = {
  intl: intlShape.isRequired,
  sequenceId: PropTypes.string.isRequired,
  unitId: PropTypes.string,
  onClickPrevious: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  goToCourseExitPage: PropTypes.func.isRequired,
};

UnitNavigation.defaultProps = {
  unitId: null,
};

export default injectIntl(UnitNavigation);
