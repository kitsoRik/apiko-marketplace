import React from "react";

import ChildfishIcon from "../components/icons/ChildfishIcon/";
import ReadPropertyIcon from "../components/icons/ReadPropertyIcon/";
import TransportIcon from "../components/icons/TransportIcon";
import SparesIcon from "../components/icons/SparesIcon";
import WorkIcon from "../components/icons/WorkIcon";
import AnimalsIcon from "../components/icons/AnimalsIcon";
import HomeIcon from "../components/icons/HomeIcon";
import GardenIcon from "../components/icons/GardenIcon";
import ElectronicsIcon from "../components/icons/ElectronicsIcon";
import BusinessIcon from "../components/icons/BusinessIcon";
import FashionIcon from "../components/icons/FashionIcon";
import StyleIcon from "../components/icons/StyleIcon";
import HobbyIcon from "../components/icons/HobbyIcon";
import SportIcon from "../components/icons/SportIcon";

export const productCategories = [
	{ icon: <ChildfishIcon />, key: "childish", value: "Childish" },
	{
		icon: <ReadPropertyIcon />,
		key: "real_property",
		value: "Real property",
	},
	{ icon: <TransportIcon />, key: "transport", value: "Transport" },
	{ icon: <SparesIcon />, key: "spares", value: "Spares" },
	{ icon: <WorkIcon />, key: "work", value: "Work" },
	{ icon: <AnimalsIcon />, key: "animals", value: "Animals" },
	{ icon: <HomeIcon />, key: "home", value: "Home" },
	{ icon: <GardenIcon />, key: "garden", value: "Garden" },
	{ icon: <ElectronicsIcon />, key: "electronics", value: "Electronics" },
	{ icon: <BusinessIcon />, key: "business", value: "Business" },
	{ icon: <FashionIcon />, key: "fashion", value: "Fashion" },
	{ icon: <StyleIcon />, key: "style", value: "Style" },
	{ icon: <HobbyIcon />, key: "hobby", value: "Hobby" },
	{ icon: <SportIcon />, key: "sport", value: "Sport" },
];
