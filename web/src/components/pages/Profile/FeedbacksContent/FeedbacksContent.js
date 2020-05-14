import React, { useState } from 'react';

import "./FeedbacksContent.scss";
import Pagination from '../../../layouts/Pagination/Pagination';
import FeedbackCard from '../../../layouts/FeedbackCard/FeedbackCard';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const FeedbacksContent = () => {

    const [page, setPage] = useState(1);

    const { data, loading } = useQuery(USER_CONTENT_QUERY, {
        variables: {
            page,
            limit: 10
        }
    });

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

            <Pagination pages={Math.ceil(data?.currentUser?.feedbacksCount / 10)} page={page} onChangePage={setPage} />
        </div>
    )
};

export default FeedbacksContent;

const USER_CONTENT_QUERY = gql`query currentUser($page: Int!, $limit: Int!) {
    currentUser{
        id
      feedbacks(page: $page, limit: $limit) {
            id
            user {
                id
                fullName
                iconName
            }
            rate
            text
      },
      feedbacksCount
    }
  }`;