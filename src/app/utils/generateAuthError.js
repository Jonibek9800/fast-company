
function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введен не правильно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        default:
            return "Слишком много попыток входа";
    };
};

export default generateAuthError;
