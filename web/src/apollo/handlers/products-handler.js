import { SAVED_PRODUCTS_QUERY } from "../queries/products-queries";
import client from "..";
import gql from "graphql-tag";

export const changeProductStateHandler = (product, saved) => {
    try {
        const query = client.readQuery({ query: SAVED_PRODUCTS_QUERY });
        let savedProducts;
        if (saved) savedProducts = query.savedProducts.concat([{ ...product, saved }])
        else savedProducts = query.savedProducts.filter(p => p.id !== product.id);
        client.writeQuery({
            query: SAVED_PRODUCTS_QUERY,
            data: {
                savedProducts
            }
        });

    } catch (e) {

    }

    client.writeFragment({
        id: product.id,
        fragment: gql`
            fragment saveProduct on Product {
                saved
            }
        `,
        data: {
            saved
        }
    });
}