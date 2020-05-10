import React from 'react';

import "./ProductLocation.scss";
import LocationIcon from '../../../icons/LocationIcon';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../../apollo/queries/user-queries';
import { calculateDistanceBeetwebTwoLocations } from '../../../../services/calculators';

const ProductLocation = ({ location }) => {
    const { data, loading } = useQuery(CURRENT_USER_QUERY);
    const userLocation = data?.currentUser?.location;

    if (!location || !userLocation) return null;


    if (!data || location.name === userLocation.name) {
        return (
            <div className="product-page-product-info-upper-location">
                <LocationIcon className="product-page-product-info-upper-location-icon" />
                <span className="product-page-product-info-upper-location-text">
                    {location.name}
                </span>
            </div>
        );
    }

    const distance = (calculateDistanceBeetwebTwoLocations(
        location.latitude,
        location.longitude,
        userLocation.latitude,
        userLocation.longitude
    ) / 1000).toFixed(1);

    return (
        <div className="product-page-product-info-upper-location">
            <LocationIcon className="product-page-product-info-upper-location-icon" />
            <span className="product-page-product-info-upper-location-text">
                {location.name} (~{distance} km)
            </span>
        </div>
    )
};

export default ProductLocation;