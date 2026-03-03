import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecipeEntity } from './reciepe.entity';

@Entity('recipe_steps')
export class RecipeStepEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    recipe_uuid: string;

    @Column({ type: 'text' })
    steps_string: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: false })
    is_deleted: boolean;

    // Relation to receipe
    @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_uuid' })
    recipe: RecipeEntity;
}
