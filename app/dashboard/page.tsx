'use client'

import { useState, useCallback } from 'react'
import { DashboardHeader } from "@/components/dashboard-header"
import { HabitList } from "@/components/habit-list"
import { ProgressChart } from "@/components/progress-chart"
import { Streaks } from "@/components/streaks"
import { Achievements } from "@/components/achievements"

export type Habit = {
  id: number;
  name: string;
  category: string;
  completed: boolean;
}

const initialHabits: Habit[] = [
  { id: 1, name: "Morning Meditation", category: "Health", completed: false },
  { id: 2, name: "Read for 30 minutes", category: "Personal Development", completed: false },
  { id: 3, name: "Exercise", category: "Fitness", completed: false },
  { id: 4, name: "Code for 1 hour", category: "Work", completed: false },
]

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits)

  const addHabit = useCallback((name: string) => {
    setHabits(prevHabits => {
      const newId = Math.max(...prevHabits.map(h => h.id), 0) + 1
      return [...prevHabits, { id: newId, name, category: "New", completed: false }]
    })
  }, [])

  const toggleHabit = useCallback((id: number) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    )
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader onAddHabit={addHabit} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <HabitList habits={habits} toggleHabit={toggleHabit} />
          </div>
          <div className="space-y-6">
            <ProgressChart habits={habits} />
            <Streaks />
            <Achievements />
          </div>
        </div>
      </main>
    </div>
  )
}

