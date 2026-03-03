import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RecipeEntity } from './reciepe.entity';

@Entity('user_favorites')
export class UserFavoriteEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    recipe_uuid: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @Column({ default: true })
    is_available: boolean;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => RecipeEntity, (recipe) => recipe.favoritedBy, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_uuid' })
    recipe: RecipeEntity;

    @ManyToOne(() => UserEntity, (user) => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;
}
