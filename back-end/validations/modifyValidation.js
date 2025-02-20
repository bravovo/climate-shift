const modifyValidationSchema = {
    lat: {
        isNumeric: {
            errorMessage: {
                ukr: "Довгота має бути числом",
                eng: "Latitude has to be a number",
            }
        },
    },
    lng: {
        isNumeric: {
            errorMessage: {
                ukr: "Широта має бути числом",
                eng: "Longitude has to be a number",
            }
        }
    }
}

module.exports = { modifyValidationSchema };