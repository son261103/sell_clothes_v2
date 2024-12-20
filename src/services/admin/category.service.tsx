import adminApi from "../../config/admin.api.config";
import {
    CategoryDTO,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    CategoryService as ICategoryService
} from "../../types/category.types";
import {
    CATEGORY_API_ENDPOINTS,
    CATEGORY_ERROR_MESSAGE,
    CATEGORY_CREATION_ERROR_MESSAGE,
    CATEGORY_UPDATE_ERROR_MESSAGE,
    CATEGORY_DELETION_ERROR_MESSAGE,
    CATEGORY_SEARCH_ERROR_MESSAGE,
} from "../../constants/category.constant";
import { formatCategoryError } from "../../utils/category.utils";

class CategoryService implements ICategoryService {
    async getAllCategories(): Promise<CategoryDTO[]> {
        try {
            const response = await adminApi.get<CategoryDTO[]>(CATEGORY_API_ENDPOINTS.GET_ALL_CATEGORIES);
            console.log('API Response:', response.data);
            return response.data;

        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async getCategoryById(categoryId: number): Promise<CategoryDTO> {
        try {
            const response = await adminApi.get<CategoryDTO>(CATEGORY_API_ENDPOINTS.GET_CATEGORY_BY_ID(categoryId));
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async createParentCategory(request: CreateCategoryRequest): Promise<CategoryDTO> {
        try {
            const response = await adminApi.post<CategoryDTO>(CATEGORY_API_ENDPOINTS.CREATE_PARENT_CATEGORY, request);
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_CREATION_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async updateParentCategory(categoryId: number, request: UpdateCategoryRequest): Promise<CategoryDTO> {
        try {
            const response = await adminApi.put<CategoryDTO>(
                CATEGORY_API_ENDPOINTS.UPDATE_PARENT_CATEGORY(categoryId),
                request
            );
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_UPDATE_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async deleteParentCategory(categoryId: number): Promise<void> {
        try {
            await adminApi.delete(CATEGORY_API_ENDPOINTS.DELETE_PARENT_CATEGORY(categoryId));
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_DELETION_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async getParentCategories(): Promise<CategoryDTO[]> {
        try {
            const response = await adminApi.get<CategoryDTO[]>(CATEGORY_API_ENDPOINTS.GET_PARENT_CATEGORIES);
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async getChildCategories(parentId: number): Promise<CategoryDTO[]> {
        try {
            const response = await adminApi.get<CategoryDTO[]>(CATEGORY_API_ENDPOINTS.GET_CHILD_CATEGORIES(parentId));
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async createChildCategory(parentId: number, request: CreateCategoryRequest): Promise<CategoryDTO> {
        try {
            const response = await adminApi.post<CategoryDTO>(
                CATEGORY_API_ENDPOINTS.CREATE_CHILD_CATEGORY(parentId),
                request
            );
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_CREATION_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async updateChildCategory(parentId: number, childId: number, request: UpdateCategoryRequest): Promise<CategoryDTO> {
        try {
            const response = await adminApi.put<CategoryDTO>(
                CATEGORY_API_ENDPOINTS.UPDATE_CHILD_CATEGORY(parentId, childId),
                request
            );
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_UPDATE_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async deleteChildCategory(childId: number): Promise<void> {
        try {
            await adminApi.delete(CATEGORY_API_ENDPOINTS.DELETE_CHILD_CATEGORY(childId));
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_DELETION_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }

    async searchCategories(keyword: string): Promise<CategoryDTO[]> {
        try {
            const response = await adminApi.get<CategoryDTO[]>(CATEGORY_API_ENDPOINTS.SEARCH_CATEGORIES, {
                params: { keyword }
            });
            return response.data;
        } catch (err) {
            const formattedError = formatCategoryError(err);
            console.error(CATEGORY_SEARCH_ERROR_MESSAGE, formattedError);
            throw new Error(formattedError.message);
        }
    }
}

export const categoryService = new CategoryService();
