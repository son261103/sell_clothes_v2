import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';
import { CategoryState } from './categorySlice.types';

// Base Selector
const selectCategoryState = (state: RootState): CategoryState => state.category;

// Basic Selectors
export const selectAllCategories = createSelector(
    [selectCategoryState],
    (categoryState) => categoryState.categories
);

export const selectParentCategories = createSelector(
    [selectCategoryState],
    (categoryState) => categoryState.parentCategories
);

export const selectChildCategories = createSelector(
    [selectCategoryState],
    (categoryState) => categoryState.childCategories
);

// Specific Category Selectors
export const selectCategoryById = (categoryId: number) =>
    createSelector(
        [selectAllCategories],
        (categories) => categories.find((category) => category.categoryId === categoryId)
    );

export const selectParentCategoryById = (categoryId: number) =>
    createSelector(
        [selectParentCategories],
        (parentCategories) => parentCategories.find((category) => category.categoryId === categoryId)
    );

export const selectChildCategoryById = (childId: number) =>
    createSelector(
        [selectChildCategories],
        (childCategories) => childCategories.find((category) => category.categoryId === childId)
    );

export const selectChildCategoriesByParentId = (parentId: number) =>
    createSelector(
        [selectAllCategories],
        (categories) => categories.filter((category) => category.parentCategoryId === parentId)
    );

// Selected Category Related
export const selectSelectedCategory = createSelector(
    [selectCategoryState],
    (categoryState) => categoryState.selectedCategory
);

export const selectSelectedCategoryChildren = createSelector(
    [selectSelectedCategory, selectAllCategories],
    (selectedCategory, categories) =>
        selectedCategory
            ? categories.filter((category) => category.parentCategoryId === selectedCategory.categoryId)
            : []
);

export const selectSelectedCategoryParent = createSelector(
    [selectSelectedCategory, selectAllCategories],
    (selectedCategory, categories) =>
        selectedCategory?.parentCategoryId
            ? categories.find((category) => category.categoryId === selectedCategory.parentCategoryId)
            : null
);

// Status Selectors
export const selectCategoryLoading = createSelector(
    [selectCategoryState],
    (categoryState) => categoryState.loading
);

export const selectCategoryError = createSelector(
    [selectCategoryState],
    (categoryState) => categoryState.error
);

// Search and Filter Selectors
export const selectCategoriesByKeyword = (keyword: string) =>
    createSelector(
        [selectAllCategories],
        (categories) =>
            categories.filter((category) =>
                category.categoryName.toLowerCase().includes(keyword.toLowerCase()) ||
                category.categoryDescription.toLowerCase().includes(keyword.toLowerCase())
            )
    );

export const selectParentCategoriesByKeyword = (keyword: string) =>
    createSelector(
        [selectParentCategories],
        (parentCategories) =>
            parentCategories.filter((category) =>
                category.categoryName.toLowerCase().includes(keyword.toLowerCase()) ||
                category.categoryDescription.toLowerCase().includes(keyword.toLowerCase())
            )
    );

export const selectChildCategoriesByKeyword = (keyword: string) =>
    createSelector(
        [selectChildCategories],
        (childCategories) =>
            childCategories.filter((category) =>
                category.categoryName.toLowerCase().includes(keyword.toLowerCase()) ||
                category.categoryDescription.toLowerCase().includes(keyword.toLowerCase())
            )
    );

// Complex/Combined Selectors
export const selectCategoryStatus = createSelector(
    [selectCategoryLoading, selectCategoryError],
    (loading, error) => ({ loading, error })
);

export const selectCategoryDetails = createSelector(
    [selectAllCategories, selectParentCategories, selectChildCategories],
    (categories, parentCategories, childCategories) => ({
        categories,
        parentCategories,
        childCategories,
        totalCategories: categories.length,
        totalParentCategories: parentCategories.length,
        totalChildCategories: childCategories.length
    })
);

export const selectCategoryHierarchy = createSelector(
    [selectParentCategories, selectAllCategories],
    (parentCategories, allCategories) =>
        parentCategories.map(parent => ({
            ...parent,
            children: allCategories.filter(category => category.parentCategoryId === parent.categoryId)
        }))
);

export const selectCategoryStats = createSelector(
    [selectAllCategories, selectParentCategories, selectChildCategories],
    (categories, parentCategories, childCategories) => ({
        totalCategories: categories.length,
        totalParentCategories: parentCategories.length,
        totalChildCategories: childCategories.length,
        categoriesWithoutParent: categories.filter(cat => cat.parentCategoryId === null).length,
        averageChildrenPerParent: parentCategories.length
            ? (childCategories.length / parentCategories.length).toFixed(2)
            : 0
    })
);