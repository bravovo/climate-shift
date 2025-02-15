const userValidationSchema = {
    email: {
        errorMessage: {
            ukr: "Електронна пошта не може бути порожньою",
            eng: "Email cannot be empty",
        },
        isEmail: {
            errorMessage: {
                ukr: "Поле має бути електронною поштою",
                eng: "Field should be email",
            },
        }
    },
    password: {
        isLength: {
            options: {
                min: 8
            },
            errorMessage: {
                ukr: "Довжина паролюне може бути менше 8 символів",
                eng: "Password length cannot be less that 8 symbols",
            }
        }
    }
};

module.exports = { userValidationSchema };
