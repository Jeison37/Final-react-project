export const CONST = Object.freeze({
    LOGIN: Symbol(),
    SIGNUP: Symbol(),
    ESTADOS:{
        0: "Pendiente",
        1: "Resuelto"
    },
    ROL:{
        USER: 0,
        TECHNICIAN: 1,
        ADMIN: 2
    },
    WS:{
        CREATE_CHAT:0,
        TECHNICIAN_CONNECTED:1,
        MESSAGE:2,
        TECHNICIAN_AVAILABLE:3,
        TECHNICIAN_UNAVAILABLE:4,
        CHANGE_STATE:5,
        LEAVE_CHAT:6
    }
});