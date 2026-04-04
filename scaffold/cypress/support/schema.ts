import { z } from 'zod/v4';

const StepSchema = z.union([
	z.object({ visit: z.string() }),
	z.object({ click: z.object({ selector: z.string() }) }),
	z.object({ fill: z.object({ selector: z.string(), value: z.string() }) }),
	z.object({ loginAs: z.string() }),
	z.object({ seedItem: z.record(z.string(), z.unknown()) }),
	z.object({ shouldContain: z.object({ selector: z.string(), text: z.string() }) }),
	z.object({ shouldExist: z.object({ selector: z.string() }) })
]);

const AcceptanceCriterionSchema = z.object({
	id: z.string(),
	title: z.string(),
	narrative: z.string().optional(),
	skip: z.boolean().optional(),
	only: z.boolean().optional(),
	given: z.array(StepSchema).default([]),
	when: z.array(StepSchema).default([]),
	then: z.array(StepSchema).default([])
});

const UserStorySchema = z.object({
	id: z.string(),
	title: z.string(),
	requirement_id: z.string().optional(),
	skip: z.boolean().optional(),
	only: z.boolean().optional(),
	acceptance_criteria: z.array(AcceptanceCriterionSchema)
});

export { StepSchema, AcceptanceCriterionSchema, UserStorySchema };
export type Step = z.infer<typeof StepSchema>;
export type AcceptanceCriterion = z.infer<typeof AcceptanceCriterionSchema>;
export type UserStory = z.infer<typeof UserStorySchema>;
