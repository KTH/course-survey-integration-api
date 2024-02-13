import { z } from "zod";

// Check response data from UG
export function checkGetUgCourseResponsibleAndTeachers(val: Array<any>): void {
  if (val.length !== 2) {
    throw new Error(`Expected 2 values, got ${val.length}`)
  }

  if (val[0] === undefined) {
    throw new Error(`Course responsible is undefined`)
  }

  if (val[0].startsWith('u1') === false) {
    throw new Error(`Course responsible is not a kthid`)
  }

  if (val[1] === undefined) {
    throw new Error(`Course teachers is undefined`)
  }
}

export const UgUser = z.object({
  email: z.string().min(1),
  kthid: z.string().min(1),
  givenName: z.string().min(1),
  surname: z.string().min(1),
});

export const UgSchool = z.object({
  name: z.string().min(1),
  kthid: z.string().min(1),
  description: z.object({
    sv: z.string().optional(),
    en: z.string().optional(),
  }).required(),
}).required();