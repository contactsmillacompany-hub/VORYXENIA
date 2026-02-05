"use server";

import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
});

export type FormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
    success?: boolean;
};

export async function submitEnquiry(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    // Validate fields
    const validatedFields = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            message: "Please verify your input.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically send the email via Resend/SendGrid
    console.log("Enquiry received:", validatedFields.data);

    return {
        message: "Request received. We will be in touch shortly.",
        success: true,
    };
}
