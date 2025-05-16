import PropTypes from "prop-types";
import {
    Titleh3,
} from "../../assets/styles/SharedStyles.styles";
import { Coloredh3, Styledh3 } from "./CardDate.styles";
const CardDate = ({ date, icon, desc, small = false, addValue }) => {
    return small ? (
        <>
            <Styledh3>{date}</Styledh3>
            {icon}
            <Coloredh3>{desc}</Coloredh3>
            {addValue}
        </>
    ) : (
        <>
            <Titleh3>{date}</Titleh3>
            {icon}
            <Titleh3>{desc}</Titleh3>
            {addValue}
        </>
    );
};
CardDate.propTypes = {
    date: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    desc: PropTypes.string.isRequired,
    small: PropTypes.bool,
    addValue: PropTypes.node,
};
export default CardDate;
