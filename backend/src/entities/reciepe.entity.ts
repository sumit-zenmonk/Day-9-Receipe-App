import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RecipeImageEntity } from './reciepe.image.entity';
import { RecipeStepEntity } from './reciepe.steps.entity';
import { UserFavoriteEntity } from './user.fav.reciepe.entity';

@Entity('recipe')
export class RecipeEntity {
    @PrimaryGeneratedColumn('uuid')
    recipe_uuid: string;

    @Column({ name: 'user_uuid', nullable: true })
    user_uuid: string;

    @Column()
    recipe_name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: false })
    is_deleted: boolean;

    // Relation to User
    @ManyToOne(() => UserEntity, (user) => user.recipes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    // Relation to Images
    @OneToMany(() => RecipeImageEntity, (image) => image.recipe)
    images: RecipeImageEntity[];

    // Relation to Steps
    @OneToMany(() => RecipeStepEntity, (step) => step.recipe)
    steps: RecipeStepEntity;

    // Relation to Favorite
    @OneToMany(() => UserFavoriteEntity, (favorite) => favorite.recipe)
    favoritedBy: UserFavoriteEntity[];
}
