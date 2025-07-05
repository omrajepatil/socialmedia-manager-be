import userModel from "../model/user.js";

export const createUser = async (user) => {
    try {
        const newUser = new userModel(user)
        const saved = await newUser.save();
        console.log("saved", saved)
        return saved;
    }
    catch (e) {
        console.log(e);
    }
}

export const getOneUser = async (query, returnFields) => {
    try {
        const user = await userModel.findOne(query, returnFields)
        return user;
    }
    catch (e) {
        console.log(e);
    }
}