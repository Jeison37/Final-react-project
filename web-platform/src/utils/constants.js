export const CONST = Object.freeze({
    LOGIN: Symbol(),
    SIGNUP: Symbol(),
    ESTADOS:{
        0: "Pendiente",
        1: "Resuelto"
    },
    ROL:{
        USER: 0,
        TECHNICAL: 1,
        ADMIN: 2
    },
    WS:{
        CREATE_CHAT:0,
        TECHNICIAN_CONNECTED:1,
        MESSAGE:2
    }
});