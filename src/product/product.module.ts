import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product ,ProductSchema} from "src/schema/product.schema";
import { ProductService } from "./services/product.service";
import { ProductController } from "./product.controller";
@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule{}