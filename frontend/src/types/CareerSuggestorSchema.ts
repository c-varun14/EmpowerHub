import { z } from "zod";

export const careerSuggestorSchema = z.object({
  careerRecommendations: z
    .array(
      z
        .object({
          careerTitle: z.string(),
          description: z.string(),
          whyRecommended: z.string(),
        })
        .strict()
    )
    .describe(
      "A list of recommended careers based on the provided knowledge and interests."
    ),
});

export type careerSuggestorType = z.infer<typeof careerSuggestorSchema>;

export const searchQuerySchema = z.object({
  search: z.string(),
});

export type searchQueryType = z.infer<typeof searchQuerySchema>;
