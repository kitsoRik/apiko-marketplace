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
import { PURCHASE_MUTATION } from '../../../apollo/mutation/products-mutation';

const Purchase = ({ match, location: { search } }, fromCart = true) => {

    const { cart, product, count } = QueryString.parse(search.substring(1));


    const currentUserCart = useQuery(CURRENT_USER_CART_QUERY, { skip: !cart });
    const productQuery = useQuery(PRODUCT_QUERY, { variables: { id: product }, skip: !!cart });

    const [purchase] = useMutation(PURCHASE_MUTATION);

    if (currentUserCart.loading || productQuery.loading) return <span>Loading...</span>

    const cartProducts = cart ? currentUserCart.data.currentUser.cartProducts :
        [{ count: +count, product: productQuery.data.product }];

    const onPurchase = async () => {
        let purchases = [];

        if (!!cart) {

        } else {
            purchases = [{
                productId: product,
                count: +count
            }];
        }

        const { data } = await purchase({
            variables: {
                purchases
            }
        });

        console.log(data);
    }

    return (
        <div className="purchase-page">
            <div className="purchase-page-right">
                <DeliveryAddress />
                <PaymentMethods />
                <OrderList cartProducts={cartProducts} />
            </div>
            <div className="purchase-page-left">
                <Checkout onPurchase={onPurchase} />
            </div>
        </div>
    )
};

export default Purchase;