import React, { useState, useEffect } from 'react';

import "./Snackbar.scss";
import SnackbarNotification from './SnackbarNotification';

let _notifications = [];

const Snackbar = () => {
    const [notifications, setNotification] = useState([]);

    useEffect(() => {
        notifyAny = (next) => {
            setNotification(_notifications = [..._notifications, next]);
            setTimeout(() => {
                setNotification(_notifications = _notifications.filter(n => n.id !== next.id));
            }, 4000);
        }

        notifyInfo = (value) => notifyAny({ id: notifyId++, type: "info", value });
        notifyWarning = (value) => notifyAny({ id: notifyId++, type: "warning", value });
        notifyError = (value) => notifyAny({ id: notifyId++, type: "error", value });

        notifyWithType = (type, value) => {
            switch (type) {
                case "info": return notifyInfo(value);
                case "warning": return notifyWarning(value);
                case "error": return notifyError(value);
                default: throw new Error("Unknown type for notify");
            }
        }
    }, []);// eslint-disable-line

    return (
        <div className="snackbar">
            {
                notifications.map(({ id, type, value }) =>
                    <SnackbarNotification key={id} type={type} value={value} />
                )
            }
        </div>
    );
}

let notifyId = 1;

let notifyAny = (next) => { }

export let notifyInfo = (value) => { }
export let notifyWarning = (value) => { }
export let notifyError = (value) => { }

export let notifyWithType = (type, value) => { }

export default Snackbar;