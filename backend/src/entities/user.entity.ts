import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';
import { UserFavoriteEntity } from './user.fav.reciepe.entity';
import { RecipeEntity } from './reciepe.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    // Recipes by this user
    @OneToMany(() => RecipeEntity, (recipe) => recipe.user)
    recipes: RecipeEntity[];

    // Recipes by this user
    @OneToMany(() => UserFavoriteEntity, (favorite) => favorite.user)
    favorites: UserFavoriteEntity[];
}
