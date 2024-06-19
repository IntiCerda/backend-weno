import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategory } from "./create-category.dto";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async getAllCategories(): Promise<Category[]>{
        return this.prisma.category.findMany();
    }

    async getCategoryByName(name: string): Promise<Category>{
        return this.prisma.category.findUnique({
            where:{
                name
            }
        })
    }

    async createCategory(createCategory: CreateCategory){
        const {name} = createCategory;
        return this.prisma.category.create({
            data:{
                name
            }
        })
    }

    async deleteCategory(id: string){
        return this.prisma.category.delete({
            where:{
                id
            }
        })
    }

    // async updateCategory(id: string, data: UpdateCategoryDto){
    //     return this.prisma.category.update({
    //         where:{
    //             id
    //         },
    //         data
    //     })
    // }


}