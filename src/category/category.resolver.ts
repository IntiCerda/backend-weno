import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CategoryObject } from "./category.dto";
import { CreateCategory } from "./create-category.dto";


@Resolver()
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => [CategoryObject])
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Query(() => CategoryObject)
    async getCategoryByName(@Args('categoryByName') name: string) {
        return this.categoryService.getCategoryByName(name);
    }

    @Mutation(() => CategoryObject)
    async createCategory(@Args('crateCategory') crateCategory: CreateCategory) {
        return this.categoryService.createCategory(crateCategory);
    }

    @Mutation(() => CategoryObject)
    async deleteCategory(@Args('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }

    // @Mutation(() => CategoryObject)
    // async updateCategory(@Args('id') id: string, @Args('data') data: UpdateCategoryDto) {
    //     return this.categoryService.updateCategory(id, data);
    // }
}