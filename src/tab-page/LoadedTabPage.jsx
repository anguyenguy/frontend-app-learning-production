/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { getConfig } from '@edx/frontend-platform';
import { useToggle } from '@edx/paragon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CourseTabsNavigation } from '../course-tabs';
import { useModel } from '../generic/model-store';
import { AlertList } from '../generic/user-messages';
import StreakModal from '../shared/streak-celebration';
import InstructorToolbar from '../instructor-toolbar';
import useEnrollmentAlert from '../alerts/enrollment-alert';
import useLogistrationAlert from '../alerts/logistration-alert';

import ProductTours from '../product-tours/ProductTours';

function LoadedTabPage({
  activeTabSlug,
  children,
  courseId,
  metadataModel,
  unitId,
}) {
  const {
    celebrations,
    org,
    originalUserIsStaff,
    tabs,
    title,
    verifiedMode,
  } = useModel('courseHomeMeta', courseId);

  // Logistration and enrollment alerts are only really used for the outline tab, but loaded here to put them above
  // breadcrumbs when they are visible.
  const logistrationAlert = useLogistrationAlert(courseId);
  const enrollmentAlert = useEnrollmentAlert(courseId);

  const activeTab = tabs.filter(tab => tab.slug === activeTabSlug)[0];

  const streakLengthToCelebrate = celebrations && celebrations.streakLengthToCelebrate;
  const streakDiscountCouponEnabled = celebrations && celebrations.streakDiscountEnabled && verifiedMode;
  const [isStreakCelebrationOpen,, closeStreakCelebration] = useToggle(streakLengthToCelebrate);

  return (
    <>
      <ProductTours
        activeTab={activeTabSlug}
        courseId={courseId}
        isStreakCelebrationOpen={isStreakCelebrationOpen}
        org={org}
      />
      <Helmet>
        <title>{`${activeTab ? `${activeTab.title} | ` : ''}${title} | ${getConfig().SITE_NAME}`}</title>
      </Helmet>
      {originalUserIsStaff && (
        <InstructorToolbar
          courseId={courseId}
          unitId={unitId}
          tab={activeTabSlug}
        />
      )}
      <StreakModal
        courseId={courseId}
        metadataModel={metadataModel}
        streakLengthToCelebrate={streakLengthToCelebrate}
        isStreakCelebrationOpen={!!isStreakCelebrationOpen}
        closeStreakCelebration={closeStreakCelebration}
        streakDiscountCouponEnabled={streakDiscountCouponEnabled}
        verifiedMode={verifiedMode}
      />
      <main id="main-content" className="site-main d-flex flex-column flex-grow-1">
        <div className="view-course">
          <div className="container">
            <div className="breadcrumbs-page">
              <ul className="breadcrumbs">
                <li style={{color: "#0D7DFC"}}>
                  <a style={{marginRight: "15px"}} href={tabs[0].url.includes(".edu.vn") ? "https://lilac.funix.edu.vn" : "http://local.overhang.io:8000/"}>Course </a>
                  <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li>
                  <a href={tabs[0].url}>{title}</a>
                </li>
              </ul>
            </div>
            <AlertList
              topic="outline"
              className="mx-5 mt-3"
              customAlerts={{
                ...enrollmentAlert,
                ...logistrationAlert,
              }}
            />
            <CourseTabsNavigation tabs={tabs} activeTabSlug={activeTabSlug} />
            <div className="container-xl tab--content">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

LoadedTabPage.propTypes = {
  activeTabSlug: PropTypes.string.isRequired,
  children: PropTypes.node,
  courseId: PropTypes.string.isRequired,
  metadataModel: PropTypes.string,
  unitId: PropTypes.string,
};

LoadedTabPage.defaultProps = {
  children: null,
  metadataModel: 'courseHomeMeta',
  unitId: null,
};

export default LoadedTabPage;
