import { BaseEntity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export default class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
