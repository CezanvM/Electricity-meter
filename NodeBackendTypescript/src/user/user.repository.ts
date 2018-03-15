import { RepositoryBase } from '../repository/base.repository';

import { IUser } from './user.interface';
import { user } from './user.model';

export class UserRepository extends RepositoryBase<IUser> {
    constructor() {
        super(user);
    }
}

export let userRepo: UserRepository = new UserRepository();