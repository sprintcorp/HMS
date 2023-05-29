import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";

export type ConfigDocument = Config & Document;

@Schema()
export class Config {

    @Prop({required:true})
    notificationInterval: string

    @Prop({default: Date.now()})
    createdDate: Date;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);