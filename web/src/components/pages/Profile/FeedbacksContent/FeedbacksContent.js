import React, { useEffect } from 'react';

import "./FeedbacksContent.scss";
import { loadUserFeedbacks } from '../../../../redux/actions/users-actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LOADING } from '../../../../constants';
import Pagination from '../../../layouts/Pagination/Pagination';
import FeedbackCard from '../../../layouts/FeedbackCard/FeedbackCard';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';

const FeedbacksContent = ({ userId, feedbacksStore, loadUserFeedbacks }) => {


    const userFeedbacksStore = feedbacksStore[userId];

    useEffect(() => {
        if (!userFeedbacksStore) loadUserFeedbacks(userId, 1);
    }, []);

    if (!userFeedbacksStore) {
        return null;
    }

    const { searchSettings: { page, pages }, feedbacks, loadingStatus } = userFeedbacksStore;

    return (
        <div className="feedbacks-content">
            <div className="feedbacks-content-container">
                {
                    feedbacks.map(f => <FeedbackCard key={f.id} {...f} />)
                }
            </div>

            {loadingStatus === LOADING &&
                <div className="feedbacks-content-loading">
                    <ModalLoading darken={false} />
                </div>
            }

            <Pagination pages={pages} onChangePage={(page) => loadUserFeedbacks(3, page)} page={page} />
        </div>
    )
};

export default compose(
    connect(({ users: { feedbacksStore } }) => ({ feedbacksStore }), { loadUserFeedbacks })
)(FeedbacksContent);