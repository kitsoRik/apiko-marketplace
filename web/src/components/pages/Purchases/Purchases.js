import React from 'react';

import "./Purchases.scss";
import ShopperPurchases from './ShopperPurchases';
import QueryString from 'qs';
import SellerPurchases from './SellerPurchases/';

const Purchases = ({ location: { search } }) => {
    const { side } = QueryString.parse(search?.substring(1))
    return (
        <div className="purchases-page">
            {side === 'shopper' && <ShopperPurchases />}
            {side === 'seller' && <SellerPurchases />}
        </div>
    )
};

export default Purchases;