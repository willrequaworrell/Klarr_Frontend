

import { CardType } from "./Types";

function generateDemoTasks(currentDate: Date = new Date()): CardType[] {
  const tasks: Array<{
    title: string;
    daysFromNow: number | null;
    column: 'today' | 'upcoming' | 'optional';
  }> = [
    { title: "Prepare quarterly sales report", daysFromNow: 2, column: "upcoming" },
    { title: "Schedule team meeting for project kickoff", daysFromNow: 0, column: "today" },
    { title: "Review and approve marketing budget", daysFromNow: 3, column: "upcoming" },
    { title: "Prepare presentation for client meeting", daysFromNow: 7, column: "upcoming" },
    { title: "Update employee handbook", daysFromNow: null, column: "optional" },
    { title: "Research new project management tools", daysFromNow: null, column: "optional" }
  ];

  return tasks.map((task, index): CardType => {
    const dueDate = task.daysFromNow !== null
      ? new Date(currentDate.getTime() + task.daysFromNow * 24 * 60 * 60 * 1000)
      : null;
    
    return {
      id: `demo_task_${index + 1}`,
      userId: "demo_user",
      title: task.title,
      dueDate: dueDate,
      column: task.column,
      order: index + 1,
      createdAt: new Date(currentDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(currentDate.getTime() - Math.random() * 2 * 24 * 60 * 60 * 1000)
    };
  });
}

// Usage example:
const currentDate = new Date(); 
export const demoTasks = generateDemoTasks(currentDate);
