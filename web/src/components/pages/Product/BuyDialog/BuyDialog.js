import React, { useState } from 'react';

import "./BuyDialog.scss";
import ModalDialog from '../../../layouts/ModalDialog/ModalDialog';
import CartProductsList from '../../../other/CartProductsList/CartProductsList';
import Button from '../../../layouts/Button';
import { useMutation } from '@apollo/react-hooks';
import { ADD_PRODUCT_TO_CARD } from '../../../../apollo/mutation/user-mutation';
import { useHistory } from 'react-router-dom';

const BuyDialog = ({ product, opened, onClosed }) => {
    const [count, setCount] = useState(1);

    const history = useHistory();
    const [addToCard] = useMutation(ADD_PRODUCT_TO_CARD);

    const onAddToCardClicked = () => {
        addToCard({
            variables: {
                productId: product.id,
                count
            }
        });

        setCount(1);
        onClosed();
    }

    const onCancelClick = () => {
        onClosed();
    }


    const onBuyInstantClick = () => {
        history.push(`/purchase?product=${product.id}&count=${count}`)
    }

    return (
        <ModalDialog opened={opened} onClosed={onClosed}>
            <h2>{product.title}</h2>
            <section className="product-page-buy-dialog-products">
                <CartProductsList onCountChange={(id, c) => setCount(c)} cartProducts={[{ count, product }]} />
            </section>
            <div className="product-page-buy-dialog-buttons">
                <Button.Default className="product-page-buy-dialog-buttons-add-to-cart" value="Add to cart" onClick={onAddToCardClicked} />
                <Button.Outlined className="product-page-buy-dialog-buttons-cancel" value="Cancel" onClick={onCancelClick} />
                <Button.Default className="product-page-buy-dialog-buttons-buy-instant" value="Buy instant" onClick={onBuyInstantClick} />
            </div>
        </ModalDialog>
    )
};

export default BuyDialog;