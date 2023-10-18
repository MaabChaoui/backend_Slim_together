import { object, string, TypeOf, z } from "zod";
import {
  GenderEnumType,
  MaritalStatusEnumType,
} from "../entities/model.entity";

export const loginDoctorSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
  }),
});

export type LoginDoctorInput = TypeOf<typeof loginDoctorSchema>["body"];

export const changePasswordDoctorSchema = object({
  body: object({
    oldPassword: string({
      required_error: "Old password is required",
    }),
    newPassword: string({
      required_error: "New password is required",
    })
      .min(8, "New password must be more than 8 characters")
      .max(32, "New password must be less than 32 characters"),
    newPasswordConfirm: string(),
  }).refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "Passwords do not match",
  }),
});

export type changePasswordDoctorInput = Omit<
  TypeOf<typeof changePasswordDoctorSchema>["body"],
  "newPasswordConfirm"
>;
