import React, { useEffect, useState } from 'react';
import { setHeaderMinorPanel } from '../../other/Header/Header';
import TextField from '../../layouts/TextField';
import Icon from '../../layouts/Icon';

import './Home.scss';
import Button from '../../layouts/Button';
import Form from '../../layouts/Form/Form';
import ProductCard from '../../layouts/ProductCard/ProductCard';
import Combobox from '../../layouts/Combobox/Combobox';
import ComboboxOption from '../../layouts/Combobox/ComboboxOption/ComboboxOption';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { loadProducts, changeSavedStateOfProduct } from '../../../redux/actions/products-actions';
import { productsWithChangingSavedState } from '../../../redux/mappers/products-mappers';
import { notifyInfo, notifyError, notifyWarning } from '../../other/Snackbar/Snackbar';
import { LOGINED } from '../../../constants/login';

const Home = ({ loginStatus, products, loadProducts, changeSavedStateOfProduct }) => {

    const [category, setCategory] = useState("unknown");

    useEffect(() => {
        if (products.length === 0)
            loadProducts();

        setHeaderMinorPanel(
            <div className="home-page-header-minor">
                <TextField placeholder="Search products by name" icon={
                    <Icon style={{ width: '17px', height: '18px' }}>
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.23782 13.1718C10.4389 13.1718 12.9756 10.5265 12.9756 7.33592C12.9756 4.14538 10.4389 1.5 7.23782 1.5C4.03674 1.5 1.5 4.14538 1.5 7.33592C1.5 10.5265 4.03674 13.1718 7.23782 13.1718Z" fill="white" fillOpacity="0.01" stroke="#5C5C5C" strokeWidth="3" />
                            <path d="M10.7646 11.6667L14.7577 15.7522" stroke="#5C5C5C" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                    </Icon>
                } />
                <TextField placeholder="Location" icon={
                    <Icon>
                        <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.22222 0C2.91694 0 0 2.80662 0 5.77778C0 11.7808 5.9422 18.3683 5.77778 18.7778C6.27255 18.7295 6.38357 18.7778 7.22222 18.7778C6.62727 18.7706 6.73016 18.7295 7.22222 18.7778C7.06051 18.3604 13 11.6634 13 5.77778C13 2.80662 10.0831 0 7.22222 0ZM7.22222 8.66667C5.30418 8.66667 4.33333 7.69815 4.33333 7.22222C4.33333 5.30426 5.30418 4.33333 7.22222 4.33333C7.69582 4.33333 8.66667 5.30426 8.66667 7.22222C8.66667 7.69815 7.69582 8.66667 7.22222 8.66667Z" fill="#5C5C5C" />
                        </svg>
                    </Icon>
                } />
                <Button.Martinique style={{ textTransform: "uppercase" }} value="Search" />
            </div>
        );
        return () => {
            setHeaderMinorPanel();
        }
    }, []);

    const changeSavedState = (id, state) => {
        if (loginStatus === LOGINED) {
            changeSavedStateOfProduct(id, state);
        } else {
            notifyWarning("Please, login before saveing product.")
        }
    }

    return (
        <div className="home-page">
            <Form className="home-page-search-container">
                <Combobox type="medium" value="unknown" value={category} onChange={setCategory}>
                    <ComboboxOption icon={<Icon>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1429 0H14.5714C15.9126 0 17 1.08739 17 2.42857V4.85714C17 6.19832 15.9126 7.28571 14.5714 7.28571H12.1429C10.8017 7.28571 9.71429 6.19832 9.71429 4.85714V2.42857C9.71429 1.08739 10.8017 0 12.1429 0ZM12.1429 9.71429H14.5714C15.9126 9.71429 17 10.8017 17 12.1429V14.5714C17 15.9126 15.9126 17 14.5714 17H12.1429C10.8017 17 9.71429 15.9126 9.71429 14.5714V12.1429C9.71429 10.8017 10.8017 9.71429 12.1429 9.71429ZM4.85714 9.71429H2.42857C1.08739 9.71429 0 10.8017 0 12.1429V14.5714C0 15.9126 1.08739 17 2.42857 17H4.85714C6.19832 17 7.28571 15.9126 7.28571 14.5714V12.1429C7.28571 10.8017 6.19832 9.71429 4.85714 9.71429ZM2.42857 0H4.85714C6.19832 0 7.28571 1.08739 7.28571 2.42857V4.85714C7.28571 6.19832 6.19832 7.28571 4.85714 7.28571H2.42857C1.08739 7.28571 0 6.19832 0 4.85714V2.42857C0 1.08739 1.08739 0 2.42857 0Z" fill="#505050" />
                        </svg>
                    </Icon>} value="unknown">Mebels</ComboboxOption>
                    <ComboboxOption value="unknown2">Sofas</ComboboxOption>
                </Combobox>
                <TextField type="medium" placeholder="Price from (USD)" />
                <TextField type="medium" placeholder="Price to (USD)" />
            </Form>
            <div className="home-page-products-container">
                {products.map(product =>
                    <ProductCard key={product.id} {...product}
                        onSavedChange={(state) => changeSavedState(product.id, state)} />)}
            </div>
        </div>
    );
}

const mapStateToProps = ({ user: { loginStatus },
    products: { products, changingSavedStateOfProductsIds }
}) => ({
    loginStatus,
    products: productsWithChangingSavedState(products, changingSavedStateOfProductsIds)
});

export default compose(
    connect(mapStateToProps, { loadProducts, changeSavedStateOfProduct })
)(Home);