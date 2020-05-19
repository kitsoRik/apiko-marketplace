import { useEffect } from "react";
import { setVisibleFooter } from '../../other/Footer/Footer';

const useHidingFooter = () => {
    useEffect(() => {
        setVisibleFooter(false);
        return () => setVisibleFooter(true);
    }, [])
};

export default useHidingFooter;