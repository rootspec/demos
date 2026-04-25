import { z } from 'zod';

const StepSchema = z.union([
  z.object({ visit: z.string() }),
  z.object({ click: z.object({ selector: z.string() }) }),
  z.object({ fill: z.object({ selector: z.string(), value: z.string() }) }),
  z.object({ loginAs: z.string() }),
  z.object({ seedItem: z.record(z.unknown()) }),
  z.object({ awaitReady: z.literal(true) }),
  z.object({ shouldContain: z.object({ selector: z.string(), text: z.string() }) }),
  z.object({ shouldExist: z.object({ selector: z.string() }) }),
]);

const AcceptanceCriterionSchema = z.object({
  id: z.string(),
  title: z.string(),
  narrative: z.string().optional(),
  skip: z.boolean().optional(),
  only: z.boolean().optional(),
  given: z.array(StepSchema).optional(),
  when: z.array(StepSchema).optional(),
  then: z.array(StepSchema).optional(),
});

const UserStorySchema = z.object({
  id: z.string(),
  title: z.string(),
  requirement_id: z.string().optional(),
  skip: z.boolean().optional(),
  only: z.boolean().optional(),
  acceptance_criteria: z.array(AcceptanceCriterionSchema),
});

export { StepSchema, AcceptanceCriterionSchema, UserStorySchema };
export type Step = z.infer<typeof StepSchema>;
export type AcceptanceCriterion = z.infer<typeof AcceptanceCriterionSchema>;
export type UserStory = z.infer<typeof UserStorySchema>;
