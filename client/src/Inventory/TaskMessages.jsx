"use client"

import  { useState } from "react"
import { Button } from "../components/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"

// Mock data for tasks (you might want to move this to a separate file or fetch from an API)
const initialMockTasks = [
  { id: 1, title: "Restock laptops", dueDate: "2023-06-30" },
  { id: 2, title: "Update inventory system", dueDate: "2023-07-15" },
  { id: 3, title: "Conduct monthly audit", dueDate: "2023-06-25" },
]

const Tasks = () => {
  const [tasks, setTasks] = useState(initialMockTasks)

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tasks</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>View tasks assigned by admin</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCompleteTask(task.id)}>Complete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Tasks

