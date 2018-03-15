import { RepositoryBase } from '../repository/base.repository';
import { user } from './user.model';
import { IUser } from './user.interface';

export class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(user);
    }
}

export let userRepo: UserRepository = new UserRepository();