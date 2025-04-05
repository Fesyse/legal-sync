"use server";

import { z } from "zod";

const formSchema = z
  .object({
    techinfo: z.string().min(1),
  })
  .or(
    z.object({
      techinfoFile: z.instanceof(File),
    }),
  );

export const checkRules = async (formData: FormData) => {
  const formDataAsJSON = Object.fromEntries(formData.entries());

  const { data, success, error } = formSchema.safeParse(formDataAsJSON);

  if (!success) {
    throw new Error(JSON.stringify(error.issues));
  }

  console.log(data);
};
