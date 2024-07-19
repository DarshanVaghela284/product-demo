import { useState } from "react";

export const UpdateKeyName = (key: string) => {
    switch (key) {
        case "name":
            return "Name"

        case "price":
            return "Price"

        case "image_link":
            return "Image"

        default:
            break;
    }
}

export const useForm = (initialState: Record<string, any>) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<Record<string, string>>({ name: "", price: "", image_link: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputBlur = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = e.target;

        setErrors((prev) => ({
            ...prev,
            [name]: !value ? `${UpdateKeyName(name)} is required.` : "",
        }));
    };

    return { formData, errors, handleInputChange, handleInputBlur, setErrors, setFormData };
};
