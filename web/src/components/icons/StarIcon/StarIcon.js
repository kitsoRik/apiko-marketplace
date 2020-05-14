import React from 'react';

import "./StarIcon.scss";

const StarIcon = ({
	className,
	semi = false,
	empty = false,
	onLeftHover = () => { },
	onRightHover = () => { },
	...props }) => {

	const onMouseMove = (e) => {
		const width = e.currentTarget.clientWidth;
		const posX = e.clientX;
		if (false) onLeftHover();
		else onRightHover();
	}
	return (
		<svg className={`star-icon ${className ?? ""}`} {...props} onMouseMove={onMouseMove} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 608.4 595.3" xmlSpace="preserve">
			<g>
				<g>
					<g>

						<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="308.8302" y1="527.6319" x2="308.8302" y2="-57.1526" gradientTransform="matrix(1.0011 -4.227138e-05 4.201720e-05 0.9984 -5.0009 62.7679)">
							<stop offset="0" style={{ stopColor: "#FCFF13" }} />
							<stop offset="0.1979" style={{ stopColor: "#FCF215" }} />
							<stop offset="0.7081" style={{ stopColor: "#FED51B" }} />
							<stop offset="1" style={{ stopColor: "#FECA1D" }} />
						</linearGradient>
						{(!semi && !empty) && <path className="st0" d="M267.8,28.7c0,0-55.6,115.1-70.3,145.5c-32.8,4.9-157.2,23.3-157.2,23.3c-15.3,2.2-27.9,13.2-32.7,28.1
				c-1.3,4.2-2,8.5-2,12.8c0,11,4.3,21.7,12.3,29.6c0,0,90,89.6,113.8,113.2c-5.6,33.3-26.9,159.9-26.9,159.9
				c-0.4,2.3-0.6,4.7-0.6,7c0,13.1,6.1,25.6,16.7,33.5c12.5,9.2,29,10.5,42.7,3.1c0,0,111.3-59.7,140.6-75.5
				c29.3,15.7,140.6,75.5,140.6,75.5c13.7,7.3,30.2,6.1,42.7-3.2c10.6-7.9,16.7-20.3,16.7-33.5c0-2.3-0.2-4.7-0.6-7
				c0,0-21.3-126.5-26.9-159.9c23.7-23.6,113.8-113.2,113.8-113.2c7.9-7.9,12.2-18.6,12.2-29.6c0-4.3-0.6-8.6-2-12.8
				c-4.8-15-17.5-25.9-32.7-28.2c0,0-124.5-18.5-157.2-23.3c-14.7-30.3-70.3-145.4-70.3-145.4c-6.8-14.1-20.9-23.1-36.3-23.1
                C288.7,5.7,274.6,14.6,267.8,28.7z" />}
						<g>

							<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="148.405" y1="42.0436" x2="296.1122" y2="220.3373" gradientTransform="matrix(1.0011 -4.227138e-05 4.201720e-05 0.9984 -5.0009 62.7679)">
								<stop offset="0" style={{ stopColor: "#FFFFFF" }} />
								<stop offset="0.1886" style={{ stopColor: "#FFFFCA" }} />
								<stop offset="0.3752" style={{ stopColor: "#FFFF9D" }} />
								<stop offset="0.5532" style={{ stopColor: "#FFFF7A" }} />
								<stop offset="0.7202" style={{ stopColor: "#FFFF60" }} />
								<stop offset="0.8721" style={{ stopColor: "#FFFF51" }} />
								<stop offset="0.9951" style={{ stopColor: "#FFFF4C" }} />
							</linearGradient>
							{!empty && <path className="st1" d="M421,175.7c-3.9-0.6-7.4-1.1-10.1-1.5c-14.7-30.3-70.3-145.4-70.3-145.4c-6.8-14.1-20.9-23.1-36.3-23.1
					c-15.4,0-29.5,8.9-36.3,23c0,0-55.6,115.1-70.3,145.5c-32.8,4.9-157.2,23.3-157.2,23.3c-15.3,2.2-27.9,13.2-32.7,28.1
					c-1.3,4.2-2,8.5-2,12.8c0,11,4.3,21.7,12.3,29.6c0,0,90,89.6,113.8,113.2c-0.1,0.3-0.1,0.6-0.2,0.9
                    C178.1,307.4,264.7,217,421,175.7z" />}
						</g>
						<path className="st2" d="M262.8,26.2l-70.3,145.5l4.2-3.1L39.5,191.8C22,194.4,7.7,206.7,2.3,223.9c-1.5,4.7-2.3,9.6-2.3,14.6
				c0,12.6,5.1,24.9,13.9,33.7l113.8,113.2l-1.6-5.1L99.2,540.2c-0.4,2.6-0.7,5.3-0.7,8c0,15,7.1,29.3,19,38.1
				c14.3,10.6,33,12,48.6,3.6l140.6-75.5l-5.2,0l140.6,75.5c15.7,8.4,34.3,7,48.6-3.6c11.9-8.8,19-23.1,19-38.1c0-2.6-0.2-5.3-0.7-8
				l-26.9-159.9l-1.7,5.1l113.8-113.2c8.9-8.8,13.9-21.1,13.9-33.8c0-4.9-0.8-9.9-2.3-14.5c-5.5-17.2-19.8-29.5-37.3-32.1
				l-157.2-23.3l4.2,3.1L345.5,26.2C337.7,10,321.8-0.1,304.1,0C286.5-0.1,270.6,10,262.8,26.2z M304.1,11.4
				c13.4,0,25.4,7.6,31.3,19.9l70.3,145.4l1.3,2.7l2.9,0.4l157.2,23.3c13.2,2,24,11.3,28.2,24.3c1.1,3.5,1.7,7.2,1.7,11
				c0,9.5-3.8,18.8-10.5,25.5L472.8,377.2l-2.1,2.1l0.5,3l26.9,159.9c0.3,2,0.5,4,0.5,6c0,11.4-5.4,22.2-14.4,28.8
				c-10.8,8-24.9,9.1-36.7,2.7l-140.6-75.5l-2.6-1.4l-2.6,1.4L161,579.7c-11.9,6.4-25.9,5.3-36.8-2.7c-9-6.7-14.4-17.4-14.4-28.8
				c0-2,0.2-4,0.5-6l26.8-159.9l0.5-3l-2.1-2.1L21.8,264c-6.7-6.7-10.5-16-10.6-25.5c0-3.7,0.6-7.4,1.7-11c4.1-13,15-22.3,28.2-24.3
				l157.2-23.3l2.9-0.4l1.3-2.7l70.3-145.4C278.8,19,290.8,11.4,304.1,11.4z" />
					</g>
				</g>
			</g>
		</svg>


	)
};

export default StarIcon;