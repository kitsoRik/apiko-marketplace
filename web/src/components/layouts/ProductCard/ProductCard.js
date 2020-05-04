import React from 'react';
import "./ProductCard.scss";
import ModalLoading from '../ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';
import api from '../../../services/api';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { notifyWarning } from '../../other/Snackbar/Snackbar';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';
import { SAVED_PRODUCTS_QUERY } from '../../../apollo/queries/products-queries';
import { Link } from 'react-router-dom';
import ImageNoAvaiableIcon from '../../icons/ImageNoAvaliableIcon/ImageNoAvalaibleIcon';

const ProductCard = ({ className, product, onChangeSavedState = () => { }, ...props }) => {
    const { id, title, price, imageName, changingSaveState, saved = false } = product;

    const client = useApolloClient();

    const { data } = useQuery(CURRENT_USER_QUERY);

    const [changeState, { loading }] = useMutation(CHANGE_STATE_MUTATION, {
        optimisticResponse: {
            changeSavedStateOfProduct: !saved
        }
    });


    const changeSavedState = () => {
        if (loading) return notifyWarning("Wait before next saved.");
        if (!data?.currentUser) return notifyWarning("Please, login before saving product.");
        onChangeSavedState(!saved);
        changeState({
            variables: {
                id, state: !saved
            },
        });


        try {
            const query = client.readQuery({ query: SAVED_PRODUCTS_QUERY });
            let savedProducts;
            if (saved) savedProducts = query.savedProducts.filter(p => p.id !== id);
            else savedProducts = query.savedProducts.concat([{ ...product, saved: !saved }])
            client.writeQuery({
                query: SAVED_PRODUCTS_QUERY,
                data: {
                    savedProducts
                }
            });

        } catch (e) {

        }
        client.writeFragment({
            id,
            fragment: gql`
                fragment saveProduct on Product {
                    saved
                }
            `,
            data: {
                saved: !saved
            }
        });
    }

    return (
        <div className={`product-card ${className ?? ""}`}{...props}>
            <div className="product-card-icon">
                {imageName && <img src={`${api.productsImageBaseUrl}${imageName}`} alt="Product icon" />}
                {!imageName && <ImageNoAvaiableIcon style={{ height: "80%", width: '100%' }} />}
            </div>
            <div className="product-card-info">
                <Link className="product-card-info-title" to={`/products/${id}`} >{title}</Link>
                <span className="product-card-info-price">{price}</span>
            </div>
            <div className="product-card-like">
                <HeartIcon filed={saved} onClick={changeSavedState} />
                {changingSaveState && <ModalLoading style={{ padding: "6px" }} />}
            </div>
        </div>
    );
}

export default ProductCard;

const CHANGE_STATE_MUTATION = gql`
    mutation changeProductState($id: ID!, $state: Boolean!) {
        changeSavedStateOfProduct(id: $id, state: $state)
    }
`;