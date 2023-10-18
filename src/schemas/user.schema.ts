import { boolean, object, string, TypeOf, z } from "zod";
import {
  GenderEnumType,
  MaritalStatusEnumType,
} from "../entities/model.entity";

export const addPatientSchema = object({
  body: object({
    fName: string({
      required_error: "Name is required",
    }),

    lName: string({
      required_error: "Name is required",
    }),

    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),

    phone: string(),

    photoURL: z.optional(string()),

    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),

    passwordConfirm: string({
      required_error: "Please confirm your password",
    }),

    gender: z.nativeEnum(GenderEnumType),

    dateOfBirth: z.optional(
      z.date({
        required_error: "dateOfBirth is required",
      })
    ),

    maritalStatus: z.nativeEnum(MaritalStatusEnumType),

    height: z.optional(
      z
        .number()
        .min(80, "Height must be at least 80 cm'")
        .max(220, "Invalid height")
    ),

    weight: z.number(),

    waistMeasurements: string(),

    hipMeasurements: string(),

    illnesses: z.optional(string()),

    sleepingProblems: z.optional(string()),

    parentsIlness: z.optional(string()),

    parentsIllnessDescription: z.optional(string()),

    plan: z.optional(
      string({
        required_error: "Please confirm your password",
      })
    ),
    //
    //
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof addPatientSchema>["body"],
  "passwordConfirm"
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

export const changePasswordUserSchema = object({
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

export type changePasswordUserInput = Omit<
  TypeOf<typeof changePasswordUserSchema>["body"],
  "newPasswordConfirm"
>;
/**
 *  wakeUpTime,
      sleepTime,
      screenTime,
      lastScreenTime,
      stepCount,
      exerciseDuration,
      exercises,
      breathingSessionDuration,
      nightFasting,
 */
export const dailyReportSchema = object({
  body: object({
    wakeUpTime: z.optional(string()),
    sleepTime: z.optional(string()),
    screenTime: z.optional(string()),
    lastScreenTime: z.optional(string()),
    stepCount: z.optional(string()),
    exerciseDuration: z.optional(string()),
    exercises: z.optional(string()),
    breathingSessionDuration: z.optional(string()),
    nightFasting: z.optional(boolean()),
  }),
});

export type dailyReportInput = TypeOf<typeof dailyReportSchema>["body"];