import { BaseBtn } from "controls/BaseBtn/BaseBtn"
import { useHistory } from "react-router"
import { NavigateBtnProps } from "./NavigateBtn.interfaces"

export const NavigateBtn: React.FC<NavigateBtnProps> = ({ children, path }) => {
    const history = useHistory()

    const handleClick = () => {
        history.push(path)
    }
    return <BaseBtn type="primary" onclick={handleClick}>{children}</BaseBtn>
}