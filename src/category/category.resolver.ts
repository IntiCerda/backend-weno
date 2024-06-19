import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { Category } from "./category.dto";
import { CreateCategory } from "./create-category.dto";


@Resolver()
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => [Category])
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Query(() => Category)
    async getCategoryById(@Args('id') id: string) {
        return this.categoryService.getCategoryById(id);
    }

    @Mutation(() => Category)
    async createCategory(@Args('data') data: CreateCategory) {
        return this.categoryService.createCategory(data);
    }

    @Mutation(() => Category)
    async deleteCategory(@Args('id') id: string) {
        return this.categoryService.deleteCategory(id);
    }

    // @Mutation(() => Category)
    // async updateCategory(@Args('id') id: string, @Args('data') data: UpdateCategoryDto) {
    //     return this.categoryService.updateCategory(id, data);
    // }
}