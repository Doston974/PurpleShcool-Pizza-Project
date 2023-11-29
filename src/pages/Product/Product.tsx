import { Await, useLoaderData } from "react-router-dom"
import { ProductProps } from "../../types/ProductTypes"
import { Suspense } from "react"

const Product = () => {
    const data = useLoaderData() as { data: ProductProps };

    return (
        <>
            <Suspense fallback={"Yuklanmoqda..."}>
                <Await
                    resolve={data.data}
                >
                    {({ data }: { data: ProductProps }) => (
                        <div>
                            Product  {data.name}
                        </div>
                    )}
                </Await>
            </Suspense>
        </>
    )
}

export default Product