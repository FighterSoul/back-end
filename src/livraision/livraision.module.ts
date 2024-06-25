import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LivraisonService } from './services/livraision.service';
import { LivraisonController } from './livraison.controller';
import { Livraison, LivraisonSchema } from './schema/livraision.schema';
import { Client, ClientSchema } from '../client/schema/client.schema';
import { Product, ProductSchema } from '../product/schema/product.schema';
import { Market, MarketSchema } from 'src/market/schema/market.schema';
import { Driver, DriverSchema } from 'src/driver/schema/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Livraison.name, schema: LivraisonSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Product.name, schema: ProductSchema },
      {name:Market.name,schema:MarketSchema},
      {name:Driver.name,schema:DriverSchema}
    ]),
  ],
  controllers: [LivraisonController],
  providers: [LivraisonService],
})
export class LivraisonModule {}
