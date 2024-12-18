import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/admin/components/categories/AdminCategoryEdit.css';
import useCategory from '../../../../hooks/useCategory';
import { UpdateCategoryRequest } from '../../../../types/category.types';

const AdminCategoryEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const categoryId = id ? parseInt(id) : null;

    const {
        selectedCategory,
        getCategoryById,
        updateExistingParentCategory,
        updateExistingChildCategory,
        parentCategories,
        getParentCategories,
        loading,
        error
    } = useCategory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(true);
    const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

    // Fetch category data when component mounts
    useEffect(() => {
        const loadCategory = async () => {
            if (categoryId) {
                try {
                    await getCategoryById(categoryId);
                    await getParentCategories(); // Load parent categories for dropdown
                } catch (err) {
                    console.error('Failed to load category:', err);
                }
            }
        };

        loadCategory();
    }, [categoryId, getCategoryById, getParentCategories]);

    // Update form when selected category changes
    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.categoryName);
            setDescription(selectedCategory.categoryDescription || '');
            setIsParent(!selectedCategory.parentCategoryId);
            setSelectedParentId(selectedCategory.parentCategoryId || null);
        }
    }, [selectedCategory]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryId) {
            console.error('Category ID is required');
            return;
        }

        const updateRequest: UpdateCategoryRequest = {
            categoryName: name,
            categoryDescription: description,
            parentCategoryId: isParent ? null : selectedParentId,
        };

        try {
            if (isParent) {
                await updateExistingParentCategory(categoryId, updateRequest);
            } else if (selectedParentId) {
                await updateExistingChildCategory(selectedParentId, categoryId, updateRequest);
            } else {
                alert('Please select a parent category for the child category.');
                return;
            }

            navigate('/admin/categories'); // Navigate back to category list after successful update
        } catch (err) {
            console.error('Failed to update category:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!selectedCategory && !loading) {
        return <div>Category not found</div>;
    }

    return (
        <div className="category-edit">
            <div className="header-actions">
                <h2>Edit Category</h2>
                <button className="btn_back_list" onClick={() => navigate('/admin/categories')}>
                    <FaArrowLeft className="back-arrow"/> Back
                </button>
            </div>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <input
                        type="text"
                        placeholder="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Category Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <div className="category-type">
                        <label>
                            <input
                                type="checkbox"
                                checked={isParent}
                                onChange={(e) => setIsParent(e.target.checked)}
                            />
                            Is Parent Category
                        </label>
                    </div>

                    {!isParent && (
                        <div className="parent-category-select">
                            <label htmlFor="parent-category">Select Parent Category:</label>
                            <select
                                id="parent-category"
                                value={selectedParentId || ''}
                                onChange={(e) => setSelectedParentId(Number(e.target.value) || null)}
                                required
                            >
                                <option value="" disabled>Select a parent category</option>
                                {parentCategories.map((parent) => (
                                    <option
                                        key={parent.categoryId}
                                        value={parent.categoryId}
                                        disabled={parent.categoryId === categoryId} // Prevent selecting self as parent
                                    >
                                        {parent.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Category'}
                    </button>
                </form>
            </div>
            );
            };

            export default AdminCategoryEdit;