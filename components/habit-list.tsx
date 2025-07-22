import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Habit } from "@/app/dashboard/page"

export function HabitList({ habits, toggleHabit }: { habits: Habit[], toggleHabit: (id: number) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <Checkbox 
                  id={`habit-${habit.id}`} 
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(habit.id)}
                />
                <div>
                  <label 
                    htmlFor={`habit-${habit.id}`} 
                    className="font-medium text-gray-700 dark:text-gray-200"
                  >
                    {habit.name}
                  </label>
                  <Badge variant="secondary" className="ml-2">
                    {habit.category}
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

