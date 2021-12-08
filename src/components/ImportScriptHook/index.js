import { useEffect } from "react";

const index = resourceUrl => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const script = document.createElement('script');
        script.src = resourceUrl;
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [resourceUrl]);
};
export default index;