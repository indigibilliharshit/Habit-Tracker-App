'use client'

import { useState } from 'react'
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DashboardHeader({ onAddHabit }: { onAddHabit: (habit: string) => void }) {
  const [newHabit, setNewHabit] = useState('')
  const [open, setOpen] = useState(false)

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newHabit.trim()) {
      onAddHabit(newHabit.trim())
      setNewHabit('')
      setOpen(false)
    }
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <div className="flex items-center space-x-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Habit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Habit</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddHabit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="habit-name" className="text-right">
                      Habit Name
                    </Label>
                    <Input
                      id="habit-name"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Add Habit</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

