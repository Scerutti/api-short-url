import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class ComplmentUserInfo {
  @Prop()
  phone!: string;

  @Prop()
  country!: string;

  @Prop()
  state!: string;

  @Prop()
  city!: string;

  @Prop()
  address!: string;

  @Prop()
  cp!: string;
}

@Schema()
export class User extends Document {
  @Prop()
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  last_name!: string;

  @Prop()
  fullName!: string;

  @Prop({ default: true })
  enabled?: boolean;

  @Prop({default: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"})
  avatar?: string;

  @Prop({ type: ComplmentUserInfo, required: true })
  other_user_data!: ComplmentUserInfo;

  @Prop()
  cartid!: string;
}

export const ComplmentUserInfoSchema = SchemaFactory.createForClass(ComplmentUserInfo);
export const UserSchema = SchemaFactory.createForClass(User);
