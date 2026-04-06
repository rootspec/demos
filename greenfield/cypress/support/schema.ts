import { z } from 'zod';

const StepSchema = z.union([
  // Navigation and interaction
  z.object({ visit: z.string() }),
  z.object({ click: z.object({ selector: z.string() }) }),
  z.object({ tap: z.object({ selector: z.string() }) }),
  z.object({ fill: z.object({ selector: z.string(), value: z.string() }) }),
  z.object({ type: z.object({ selector: z.string(), text: z.string() }) }),
  z.object({ hover: z.object({ selector: z.string() }) }),
  z.object({ scrollTo: z.object({ selector: z.string() }) }),
  z.object({ dragSlider: z.object({ selector: z.string(), position: z.number() }) }),
  z.object({ swipe: z.object({ selector: z.string(), direction: z.string() }) }),
  z.object({ reload: z.object({}) }),
  z.object({ pageLoads: z.object({ timeout: z.number() }) }),
  z.object({ setViewport: z.object({ width: z.number(), height: z.number() }) }),

  // Authentication and data
  z.object({ loginAs: z.string() }),
  z.object({ seedItem: z.record(z.unknown()) }),

  // Assertions
  z.object({ shouldContain: z.object({ selector: z.string(), text: z.string() }) }),
  z.object({ shouldExist: z.object({ selector: z.string() }) }),
  z.object({ shouldBeVisible: z.object({ selector: z.string() }) }),
  z.object({ shouldHaveClass: z.object({ selector: z.string(), className: z.string() }) }),
  z.object({ shouldHaveAttribute: z.object({ selector: z.string(), attribute: z.string(), value: z.string() }) }),
  z.object({ shouldMatch: z.object({ selector: z.string(), regex: z.string() }) }),
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
