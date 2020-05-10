import React, { useCallback } from 'react';

import "./Cart.scss";
import Button from '../../layouts/Button';
import CartProductsList from '../../other/CartProductsList';
import { useQuery } from '@apollo/react-hooks';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import _ from 'lodash';
import { CHANGE_CART_ITEM_COUNT } from '../../../apollo/mutation/user-mutation';
import { CURRENT_USER_CART_QUERY } from '../../../apollo/queries/user-queries';

const Cart = () => {

    const { data, loading } = useQuery(CURRENT_USER_CART_QUERY);

    const client = useApolloClient();
    const [changeCartItemCount] = useMutation(CHANGE_CART_ITEM_COUNT);

    const mutateChangeCartItemCount = useCallback(_.debounce(async (id, nextCount) => {
        changeCartItemCount({
            variables: {
                productId: id,
                count: nextCount
            },
            optimisticResponse: {
                changeCartItemCount: nextCount
            }
        });
    }, 300), []);

    const onCountChange = (id, nextCount) => {
        mutateChangeCartItemCount(id, nextCount);
        try {
            const data = client.readQuery({
                query: CURRENT_USER_CART_QUERY,
            });
            const newCartProducts = JSON.parse(JSON.stringify(data.currentUser.cartProducts));
            newCartProducts.find(cp => cp.product.id === id).count = nextCount;
            client.writeQuery({
                query: CURRENT_USER_CART_QUERY,
                data: {
                    ...data,
                    currentUser: {
                        ...data.currentUser,
                        cartProducts: newCartProducts
                    }
                },
            });
        } catch (e) {
            console.log(e);
        }
    }
    if (loading) return <span>Loading...</span>

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            <div className="cart-page-products">
                <CartProductsList onCountChange={onCountChange} cartProducts={data.currentUser.cartProducts} />
            </div>
            <Button.Default value="Purchase" />
        </div>
    )
};

export default Cart;