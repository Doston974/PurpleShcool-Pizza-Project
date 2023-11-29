// import { FC } from "react"
import styles from "./Butoon.module.css"
import { ButtonProps } from "./Button.props"
import cn from "classnames"

// 1 xil ko'rinishda yozish
// ikkalasiyam bir xil mavqega ega

// export const ButtonAlt: FC<ButtonProps> = ({ className, children, ...props }) => {
//     return (
//         <button className={cn(styles["button"], styles["accent"], className)}{...props}>
//             {children}
//         </button>
//     )
// }

// 2 xil ko'rinishda yozsa bo'ladi

const Button = ({ children, className, appearence = "small", ...props }: ButtonProps) => {
    return (
        <button className={cn(styles["button"], styles["accent"], className, {
            [styles["small"]]: appearence === "small",
            [styles["big"]]: appearence === "big"
        })}{...props}>
            {children}
        </button>
    )
}

export default Button