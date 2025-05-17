import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GA_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT: z.string().min(1).optional(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT:
      process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT,
  },
});
