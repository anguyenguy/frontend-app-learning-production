/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import messages from './messages';
import Tabs from '../generic/tabs/Tabs';

function CourseTabsNavigation({
  activeTabSlug, className, tabs, intl,
}) {
  return (
    <div className={classNames(className, 'tab')}>
      <Tabs
        className="tab--controll d-flex"
        aria-label={intl.formatMessage(messages.courseMaterial)}
      >
        {tabs.map(({ url, title, slug }) => (
          <li key={slug} className={classNames({ active: slug === activeTabSlug })}>
            <a
              key={slug}
              className={classNames('a-tab')}
              href={url}
            >
              {title}
            </a>
          </li>
        ))}
      </Tabs>

    </div>
  );
}

CourseTabsNavigation.propTypes = {
  activeTabSlug: PropTypes.string,
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  intl: intlShape.isRequired,
};

CourseTabsNavigation.defaultProps = {
  activeTabSlug: undefined,
  className: null,
};

export default injectIntl(CourseTabsNavigation);
