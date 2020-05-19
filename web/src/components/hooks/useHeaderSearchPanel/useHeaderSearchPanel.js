import { useEffect } from "react";
import { setVisibleHeaderSearchPanel } from "../../other/Header/Header";

const useHeaderSearchPanel = () => {
    useEffect(() => {
        setVisibleHeaderSearchPanel(true);

        return () => setVisibleHeaderSearchPanel(false);
    }, []);
};

export default useHeaderSearchPanel;