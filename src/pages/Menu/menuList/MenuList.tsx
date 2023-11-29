import ProductCard from "../../../components/productCard/ProductCard"
import { MenuListProps } from "./menuList.props"
import styles from "./MenuList.module.css"

const MenuList = ({ products }: MenuListProps) => {
    return (
        <div className={styles['wrapper']}>
            {products.map((item) => (
                <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.ingredients.join(",")}
                    rating={item.rating}
                    price={item.price}
                    image={item.image}
                />
            ))}
        </div>
    )
}

export default MenuList