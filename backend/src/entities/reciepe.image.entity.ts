import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RecipeEntity } from './reciepe.entity';

@Entity('recipe_images')
export class RecipeImageEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    recipe_uuid: string;

    @Column()
    img: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: false })
    is_deleted: boolean;

    // Relation to receipe
    @ManyToOne(() => RecipeEntity, (recipe) => recipe.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_uuid' })
    recipe: RecipeEntity;
}
