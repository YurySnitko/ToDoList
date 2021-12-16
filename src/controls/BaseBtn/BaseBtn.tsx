import { BaseBtnProps } from "./BaseBtn.interfaces"
import s from "./BaseBtn.module.css"
import cn from 'classnames'

export const BaseBtn: React.FC<BaseBtnProps> = ({ children, onclick, type, htmlType, block }) => {
    return <button
        className={cn(
            s.baseBtn, 
            { [s.primary]: type === "primary" },
            { [s.status]: type === "status" },
            { [s.block]: block },
            )}
        onClick={onclick}
        type={htmlType}
    >
        {children}
    </button>
}