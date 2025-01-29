"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Badge } from "../components/components/ui/badge"
import { Button } from "../components/components/ui/button"

// Mock data for tasks
const mockTasks = [
  { id: 1, title: "Restock laptops", priority: "High", status: "Pending", dueDate: "2023-06-30" },
  { id: 2, title: "Update inventory system", priority: "Medium", status: "In Progress", dueDate: "2023-07-15" },
  { id: 3, title: "Conduct monthly audit", priority: "Low", status: "Pending", dueDate: "2023-06-25" },
  { id: 4, title: "Order new office chairs", priority: "Medium", status: "Pending", dueDate: "2023-07-10" },
  { id: 5, title: "Review supplier contracts", priority: "High", status: "In Progress", dueDate: "2023-07-05" },
]

const TaskMessages = () => {
  const [tasks, setTasks] = useState(mockTasks)

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "in progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Tasks</h1>

      <Card>
        <CardHeader>
          <CardTitle>Task List</CardTitle>
          <CardDescription>View and manage tasks assigned by admin</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(task.priority)} text-white`}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(task.status)} text-white`}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCompleteTask(task.id)} size="sm">
                      Complete
                    </Button>
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

export default TaskMessages

