import React, {useEffect} from 'react';
import {FaPlus, FaEdit, FaTrashAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import '../../../../styles/admin/components/products/AdminProductList.css';
import useProduct from "../../../../hooks/useProduct.tsx";
import {ProductDTO} from "../../../../types/product.types.tsx";


const AdminProductList: React.FC = () => {
    const navigate = useNavigate();
    const {
        products,
        getAllProducts,
        removeProduct,
        error,
        loading

    } = useProduct();

    // Handling loading and error states
    useEffect(() => {
        const loadProducts = async () => {
            try {
                await getAllProducts();
            } catch (err) {
                console.error('Failed to load products:', err);
            }
        };

        loadProducts();
    }, [getAllProducts]);

    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    const handleEditProduct = (productId: number) => {
        navigate(`/admin/products/edit/${productId}`);
    };

    const handleDeleteProduct = async (product: ProductDTO) => {
        if (!product.productId){
            console.log('Cannot delete product:', product);
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete the product "${product.productName}"?`);
        if (confirmDelete) {
            try {
                await removeProduct(product.productId);
                await getAllProducts();
            } catch (err) {
                console.error('Failed to delete product:', err);
            }
        }
    };

    // Render the product list
    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const validProducts = Array.isArray(products) ? products : [];

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <button onClick={handleAddProduct} className="btn-add">
                <FaPlus/> Thêm Sản Phẩm
            </button>
            {validProducts.length === 0 ? (<p>No products found.</p>) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {validProducts.map((product) => (
                        <tr key={product.productId} className={'product-row'}>
                            <td>#{product.productId ?? 'N/A'}</td>
                            <td>{product.productName}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{product.categoryId ?? 'N/A'}</td>
                            <td>{product.productDescription}</td>
                            <td>
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.productName}
                                        style={{width: '100px', height: '100px', objectFit: 'cover'}}
                                    />
                                ) : (
                                    'https://via.placeholder.com/100'
                                )}
                            </td>
                            <td className="actions">
                                <button
                                    onClick={() => product.productId && handleEditProduct(product.productId)}
                                    className="btn-edit"
                                    disabled={!product.productId}
                                >
                                    <FaEdit/> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product)}
                                    className="btn-delete"
                                >
                                    <FaTrashAlt/> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminProductList;
