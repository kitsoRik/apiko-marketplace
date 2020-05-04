import React from 'react';

import "./FeedbacksContent.scss";
import Pagination from '../../../layouts/Pagination/Pagination';
import FeedbackCard from '../../../layouts/FeedbackCard/FeedbackCard';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const FeedbacksContent = () => {

    const { data, loading } = useQuery(USER_CONTENT_QUERY);

    return (
        <div className="feedbacks-content">
            <div className="feedbacks-content-container">
                {
                    data?.currentUser?.feedbacks.map(f => <FeedbackCard key={f.id} {...f} />)
                }
            </div>

            {loading &&
                <div className="feedbacks-content-loading">
                    <ModalLoading darken={false} />
                </div>
            }

            <Pagination pages={10} page={1} />
        </div>
    )
};

export default FeedbacksContent;

const USER_CONTENT_QUERY = gql`query currentUser($page: Int, $limit: Int) {
    currentUser{
      feedbacks(page: $page, limit: $limit) {
        id
        text
      },
      feedbacksCount
    }
  }`;