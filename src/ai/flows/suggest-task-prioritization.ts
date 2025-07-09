'use server'

/**
 * @fileOverview An AI agent that suggests task prioritization based on deadlines.
 *
 * - suggestTaskPrioritization - A function that suggests task prioritization.
 * - SuggestTaskPrioritizationInput - The input type for the suggestTaskPrioritization function.
 * - SuggestTaskPrioritizationOutput - The return type for the suggestTaskPrioritization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskPrioritizationInputSchema = z.object({
  tasks: z.array(
    z.object({
      name: z.string().describe('The name of the task.'),
      deadline: z.string().describe('The deadline of the task (ISO format).'),
    })
  ).describe('A list of tasks with their deadlines.'),
});
export type SuggestTaskPrioritizationInput = z.infer<typeof SuggestTaskPrioritizationInputSchema>;

const SuggestTaskPrioritizationOutputSchema = z.object({
  prioritizedTasks: z.array(
    z.object({
      name: z.string().describe('The name of the task.'),
      priority: z.number().describe('The priority of the task (1 being the highest).'),
      reason: z.string().describe('The reason for the assigned priority.'),
    })
  ).describe('A list of tasks with their suggested priorities and reasons.'),
});
export type SuggestTaskPrioritizationOutput = z.infer<typeof SuggestTaskPrioritizationOutputSchema>;

export async function suggestTaskPrioritization(input: SuggestTaskPrioritizationInput): Promise<SuggestTaskPrioritizationOutput> {
  return suggestTaskPrioritizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPrioritizationPrompt',
  input: {schema: SuggestTaskPrioritizationInputSchema},
  output: {schema: SuggestTaskPrioritizationOutputSchema},
  prompt: `You are an AI task prioritization assistant. Given a list of tasks with their deadlines, you will suggest an optimal task prioritization.

Tasks:
{{#each tasks}}
- Name: {{name}}
  Deadline: {{deadline}}
{{/each}}

Prioritize the tasks based on their deadlines. Tasks with earlier deadlines should be prioritized higher. Provide a reason for each task's priority.

Return the prioritized tasks in the following JSON format:
{{json prioritizedTasks}}`,
});

const suggestTaskPrioritizationFlow = ai.defineFlow(
  {
    name: 'suggestTaskPrioritizationFlow',
    inputSchema: SuggestTaskPrioritizationInputSchema,
    outputSchema: SuggestTaskPrioritizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
