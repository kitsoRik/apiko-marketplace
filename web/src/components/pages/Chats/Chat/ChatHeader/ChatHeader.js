import React from 'react';

import "./ChatHeader.scss";
import UserIcon from '../../../../icons/UserIcon';
import ProductIcon from '../../../../icons/ProductIcon';
import api from '../../../../../services/api';
import TREdgeArrow from '../../../../icons/TREdgeArrow';
import { useHistory } from 'react-router-dom';
import withScreenSize from '../../../../hocs/withScreenSize/withScreenSize';
import ModalLoading from '../../../../layouts/ModalLoading/ModalLoading';

const ChatHeader = ({ user, product, loading, screenSize }) => {
    const history = useHistory();

    const isMobileChat = screenSize.width <= 480;
    if (!isMobileChat)
        return (
            <div className="chats-page-chat-header">
                <div className="chats-page-chat-header-user">
                    {screenSize.width <= 640 && <div className="chats-page-chat-header-user-arrow">
                        <button className="chats-page-chat-header-user-arrow-button" onClick={() => history.push("/chats")}></button>
                    </div>}
                    <UserIcon src={user?.iconName} fullName={user?.fullName} loading={loading} />
                    <span className="chats-page-chat-header-user-fullname">{user?.fullName ?? "..."}</span>
                </div>
                <div className="chats-page-chat-header-product">
                    <div className="chats-page-chat-header-product-image">
                        <ProductIcon imageName={product?.imageName} loading={loading} />
                    </div>
                    <div className="chats-page-chat-header-product-info">
                        <span className="chats-page-chat-header-product-info-title">{product?.title ?? "..."}</span>
                        <span className="chats-page-chat-header-product-info-price">${product?.price ?? "..."}</span>
                    </div>
                    <button className="chats-page-chat-header-product-view-button"
                        onClick={() => history.push(`/products/${product.id}`)}>
                        <TREdgeArrow />
                    </button>
                </div>
            </div >
        );
    return (
        <div className="chats-page-chat-header">
            <div className="chats-page-chat-header-user">
                <div className="chats-page-chat-header-user-arrow">
                    <button className="chats-page-chat-header-user-arrow-button" onClick={() => history.push("/chats")}></button>
                </div>
                <UserIcon src={user?.iconName} fullName={user?.fullName} />
                <span className="chats-page-chat-header-user-fullname">{user?.fullName ?? "..."}</span>
            </div>
            <div className="chats-page-chat-header-product">
                <div className="chats-page-chat-header-product-image">
                    <ProductIcon imageName={product?.imageName} />
                </div>
                <div className="chats-page-chat-header-product-info">
                    <span className="chats-page-chat-header-product-info-title">{product?.title ?? "..."}</span>
                    <span className="chats-page-chat-header-product-info-price">${product?.price ?? "..."}</span>
                </div>
                <button className="chats-page-chat-header-product-view-button"
                    onClick={() => history.push(`/products/${product.id}`)}>
                    <TREdgeArrow />
                </button>
            </div>
        </div >
    );
};

export default withScreenSize(ChatHeader);