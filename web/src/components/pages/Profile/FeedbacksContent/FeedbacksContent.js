import React, { useEffect, useState } from 'react';

import "./FeedbacksContent.scss";
import { loadUserFeedbacks } from '../../../../redux/actions/users-actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LOADING, LOADED } from '../../../../constants';
import Pagination from '../../../layouts/Pagination/Pagination';
import { mapFeedbacksIdsToFeedbacks } from '../../../../redux/mappers/users-mappers';
import FeedbackCard from '../../../layouts/FeedbackCard/FeedbackCard';

const FeedbacksContent = ({ userId, feedbacksStore, loadUserFeedbacks }) => {
    
    const [page, setPage] = useState(1);

    const feedbacks = [{ id: 1, text: "My custom text"}]

    return (
        <div className="feedbacks-content">
            <div className="feedbacks-content-container">
                {
                    feedbacks.map(f => <FeedbackCard key={f.id} { ...f }/> )
                }
            </div>
            <Pagination onChangePage={setPage} page={page}/>
        </div>
    )
};

export default compose(
    connect(({ users: { feedbacksStore }}) => ({ feedbacksStore }), { loadUserFeedbacks })
)(FeedbacksContent);