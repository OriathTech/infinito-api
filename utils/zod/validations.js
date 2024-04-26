import { z } from "zod";


export function validateInfo(schema, data) {
    const result = schema.safeParse(data, { extra: 'remove' });
    return result;
}

export function validateRequiredInfo(schema, data, required) {
    const requiredFields = required;

    const result = schema.safeParse(data, { extra: 'remove' });

    if (result.success) {
        const missingFields = requiredFields.filter(field => !(field in result.data));
        if (missingFields.length > 0) {
            return {
                success: false,
                error: {
                    issues: [
                        {
                            code: "missing_required_fields",
                            path: missingFields,
                            message:"Faltan campos obligatorios."
                        }
                    ]
                }
            };
        }
    }

    return result;
}