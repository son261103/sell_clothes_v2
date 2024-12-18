import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/admin/components/products/AdminProductEdit.css';
import { useProduct } from '../../../../hooks/useProduct';
import { useCategory } from '../../../../hooks/useCategory';
import { UpdateProductRequest } from '../../../../types/product.types';

const AdminProductEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        getProductById,
        updateExistingProduct,
        selectedProduct,
        loading,
        error
    } = useProduct();

    const {
        getParentCategories,
        parentCategories,
        getChildCategories,
        childCategories,
        loading: categoryLoading
    } = useCategory();

    // State for product data
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [productDescription, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [selectedChildCategories, setSelectedChildCategories] = useState<number[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        if (id) {
            getProductById(parseInt(id));
            getParentCategories();
        }
    }, [id, getProductById, getParentCategories]);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.productName);
            setPrice(selectedProduct.price.toString());
            setStock(selectedProduct.stock.toString());
            setDescription(selectedProduct.productDescription);
            setCategoryId(selectedProduct.categoryId);
            setCurrentImage(selectedProduct.imageUrl || '');

            if (selectedProduct.categoryId) {
                getChildCategories(selectedProduct.categoryId);
            }
        }
    }, [selectedProduct, getChildCategories]);

    // Cleanup function for image preview URL
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);

            // Create preview URL for the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleParentCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedParentId = Number(e.target.value);
        setCategoryId(selectedParentId);
        getChildCategories(selectedParentId);
    };

    const handleChildCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChildId = Number(e.target.value);
        if (selectedChildCategories.includes(selectedChildId)) {
            setSelectedChildCategories(selectedChildCategories.filter(id => id !== selectedChildId));
        } else {
            setSelectedChildCategories([...selectedChildCategories, selectedChildId]);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview('');
        if (document.getElementById('image') instanceof HTMLInputElement) {
            (document.getElementById('image') as HTMLInputElement).value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        const updatedProduct: UpdateProductRequest = {
            productName: name,
            productDescription: productDescription,
            price: parseFloat(price),
            stock: parseInt(stock),
            categoryId: categoryId,
        };

        try {
            await updateExistingProduct(
                parseInt(id),
                updatedProduct,
                image || undefined
            );
            navigate('/admin/products');
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    return (
        <div className="product-add">
            <h2>Edit Product</h2>
            <button className="btn_back_list" onClick={() => navigate('/admin/products')}>
                <FaArrowLeft className="back-arrow" /> Back
            </button>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Product Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <div>
                    <label htmlFor="category">Select Parent Category:</label>
                    <select
                        id="category"
                        value={categoryId || ''}
                        onChange={handleParentCategoryChange}
                        required
                    >
                        <option value="" disabled>Select a parent category</option>
                        {parentCategories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {categoryId && (
                    <div>
                        <label htmlFor="child-categories">Select Child Categories:</label>
                        <select
                            id="child-categories"
                            multiple
                            value={selectedChildCategories.map(String)}
                            onChange={handleChildCategoryChange}
                        >
                            <option value="" disabled>Select child categories</option>
                            {childCategories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="image-upload-container">
                    <div className="image-section">
                        {currentImage && (
                            <div className="current-image">
                                <label>Current Image:</label>
                                <div className="image-preview">
                                    <img src={currentImage} alt="Current product" />
                                </div>
                            </div>
                        )}

                        <div className="new-image">
                            <label htmlFor="image">Upload New Product Image:</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="image-preview" style={{ display: 'grid', placeItems: 'center' }}>
                                    <img src={imagePreview} alt="New image preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={removeImage}
                                    >
                                        Remove New Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={loading || categoryLoading}>
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default AdminProductEdit;