import React, {useState, useEffect} from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import '../../../../styles/admin/components/categories/AdminCategoryAdd.css';
import useCategory from '../../../../hooks/useCategory';
import {CreateCategoryRequest} from '../../../../types/category.types';

const AdminCategoryAdd: React.FC = () => {
    const navigate = useNavigate();
    const {
        parentCategories,
        getParentCategories,
        createNewParentCategory,
        createNewChildCategory,
        loading,
        error
    } = useCategory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(true); // Checkbox state to determine parent category
    const [selectedParentId, setSelectedParentId] = useState<number | null>(null); // Parent category ID

    useEffect(() => {
        // Fetch parent categories when component mounts
        getParentCategories();
    }, [getParentCategories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory: CreateCategoryRequest = {
            categoryName: name,
            categoryDescription: description,
            parentCategoryId: isParent ? null : selectedParentId,
        };

        try {
            if (isParent) {
                await createNewParentCategory(newCategory); // Create parent category
            } else if (selectedParentId) {
                await createNewChildCategory(selectedParentId, newCategory); // Create child category
            } else {
                alert('Please select a parent category for the new child category.');
                return;
            }

            setName('');
            setDescription('');
            setIsParent(true);
            setSelectedParentId(null);
            navigate('/admin/categories'); // Navigate back to category list after successful creation
        } catch (err) {
            console.error('Failed to add category:', err);
        }
    };

    return (
        <div className="category-add">
            <div className="header-actions">
                <h2>Add Category</h2>
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
                                <option key={parent.categoryId} value={parent.categoryId}>
                                    {parent.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Add Category'}
                </button>
            </form>
        </div>
    );
};

export default AdminCategoryAdd;
