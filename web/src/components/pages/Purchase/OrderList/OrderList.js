import React from 'react';

import "./OrderList.scss";
import CartProductsList from '../../../other/CartProductsList';
import { CURRENT_USER_CART_QUERY } from '../../../../apollo/queries/user-queries';
import { useQuery } from '@apollo/react-hooks';

const OrderList = ({cartProducts}) => {

    return (
        <div className="purchase-page-order-list">
            <CartProductsList editable={false} cartProducts={cartProducts} />
        </div>
    )
};

export default OrderList;