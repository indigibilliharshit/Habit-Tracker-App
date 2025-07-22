"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Habit } from "@/app/dashboard/page"

export function ProgressChart({ habits }: { habits: Habit[] }) {
  const completedCount = habits.filter(habit => habit.completed).length
  const totalCount = habits.length

  const data = [
    { name: "Completed", value: completedCount },
    { name: "Remaining", value: totalCount - completedCount },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

