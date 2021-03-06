import React from "react";

import "./ModalDialog.scss";
import Form from "../Form";

const ModalDialog = ({
	className,
	style,
	opened,
	onClosed,
	children,
	...props
}) => {
	return (
		<div
			style={{ display: opened ? "flex" : "none" }}
			className={`modal-dialog`}
			onClick={onClosed}
			{...props}
		>
			<Form
				className={`modal-dialog-form ${className ?? ""}`}
				style={style}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</Form>
		</div>
	);
};

export default ModalDialog;
