import React, { useEffect } from 'react';

import "./PurchasesItem.scss";
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { PURCHASE_ITEM_QUERY } from '../../../../apollo/queries/purchases-queries';
import Button from '../../../layouts/Button';
import { CURRENT_USER_QUERY } from '../../../../apollo/queries/user-queries';
import ProductIcon from '../../../icons/ProductIcon';
import moment from 'moment';
import { CHANGE_PURCHASE_STATUS } from '../../../../apollo/mutation/purchases-mutations';
import { PURCHASE_STATUS_CHANGED } from '../../../../apollo/subscriptions/purchases-subscriptions';
import withLoginedLock from '../../../hocs/withLoginedLock/withLoginedLock';

const PurchasesItem = ({ match: { params: { id } } }) => {
    const currentUserQuery = useQuery(CURRENT_USER_QUERY);
    const { data, loading, subscribeToMore } = useQuery(PURCHASE_ITEM_QUERY, {
        variables: { id }
    });

    const [changePurchaseStatus] = useMutation(CHANGE_PURCHASE_STATUS);

    useSubscription(PURCHASE_STATUS_CHANGED);

    if (loading) return <span>Loading...</span>

    const { currentUser } = currentUserQuery.data;
    const { product, seller, shopper, statuses } = data.purchase;

    const isSeller = currentUser.id === seller.id;
    const isShopper = !isSeller;

    const isPosted = !!statuses.find(s => s.status === "POSTED");
    const isCanceled = !!statuses.find(s => s.status === "CANCELED");
    const isClosed = !!statuses.find(s => s.status === "CLOSED");

    const visiblePostedButton = isSeller && !isPosted && !isCanceled;
    const visibleCancelButton = isShopper && !isCanceled && !isPosted;
    const visibleCloseButton = isShopper && !isClosed && !!isPosted && !isCanceled;

    const onClickPost = async () => {
        await changePurchaseStatus({
            variables: { purchaseId: id, status: "POSTED" }
        })
    }

    const onClickClose = async () => {
        await changePurchaseStatus({
            variables: { purchaseId: id, status: "CLOSED" }
        })
    }

    const onClickCancel = async () => {
        await changePurchaseStatus({
            variables: { purchaseId: id, status: "CANCELED" }
        })
    }

    return (
        <div className="purchases-item-page">
            <div className="purchases-item-page-product">
                <div className="purchases-item-page-product-image">
                    <ProductIcon imageName={product.imageName} />
                </div>
                <span className="purchases-item-page-product-title">{product.title}</span>
            </div>
            <div className="purchase-item-page-statuses">
                {
                    statuses.map(s => (
                        <div className="purchases-item-page-statuses-item" status={s.status}>
                            <span>{s.status}</span>
                            <span>{moment(+s.date).calendar()}</span>
                        </div>
                    ))
                }
            </div>
            {visiblePostedButton && <Button.Default value="Posted" uppercase={true} onClick={onClickPost} />}
            {visibleCancelButton && <Button.Default value="Cancel" uppercase={true} onClick={onClickCancel} />}
            {visibleCloseButton && <Button.Default value="Close" uppercase={true} onClick={onClickClose} />}
        </div>
    )
};

export default withLoginedLock(true)(PurchasesItem);