import React from 'react';

import "./Purchase.scss";
import PaymentMethods from './PaymentMethods/PaymentMethods';
import DeliveryAddress from './DeliveryAddress/DeliveryAddress';
import OrderList from './OrderList/OrderList';
import Checkout from './Checkout/Checkout';
import QueryString from 'qs';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_CART_QUERY } from '../../../apollo/queries/user-queries';
import { PRODUCT_QUERY } from '../../../apollo/queries/products-queries';

const Purchase = ({ match, location: { search } }, fromCart = true) => {

    const { cart, product, count } = QueryString.parse(search.substring(1));


    const currentUserCart = useQuery(CURRENT_USER_CART_QUERY, { skip: !cart });
    const productQuery = useQuery(PRODUCT_QUERY, { variables: { id: product }, skip: !!cart });

    if (currentUserCart.loading || productQuery.loading) return <span>Loading...</span>

    const cartProducts = cart ? currentUserCart.data.currentUser.cartProducts :
        [{ count: +count, product: productQuery.data.product }];

    return (
        <div className="purchase-page">
            <div className="purchase-page-right">
                <DeliveryAddress />
                <PaymentMethods />
                <OrderList cartProducts={cartProducts} />
            </div>
            <div className="purchase-page-left">
                <Checkout />
            </div>
        </div>
    )
};

export default Purchase;