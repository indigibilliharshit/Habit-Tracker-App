import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from 'lucide-react'

const achievements = [
  { name: "Consistency Hero", description: "Completed all habits for 7 days straight" },
  { name: "Early Bird", description: "Completed morning routine for 30 days" },
]

export function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">{achievement.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

