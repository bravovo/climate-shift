import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { GoUpContainer } from "./UpButton.styles";

const UpButton = () => {
    const [upButton, setUpButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setUpButton(true);
            } else {
                setUpButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleGoUpButtonClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {upButton && (
                <GoUpContainer onClick={handleGoUpButtonClick}>
                    <FaAngleUp size={20} />
                </GoUpContainer>
            )}
        </>
    );
};

export default UpButton;
