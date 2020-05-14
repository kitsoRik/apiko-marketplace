import React, { useState, useEffect } from 'react';

import "./FeedbacksContainer.scss";
import InputFeedback from './InputFeedback';
import Form from '../../../layouts/Form';
import FeedbackCard from '../../../layouts/FeedbackCard/FeedbackCard';
import { useQuery } from '@apollo/react-hooks';
import { PRODUCT_FEEDBACKS_QUERY } from '../../../../apollo/queries/products-queries';
import Pagination from '../../../layouts/Pagination/Pagination';
import ModalDialog from '../../../layouts/ModalDialog/ModalDialog';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import { FEEDBACK_ADDED } from '../../../../apollo/subscriptions/products-subscription';

const FeedbacksContainer = ({ productId }) => {

    const [page, setPage] = useState(1);

    const { data, error, loading, subscribeToMore } = useQuery(PRODUCT_FEEDBACKS_QUERY, {
        variables: { productId, page, limit: 10 }
    });

    useEffect(() => {
        const s = subscribeToMore({
            document: FEEDBACK_ADDED,
            variables: {
                productId,
                page: 1,
                limit: 10
            },
            updateQuery: (prev, { subscriptionData: { data: { feedbackAdded } } }) => {
                return {
                    ...prev,
                    product: {
                        ...prev.product,
                        feedbacks: [
                            { ...feedbackAdded, _new: true },
                            ...prev.product.feedbacks.slice(0, 9),
                        ]
                    }
                }
            }
        });

        return s;
    }, [productId]);

    return (
        <div className="product-page-product-feedbacks">
            <InputFeedback
                productId={productId} />

            <Form className="product-page-product-feedbacks-item">
                {
                    data?.product?.feedbacks?.map(f => <FeedbackCard key={f.id} {...f} />)
                }
                {loading && <ModalLoading />}
            </Form>
            <Pagination page={page} pages={Math.ceil(data?.product?.feedbacksCount / 10)} onChangePage={setPage} />
        </div>
    )
};

export default FeedbacksContainer;