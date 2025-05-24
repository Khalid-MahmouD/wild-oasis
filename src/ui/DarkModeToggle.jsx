import { Button } from "antd"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {

    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <Button
            icon={!isDarkMode
                ? <HiOutlineMoon />
                : <HiOutlineSun />}
            onClick={toggleDarkMode}

        />
    )
}

export default DarkModeToggle
