import { z } from 'zod';

const StepSchema = z.union([
  // Setup/navigation
  z.object({ visit: z.string() }),
  z.object({ click: z.object({ selector: z.string() }) }),
  z.object({ fill: z.object({ selector: z.string(), value: z.string() }) }),
  z.object({ type: z.object({ selector: z.string(), text: z.string() }) }),
  z.object({ loginAs: z.string() }),
  z.object({ seedItem: z.record(z.unknown()) }),
  z.object({ scrollTo: z.object({ selector: z.string() }) }),
  z.object({ viewport: z.object({ width: z.number(), height: z.number() }) }),
  z.object({ focus: z.object({ selector: z.string() }) }),
  z.object({ keyPress: z.object({ key: z.string() }) }),
  z.object({ pageLoad: z.object({}).optional() }),
  z.object({ mediaQuery: z.object({ name: z.string(), value: z.string() }) }),
  // Assertions
  z.object({ shouldContain: z.object({ selector: z.string(), text: z.string() }) }),
  z.object({ shouldExist: z.object({ selector: z.string(), count: z.number().optional(), minCount: z.number().optional() }) }),
  z.object({ shouldBeVisible: z.object({ selector: z.string() }) }),
  z.object({ shouldHaveAttr: z.object({ selector: z.string(), attr: z.string(), value: z.string() }) }),
  z.object({ shouldMatch: z.object({ selector: z.string(), pattern: z.string() }) }),
  z.object({ shouldHaveClass: z.object({ selector: z.string(), class: z.string() }) }),
  z.object({ shouldNotHaveClass: z.object({ selector: z.string(), class: z.string() }) }),
  z.object({ shouldBeDisabled: z.object({ selector: z.string() }) }),
  z.object({ shouldHaveValue: z.object({ selector: z.string(), value: z.string() }) }),
  z.object({ shouldNotOverflow: z.object({ selector: z.string(), direction: z.string() }) }),
  z.object({ shouldHaveStyle: z.object({ selector: z.string(), property: z.string(), value: z.string() }) }),
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
