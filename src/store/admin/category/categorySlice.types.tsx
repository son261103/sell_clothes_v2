import {CategoryDTO} from "../../../types/category.types.tsx";

export interface CategoryState {
    categories: CategoryDTO[];
    selectedCategory: CategoryDTO | null;
    parentCategories: CategoryDTO[];
    childCategories: CategoryDTO[];
    loading: boolean;
    error: string | null;
}

export const initialState: CategoryState = {
    categories: [],
    selectedCategory: null,
    parentCategories: [],
    childCategories: [],
    loading: false,
    error: null
};
