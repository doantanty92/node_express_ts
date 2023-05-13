import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Entity, Column, BeforeInsert } from 'typeorm';

// Use import Base from './base.entity'; instead of: @/entities/base.entity
// Because of: yarn migrate && yarn db:push will be failed
import Base from './base.entity';
import { ROLE } from '../constants/role';

@Entity('users')
export class User extends Base {
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.MANAGER,
  })
  role: ROLE;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  avatarUrl: string;

  @Column({
    default: false,
  })
  isActivated: boolean;

  @Column({
    nullable: true,
  })
  confirmationToken: string;

  @Column({
    nullable: true,
  })
  confirmTokenSendAt: Date;

  @Column({
    default: false,
  })
  isConfirmed: boolean;

  @Column({
    nullable: true,
  })
  verifyCode: string;

  @Column({
    nullable: true,
  })
  verifyCodeSendAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  static genConfirmationToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}
