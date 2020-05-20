import React, { useEffect, useState } from "react";

import "./Footer.scss";
import { debounce } from "lodash";

const Footer = () => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		setVisibleFooter = debounce(setVisible, 1);
	}, []);

	if (!visible) return null;

	return <footer>Copyright (c) 2020. Privacy Policy</footer>;
};

export default Footer;

export let setVisibleFooter = () => {};
