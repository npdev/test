import { Controller } from '../controller';
import {IUser, User} from "../../models/user";

describe('createUser', () => {
    const controller = new Controller();
    it('should resolve with user object', async () => {
        jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => Promise.resolve());
        const result = await controller.createUser('name');
        expect(result.name).toEqual('name');
    })
})
