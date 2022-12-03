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
import { useIFrameHeight, useIFramePluginEvents } from '../../generic/hooks';
import { getBookmarksTabData } from '../data/api';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FcPrevious, FcNext } from 'react-icons/fc';

function BookmarksTab() {
  const { courseId } = useSelector(state => state.courseHome);

  const [dataBookmarks, setDataBookmarks] = useState({ bookmarks: [] });
  const [dataWrapper, setDataWrapper] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookmarksTabData(courseId, '');
      setDataBookmarks(data.results);
      setDataWrapper(data);
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const fetchDataNext = async () => {
    const data = await getBookmarksTabData(courseId, dataWrapper.next);
    setDataBookmarks(data.results);
    setDataWrapper(data);
  };

  const fetchDataPrevious = async () => {
    const data = await getBookmarksTabData(courseId, dataWrapper.previous);
    setDataBookmarks(data.results);
    setDataWrapper(data);
  };

  return (
    <div id="bookmarked" className="tab-content">
      <h2>Bookmarked { dataBookmarks.length ? <span>(Showing { dataWrapper.current_page < dataWrapper.num_pages ? 10 : dataWrapper.count - (dataWrapper.num_pages - 1) * 10} out of {dataWrapper.count} total)</span> : <span> </span>}</h2>
      <ul className="list-bookmark">
        {
        dataBookmarks.length
        ? dataBookmarks.map(item => (
          <li className="list-item" key={item.usage_id}>
            <a href={`/learning/course/${courseId}/${item.path[1].usage_key}`}>
              <BsFillBookmarkFill />
              <div className="text">
                <h4>{item.path[0].display_name} - {item.path[1].display_name} - {item.display_name}</h4>
                <p>Bookmarked on <span className="date">{formatDate(item.created) }</span></p>
              </div>
              <div className="link">
                <HiOutlineArrowNarrowRight />
              </div>
            </a>
          </li>
        ))
        : <div>Loading...</div>
        }
      </ul>
      <div className="pagination">
        <div className={dataWrapper.previous ? 'prev' : 'prev unactive'}>
          <a
            onClick={fetchDataPrevious}
          >
            <FcPrevious />
            <span>Previous</span>
          </a>
        </div>
        <div className={dataWrapper.next ? 'next' : 'next unactive'}>
          <a
            onClick={fetchDataNext}
          >
            <span>Next</span>
            <FcNext />
          </a>
        </div>
      </div>
    </div>

  );
}

export default injectIntl(BookmarksTab);
