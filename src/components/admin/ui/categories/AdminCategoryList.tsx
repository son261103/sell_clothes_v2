import React, { useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useCategory from '../../../../hooks/useCategory';
import '../../../../styles/admin/components/categories/AdminCategoryList.css';
import { CategoryDTO } from '../../../../types/category.types';

const AdminCategoryList: React.FC = () => {
    const navigate = useNavigate();
    const {
        categories,
        getAllCategories,
        removeParentCategory,
        removeChildCategory,
        parentCategories,
        error,
        loading
    } = useCategory();

    // Handling loading and error states
    useEffect(() => {
        const loadCategories = async () => {
            try {
                await getAllCategories(); // Fetch all categories from the API
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };

        loadCategories();
    }, [getAllCategories]);

    const handleAddCategory = () => {
        navigate('/admin/categories/add');
    };

    const handleEditCategory = (id: number) => {
        navigate(`/admin/categories/edit/${id}`);
    };

    const handleDeleteCategory = async (category: CategoryDTO) => {
        if (!category.categoryId) {
            console.error('Cannot delete category without an ID');
            return;
        }

        // Use const instead of let for confirmMessage
        const confirmMessage = category.parentCategoryId
            ? `Are you sure you want to delete the child category "${category.categoryName}"?`
            : `Warning: Deleting parent category "${category.categoryName}" will also delete all its child categories. Are you sure?`;

        const confirmDelete = window.confirm(confirmMessage);
        if (confirmDelete) {
            try {
                if (category.parentCategoryId) {
                    // If it's a child category, use removeChildCategory
                    await removeChildCategory(category.categoryId);
                } else {
                    // If it's a parent category, use removeParentCategory
                    await removeParentCategory(category.categoryId);
                }
                await getAllCategories(); // Refetch categories after deletion
            } catch (err) {
                console.error('Failed to delete category:', err);
            }
        }
    };

    // Function to find parent category name
    const getParentCategoryName = (parentId: number | null): string => {
        if (!parentId) return 'Parent';
        const parentCategory = parentCategories.find(cat => cat.categoryId === parentId);
        return parentCategory ? parentCategory.categoryName : 'N/A';
    };

    // Render loading or error state if needed
    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Ensure categories is a valid array before rendering
    const validCategories = Array.isArray(categories) ? categories : [];

    return (
        <div className="category-list">
            <h2>Category List</h2>
            <button onClick={handleAddCategory} className="btn-add">
                <FaPlus /> Thêm Danh Mục
            </button>
            {validCategories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Parent Category</th>
                        <th>Description</th>
                        <th>Ngày Tạo</th>
                        <th>Ngày Cập Nhật</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {validCategories.map((category) => (
                        <tr
                            key={category.categoryId}
                            className={category.parentCategoryId ? 'child-category' : 'parent-category'}
                        >
                            <td>#{category.categoryId ?? 'N/A'}</td>
                            <td>
                                {category.parentCategoryId && '↳ '}{category.categoryName}
                            </td>
                            <td>{getParentCategoryName(category.parentCategoryId)}</td>
                            <td>{category.categoryDescription}</td>
                            <td>{category.createdAt}</td>
                            <td>{category.updatedAt}</td>
                            <td className="actions">
                                <button
                                    onClick={() => category.categoryId && handleEditCategory(category.categoryId)}
                                    className="btn-edit"
                                    disabled={!category.categoryId}
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category)}
                                    className="btn-delete"
                                >
                                    <FaTrashAlt /> Delete
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

export default AdminCategoryList;
