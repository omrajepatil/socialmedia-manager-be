// import userModel from "../model/user";
import jwt from "jsonwebtoken"
import { createUser, getOneUser } from "../services/user.js";
import bcrypt from "bcrypt";

const SECRET_KEY = "lijkjyhnbredcwsxaqaz"


export const register = async (req, res) => {
    try {

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(500).json({ messagge: "required all fields" });

        }


        const hashPassword = await bcrypt.hash(password, 10);

        const user = await createUser({
            userName,
            email,
            password: hashPassword,
        })



        const token = jwt.sign(
            {

                userName: user.userName,
                email: user.email,



            },
            SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        return res.status(201).json({ messagge: "User Created Successfully", token });





    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ sucess: false, messagge: "not registered", data: error })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({ messagge: "all fields required" })
        }

        const user = await getOneUser(
            {
                email,
            },
            {
                email: 1,
                userName: 1,
                password: 1,
            }

        )

        if (!user) {
            res.status(404).json({ error: "User not found!" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid username or password!" });
            return;
        }

        const token = jwt.sign(
            {
                _id: user._id,
                userName: user.userName,
                email: user.email,



            },
            SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        return res.status(200).json({
            messagge: "log in successfully",
            token,
        });

    }


    catch (e) {


    }
}