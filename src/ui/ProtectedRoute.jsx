import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProtectedRoute({ children }) {

    // 1. load the authenticated user
    const { user, isLoading, isAuthenticated } = useUser();

    // 2. while loading, show a loading spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 3. if there is NO authenticated user, redirect to the login page
    if (!isAuthenticated && !isLoading) return <Navigate to="/login" replace />;

    // 4. if there IS a user, render the app
    if (isAuthenticated)
        return children;
}

export default ProtectedRoute;
