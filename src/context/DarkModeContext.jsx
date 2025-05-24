import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { ConfigProvider } from 'antd';
import { is } from "date-fns/locale";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

    useEffect(function () {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode(prevMode => !prevMode);
    }

    // Use CSS variables for AntD theme tokens
    const theme = {
        token: {
            colorBgBase: 'var(--color-grey-0)',
            colorTextBase: 'var(--color-grey-900)',
            colorPrimary: 'var(--color-brand-600)',
            colorBorder: 'var(--color-grey-200)',
            colorBgContainer: 'var(--color-grey-0)',
            colorText: 'var(--color-grey-900)',
            colorTextHeading: 'var(--color-grey-900)',
            colorBgElevated: 'var(--color-grey-50)',
            colorLink: 'var(--color-brand-600)',
            colorLinkHover: 'var(--color-brand-700)',
            colorLinkActive: 'var(--color-brand-800)',
            fontWeightLabel: 500,

        },
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <ConfigProvider theme={isDarkMode ? { ...theme } : {}}>
                {children}
            </ConfigProvider>
        </DarkModeContext.Provider >
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
}
export { DarkModeProvider, useDarkMode };