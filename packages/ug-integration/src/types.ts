import { z } from "zod";

export const UgUser = z.object({
  email: z.string(),
  kthid: z.string(),
  givenName: z.string(),
  surname: z.string(),
});

export const UgSchool = z
  .object({
    name: z.string().min(1),
    kthid: z.string().min(1),
    description: z
      .object({
        sv: z.string().optional(),
        en: z.string().optional(),
      })
      .required(),
  })
  .required();

export const UgGroups = z.array(
  z.object({
    name: z.string().min(1),
    kthid: z.string().min(1),
    description: z
      .object({
        sv: z.string().optional(),
        en: z.string().optional(),
      })
      .required(),
    members: z.array(z.string()),
  }),
);
