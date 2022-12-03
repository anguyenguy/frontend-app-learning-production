/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
/* eslint-disable no-const-assign */
/* eslint-disable semi */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { getConfig } from '@edx/frontend-platform';
import { injectIntl } from '@edx/frontend-platform/i18n';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { useModel } from '../../generic/model-store';
import LmsHtmlFragment from '../outline-tab/LmsHtmlFragment';
import messages from '../outline-tab/messages';

function UpdatesTab() {
  const { courseId } = useSelector(state => state.courseHome);
  const {
    welcomeMessageHtml,
  } = useModel('outline', courseId);

  return (
    <div className="tab-content">
      <div id="update" className="tab-content">
        <h2>Updates</h2>
        <div className="content">
          <LmsHtmlFragment
            className="inline-link"
            data-testid="long-welcome-message-iframe"
            key="full-html"
            html={welcomeMessageHtml}
            title={messages.welcomeMessage}
          />
        </div>
      </div>
    </div>

  );
}

export default injectIntl(UpdatesTab);
