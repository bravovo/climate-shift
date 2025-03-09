const changePassValidationSchema = {
    newPassword: {
        notEmpty: {
            errorMessage: { ukr: "Пароль не може бути порожнім", eng: "Password can`t be empty"},
        },
        isLength: {
            options: {
                min: 8
            },
            errorMessage: {
                ukr: "Довжина паролю не може бути менше 8 символів",
                eng: "Password length cannot be less that 8 symbols",
            }
        }
    }
}

module.exports = { changePassValidationSchema };