import React from 'react';

import "./Purchase.scss";
import PaymentMethods from './PaymentMethods/PaymentMethods';
import DeliveryAddress from './DeliveryAddress/DeliveryAddress';
import OrderList from './OrderList/OrderList';
import Checkout from './Checkout/Checkout';
import QueryString from 'qs';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_CART_QUERY } from '../../../apollo/queries/user-queries';
import { PRODUCT_QUERY } from '../../../apollo/queries/products-queries';
import { PURCHASE_MUTATION, PURCHASE_MUTATION_WITH_CLEAR_CARD } from '../../../apollo/mutation/products-mutation';
import { useHistory } from 'react-router-dom';

const Purchase = ({ match, location: { search } }, fromCart = true) => {

    const { cart, product, count } = QueryString.parse(search.substring(1));

    const history = useHistory();

    const currentUserCart = useQuery(CURRENT_USER_CART_QUERY, { skip: !cart });
    const productQuery = useQuery(PRODUCT_QUERY, { variables: { id: product }, skip: !!cart });

    const [purchase] = useMutation(PURCHASE_MUTATION);
    const [purchaseWithClearCart] = useMutation(PURCHASE_MUTATION_WITH_CLEAR_CARD);

    if (currentUserCart.loading || productQuery.loading) return <span>Loading...</span>

    const cartProducts = cart ? currentUserCart.data.currentUser.cartProducts :
        [{ count: +count, product: productQuery.data.product }];

    const onPurchase = async () => {
        let purchases = [];

        if (!!cart) {
            purchases = cartProducts.map(c => ({ productId: c.product.id, count: +c.count }))
        } else {
            purchases = [{
                productId: product,
                count: +count
            }];
        }

        const purch = cart ? purchaseWithClearCart : purchase;

        const { data } = await purch({
            variables: {
                purchases
            }
        });

        history.push("/purchases?side=shopper");

    }

    return (
        <div className="purchase-page">
            <div className="purchase-page-right">
                <DeliveryAddress />
                <PaymentMethods />
                <OrderList cartProducts={cartProducts} />
            </div>
            <div className="purchase-page-left">
                <Checkout totalSum={cartProducts.map(c => c.product.price * c.count).reduce((p, c) => p + c, 0)} onPurchase={onPurchase} />
            </div>
        </div>
    )
};

export default Purchase;