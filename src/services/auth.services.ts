import {
  loginSchemaType,
  registerSchemaType,
  resetPasswordType,
} from "@/schema/auth.schema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/auth";

export async function registerUser(formData: registerSchemaType) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function loginUser(formData: loginSchemaType) {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${BASE_URL}/forgotPasswords`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-type": "application/json" },
  });
  return await response.json();
}

export async function verifyResetCode(resetCode: string) {
  const response = await fetch(`${BASE_URL}/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify({ resetCode }),
    headers: { "Content-type": "application/json" },
  });
  return await response.json();
}

export async function resetPassword(formData: resetPasswordType) {
  const response = await fetch(`${BASE_URL}/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  });
  return await response.json();
}
