import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";
import HeaderMenu from "./HeaderMenu";
import { Avatar } from "antd";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return <StyledHeader>
    {/* <Avatar /> */}
    <UserAvatar />
    <HeaderMenu />
  </StyledHeader>;
}

export default Header;
