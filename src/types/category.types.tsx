// State Interface
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

// Category DTO Interface
export interface CategoryDTO {
    categoryId?: number;
    categoryName: string;
    categoryDescription: string;
    parentCategoryId: number | null;
    createdAt?: string;
    updatedAt?: string;
}

// API Request Interfaces
export interface CreateCategoryRequest {
    categoryName: string;
    categoryDescription: string;
    parentCategoryId: number | null;
}

export interface UpdateCategoryRequest {
    categoryName: string;
    categoryDescription: string;
    parentCategoryId: number | null;
}

// API Service Interface
export interface CategoryService {
    getAllCategories(): Promise<CategoryDTO[]>;
    getCategoryById(categoryId: number): Promise<CategoryDTO>;
    createParentCategory(request: CreateCategoryRequest): Promise<CategoryDTO>;
    updateParentCategory(categoryId: number, request: UpdateCategoryRequest): Promise<CategoryDTO>;
    deleteParentCategory(categoryId: number): Promise<void>;

    getParentCategories(): Promise<CategoryDTO[]>;
    getChildCategories(parentId: number): Promise<CategoryDTO[]>;
    createChildCategory(parentId: number, request: CreateCategoryRequest): Promise<CategoryDTO>;
    updateChildCategory(parentId: number, childId: number, request: UpdateCategoryRequest): Promise<CategoryDTO>;
    deleteChildCategory(childId: number): Promise<void>;

    searchCategories(keyword: string): Promise<CategoryDTO[]>;
}
