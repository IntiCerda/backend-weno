import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true, // Genera el esquema automáticamente
    }),
  ],
})
export class GraphqlModule {}