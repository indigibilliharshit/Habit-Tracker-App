import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from 'lucide-react'

export function Streaks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Streaks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-gray-700 dark:text-gray-200">7 Day Streak</span>
          </div>
          <Badge variant="secondary">Keep it up!</Badge>
        </div>
      </CardContent>
    </Card>
  )
}

