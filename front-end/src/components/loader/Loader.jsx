import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { LoaderWrapper } from "../../assets/styles/SharedStyles.styles";
import { BounceLoader } from "react-spinners";

const Loader = ({ loading }) => {
    const user = useSelector((state) => state.user);
    return (
        <>
            {(loading || user.loading) && (
                <LoaderWrapper>
                    <BounceLoader
                        className="loader"
                        color="#000000"
                        speedMultiplier={1}
                    />
                </LoaderWrapper>
            )}
        </>
    )
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Loader;