import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    // _id: number;   <-- mongo va a crear un id por defecto con este nombre

    @Prop( { required: true, unique: true } )
    email: string;

    @Prop( { required: true } )
    name: string;

    @Prop( { required: true, minlength: 6 } )
    password?: string;

    @Prop( { default: true } )
    isActive: boolean;

    @Prop({ type: [String], default: ['user'] })
    role: string[];

    @Prop( { default: Date.now } )
    createdAt: Date;

    @Prop( { default: null } )
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);