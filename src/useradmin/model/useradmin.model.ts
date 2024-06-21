import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

import { UserAdminDTO } from '../interface/useradmin.interface';

@Schema()
export class UserAdmin extends Document implements UserAdminDTO {
    @Prop()
    name!: string;

    @Prop()
    email!: string;

    @Prop()
    password!: string;

    @Prop({ default: true })
    enabled!: boolean;
}

export const UserAdminSchema = SchemaFactory.createForClass(UserAdmin);

UserAdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});
