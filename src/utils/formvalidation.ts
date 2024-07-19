type ObjectTypeNum = Record<string, string | number>;
type ObjectTypeStr = Record<string, string>;

export const validateForm = (
    formData: ObjectTypeNum,
    DefaultObj: ObjectTypeStr
): { isValid: boolean; errors: ObjectTypeStr } => {
    let isValid = true;
    let errors = { ...DefaultObj };

    if (!formData.name) {
        errors.name = "Name is required";
        isValid = false;
    }
    console.log(formData.price, "formData.price")
    if (!formData.price || Number(formData.price) <= 0) {
        errors.price = "Please enter some valid price!";
        isValid = false;
    }

    if (!formData.image_link) {
        errors.image_link = "Image is required";
        isValid = false;
    }

    return { isValid, errors };
};