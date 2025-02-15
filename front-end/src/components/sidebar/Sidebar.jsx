import { useEffect, useRef, useState } from "react";
import {
    Container,
    LinksContainer,
    OtherContainer,
    RoutesContainer,
    SidebarContainer,
    StyledButton,
    StyledLink,
} from "./Sidebar.styles";
import { Link } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { useSelector } from 'react-redux';

const VERSION = import.meta.env.VITE_VERSION;

const Sidebar = () => {
    const lang = useSelector((state) => state.dataLang);
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Container ref={sidebarRef} $variant={isOpen}>
            <StyledButton onClick={() => setIsOpen(!isOpen)} $variant={isOpen}>
                <span></span>
                <span></span>
                <span></span>
            </StyledButton>
            {isOpen && (
                <SidebarContainer>
                    <RoutesContainer>
                        <StyledLink>
                            <Link to="/climate">{lang === 'eng' ? 'Climate' : "Клімат"}</Link>
                        </StyledLink>
                        <StyledLink>
                            <Link to="/weather">{lang === 'eng' ? 'Weather' : "Погода"}</Link>
                        </StyledLink>
                        <StyledLink>
                            <Link to="/register">{lang === 'eng' ? 'Profile' : "Профіль"}</Link>
                        </StyledLink>
                    </RoutesContainer>
                    <OtherContainer>
                        <LinksContainer>
                            <a
                                href="https://github.com/bravovo/climate-shift"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IoLogoGithub size={48} />
                            </a>
                        </LinksContainer>
                        <p>Climate-shift | v{VERSION}</p>
                    </OtherContainer>
                </SidebarContainer>
            )}
        </Container>
    );
};

export default Sidebar;
