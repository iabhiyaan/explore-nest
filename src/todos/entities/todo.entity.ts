import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ default: false })
    isCompleted: boolean
}
