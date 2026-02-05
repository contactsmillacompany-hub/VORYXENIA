"use server";

import { z } from "zod";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    zip: z.string().min(3, "Postal code is required"),
    cartItems: z.string(), // JSON string of items
});

export async function placeOrder(prevState: any, formData: FormData) {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city"),
        zip: formData.get("zip"),
        cartItems: formData.get("cartItems"),
    };

    const result = schema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, we would:
    // 1. Process payment via Stripe/etc.
    // 2. Save order to database
    // 3. Send email confirmation (using Resend/SendGrid)

    console.log("ORDER PLACED:", result.data);

    return { success: true };
}
