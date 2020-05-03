import { gql } from "apollo-boost";




export const PRODUCTS_QUERY = gql`
query ProductsQuery($title: String!, $locationId: ID, $category: String!, $priceFrom: Float!, $priceTo: Float!, $page: Int, $limit: Int) {
    products(
        title: $title, 
        location: "", 
        locationId: $locationId, 
        category: $category, 
        priceFrom: $priceFrom, 
        priceTo: $priceTo, 
        page: $page, 
        limit: $limit
    ) {
  id
  title
  price
  saved
  imageName
}
productsCount(
    title: $title, 
    location: "", 
    locationId: $locationId, 
    category: $category, 
    priceFrom: $priceFrom, 
    priceTo: $priceTo, 
    page: $page, 
    limit: $limit
)
  }
`;

export const SAVED_PRODUCTS_QUERY = gql`
query {
    savedProducts(page: 1, limit: 10) {
        id
        title
        price
        saved
        imageName
    }
    savedProductsCount
}`;