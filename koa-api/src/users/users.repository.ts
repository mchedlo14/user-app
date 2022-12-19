import {usersData} from "./users.data";

export default class UsersRepository {
    public getUsers(): Array<any> {
        return usersData;
    }

    public getUserByID(id: number) {
        return usersData.find(user => user.id === id);
    }

    addUser(user: any): any {
        const maxId = Math.max.apply(Math, usersData.map(function (user: { id: any; }) {
            return user.id;
        }));
        user.id = maxId + 1;
        usersData.push(user);
        return user;
    }

    removeUserByID(id: number) {
        const indexOfObject = usersData.findIndex((user) => {
            return user.id === id;
        });

        if (indexOfObject !== -1) {
            usersData.splice(indexOfObject, 1);
        }
    }

    updateUserByID(id: number, payload: any): any {
        const userToUpdate = usersData.find(user => user.id === id);
        userToUpdate.name = payload.name;
        userToUpdate.email = payload.email;
        userToUpdate.gender = payload.gender;
        userToUpdate.address = payload.address;
        userToUpdate.phone = payload.phone;
        return userToUpdate;
    }
}
