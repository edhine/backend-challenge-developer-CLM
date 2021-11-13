import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MovieDocument = MovieEntity & Document

@Schema({ collection: 'movies' })
export class MovieEntity {

  @Prop()
  Title: string;

  @Prop()
  Year: string;

  @Prop()
  Released: string;

  @Prop()
  Genre: string;

  @Prop()
  Director: string;

  @Prop()
  Actors: string;

  @Prop()
  Plot: string;

  @Prop([Object])
  Ratings: Object[];

  @Prop({ default: Date.now })
  CreatedAt: Date;

  @Prop({ default: Date.now })
  UpdatedAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(MovieEntity);