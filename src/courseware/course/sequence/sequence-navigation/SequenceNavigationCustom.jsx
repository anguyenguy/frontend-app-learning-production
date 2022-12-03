/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { breakpoints, Button, useWindowSize } from '@edx/paragon';
import { ChevronLeft, ChevronRight } from '@edx/paragon/icons';
import classNames from 'classnames';
import {
  injectIntl,
  intlShape,
  isRtl,
  getLocale,
} from '@edx/frontend-platform/i18n';

import { useSelector } from 'react-redux';
import { getCourseExitNavigation } from '../../course-exit';
import UnitButton from './UnitButtonCustom';
import SequenceNavigationTabs from './SequenceNavigationTabsCustom';
import { useSequenceNavigationMetadata } from './hooks';
import { useModel } from '../../../../generic/model-store';
import { LOADED } from '../../../data/slice';
import { FcPrevious } from 'react-icons/fc';

import messages from './messages';
/** [MM-P2P] Experiment */
import { MMP2PFlyoverTriggerMobile } from '../../../../experiments/mm-p2p';

function SequenceNavigation({
  intl,
  unitId,
  sequenceId,
  className,
  onNavigate,
  nextSequenceHandler,
  previousSequenceHandler,
  goToCourseExitPage,
  mmp2p,
}) {
  const sequence = useModel('sequences', sequenceId);
  const { isFirstUnit, isLastUnit } = useSequenceNavigationMetadata(sequenceId, unitId);
  const {
    courseId,
    sequenceStatus,
  } = useSelector(state => state.courseware);
  const isLocked = sequenceStatus === LOADED ? (
    sequence.gatedContent !== undefined && sequence.gatedContent.gated
  ) : undefined;

  const shouldDisplayNotificationTriggerInSequence = useWindowSize().width < breakpoints.small.minWidth;

  const renderUnitButtons = () => {
    if (isLocked) {
      return (
        <UnitButton unitId={unitId} title="" contentType="lock" isActive onClick={() => {}} />
      );
    }
    if (sequence.unitIds.length === 0 || unitId === null) {
      return (
        <div style={{ flexBasis: '100%', minWidth: 0, borderBottom: 'solid 1px #EAEAEA' }} />
      );
    }
    return (
      <SequenceNavigationTabs
        unitIds={sequence.unitIds}
        unitId={unitId}
        showCompletion={sequence.showCompletion}
        onNavigate={onNavigate}
      />
    );
  };

  const renderNextButton = () => {
    const { exitActive, exitText } = getCourseExitNavigation(courseId, intl);
    const buttonOnClick = isLastUnit ? goToCourseExitPage : nextSequenceHandler;
    const buttonText = (isLastUnit && exitText) ? exitText : intl.formatMessage(messages.nextButton);
    const disabled = isLastUnit && !exitActive;
    const nextArrow = isRtl(getLocale()) ? ChevronLeft : ChevronRight;

    return (
      <Button variant="link" className="next-btn" onClick={buttonOnClick} disabled={disabled} iconAfter={nextArrow}>
        {shouldDisplayNotificationTriggerInSequence ? null : buttonText}
      </Button>
    );
  };

  const prevArrow = isRtl(getLocale()) ? ChevronRight : ChevronLeft;

  return sequenceStatus === LOADED && (
    <div className="nav-tabs">
      <div className="title-tabs">
        <h3>Danh mục</h3>
        <div className="toggle-tabs">
          <FcPrevious />
        </div>
      </div>
      {renderUnitButtons()}
      {/** [MM-P2P] Experiment */}
      { mmp2p.state.isEnabled && <MMP2PFlyoverTriggerMobile options={mmp2p} /> }
    </div>
  );
}

SequenceNavigation.propTypes = {
  intl: intlShape.isRequired,
  sequenceId: PropTypes.string.isRequired,
  unitId: PropTypes.string,
  className: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
  nextSequenceHandler: PropTypes.func.isRequired,
  previousSequenceHandler: PropTypes.func.isRequired,
  goToCourseExitPage: PropTypes.func.isRequired,
  /** [MM-P2P] Experiment */
  mmp2p: PropTypes.shape({
    state: PropTypes.shape({
      isEnabled: PropTypes.bool.isRequired,
    }),
  }),
};

SequenceNavigation.defaultProps = {
  className: null,
  unitId: null,

  /** [MM-P2P] Experiment */
  mmp2p: {
    state: { isEnabled: false },
  },
};

export default injectIntl(SequenceNavigation);
