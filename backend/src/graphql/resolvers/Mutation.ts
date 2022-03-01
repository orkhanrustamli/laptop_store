import { register, login, logout } from "./handlers/auth";
import { createLaptop, deleteLaptop } from "./handlers/laptops";
import { rateLaptop } from "./handlers/rates";

export default {
    register,
    login,
    createLaptop,
    deleteLaptop,
    logout,
    rateLaptop,
};
