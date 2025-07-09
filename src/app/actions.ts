'use server';

import { suggestTaskPrioritization } from '@/ai/flows/suggest-task-prioritization';
import type { SuggestTaskPrioritizationInput } from '@/ai/flows/suggest-task-prioritization';

export async function getTaskSuggestions(
  tasks: SuggestTaskPrioritizationInput['tasks']
) {
  try {
    const result = await suggestTaskPrioritization({ tasks });
    if (result && result.prioritizedTasks) {
      return { success: true, data: result.prioritizedTasks };
    }
    return { success: false, error: 'Failed to get suggestions.' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
