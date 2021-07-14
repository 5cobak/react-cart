// fetch products from fakestoreapi.com
const fetchProducts = () => {
	const response = fetch('https://fakestoreapi.com/products?limit=2');
	return response;
}

export default fetchProducts;