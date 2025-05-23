import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";
import { Button } from "antd";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`

function HeaderMenu() {
    const navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <li>
                <Button
                    onClick={() => navigate('/account')}
                    icon={<HiOutlineUser />}>
                </Button>
            </li >
            <li>
                <LogOut />
            </li>
        </StyledHeaderMenu >
    )
}

export default HeaderMenu
