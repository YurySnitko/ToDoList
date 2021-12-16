export interface BaseBtnProps {
    onclick?: () => void
    type: BtnType
    htmlType?: "button" | "submit" | "reset"
    block?: boolean
}

export type BtnType = "status" | "primary"