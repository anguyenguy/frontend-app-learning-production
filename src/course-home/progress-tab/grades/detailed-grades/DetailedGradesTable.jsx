/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React from 'react';
import { useSelector } from 'react-redux';

import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
// import { DataTable } from '@edx/paragon';

import { useModel } from '../../../../generic/model-store';
// import messages from '../messages';
// import SubsectionTitleCell from './SubsectionTitleCell';
// import { subscribe } from '@edx/frontend-platform';
import { faCheck, faExclamation, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HiOutlineXMark } from 'react-icons/hi2';

function DetailedGradesTable({ intl }) {
  const {
    courseId,
  } = useSelector(state => state.courseHome);

  const {
    sectionScores,
  } = useModel('progress', courseId);

  return (
    sectionScores.map((chapter) => {
      console.log(chapter);
      const subsectionScores = chapter.subsections.filter(
        (subsection) => !!(
          subsection.hasGradedAssignment
          && subsection.showGrades
          && (subsection.numPointsPossible > 0 || subsection.numPointsEarned > 0)),
      );

      if (subsectionScores.length === 0) {
        return null;
      }

      // const detailedGradesData = subsectionScores.map((subsection) => ({
      //   subsectionTitle: <SubsectionTitleCell subsection={subsection} />,
      //   score: <span className={subsection.learnerHasAccess ?
      // '' : 'greyed-out'}>{subsection.numPointsEarned}/{subsection.numPointsPossible}</span>,
      // }));

      return (
      // <div className="my-3" key={`${chapter.displayName}-grades-table`}>
      //   <DataTable
      //     data={detailedGradesData}
      //     itemCount={detailedGradesData.length}
      //     columns={[
      //       {
      //         Header: chapter.displayName,
      //         accessor: 'subsectionTitle',
      //         headerClassName: 'h5 mb-0',
      //         cellClassName: 'mw-100',
      //       },
      //       {
      //         Header: `${intl.formatMessage(messages.score)}`,
      //         accessor: 'score',
      //         headerClassName: 'justify-content-end h5 mb-0',
      //         cellClassName: 'align-top text-right small',
      //       },
      //     ]}
      //   >
      //     <DataTable.Table />
      //   </DataTable>
      // </div>
        <>
          {subsectionScores.map(subscribe => (
            <div className="item--progress d-flex" key={subscribe.blockKey}>
              <div className="left d-flex-items">
                <div className={subscribe.numPointsEarned > 0 ? 'icon check' : 'icon'}>
                  {subscribe.numPointsEarned > 0 ? <FontAwesomeIcon icon={faCheck} /> : <HiOutlineXMark />}
                </div>
                <h4>Quiz {subscribe.displayName.split('.')[0].split(' ')[1]}</h4>
              </div>
              <div className="right d-flex-items">
                <div className="points-total">
                  <div className="point-achie" style={{ width: `${subscribe.percentGraded * 100}%` }} />
                </div>
                <div className="points-number">
                  <span>{subscribe.numPointsEarned}</span>
                  <span>/</span>
                  <span>{subscribe.numPointsPossible}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      );
    })
  );
}

DetailedGradesTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DetailedGradesTable);
