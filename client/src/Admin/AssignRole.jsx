import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Button } from "../components/components/ui/button"
import { Input } from "../components/components/ui/input"
import { Label } from "../components/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/components/ui/select"
import { Badge } from "../components/components/ui/badge"
import { format } from "date-fns"

// Mock data for existing users
const initialUsers = [
  { id: 1, username: "john_inventory", role: "Inventory", status: "Online", lastActive: "2023-06-15 10:30 AM" },
  { id: 2, username: "jane_billing", role: "Billing", status: "Offline", lastActive: "2023-06-14 05:45 PM" },
  { id: 3, username: "alice_inventory", role: "Inventory", status: "Online", lastActive: "2023-06-15 11:15 AM" },
]

const AssignRoles = () => {
  const [users, setUsers] = useState(initialUsers)
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "" })
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({
    username: "",
    description: "",
    status: "Not Done",
    assignedDate: new Date(),
  })

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value) => {
    setNewUser({ ...newUser, role: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newUser.username && newUser.password && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1, status: "Offline", lastActive: "N/A" }])
      setNewUser({ username: "", password: "", role: "" })
    }
  }

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleTaskInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleTaskStatusChange = (value) => {
    setNewTask({ ...newTask, status: value })
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault()
    if (newTask.username && newTask.description) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1, assignedDate: new Date() }])
      setNewTask({ username: "", description: "", status: "Not Done", assignedDate: new Date() })
    }
  }

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleTaskStatusToggle = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status: task.status === "Done" ? "Not Done" : "Done" } : task)),
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Assign Roles and Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
            <CardDescription>Add a new employee to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={newUser.username} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={handleRoleChange} value={newUser.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inventory">Inventory</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Create User</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assign Tasks</CardTitle>
            <CardDescription>Assign tasks to employees</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskUsername">Username</Label>
                <Input
                  id="taskUsername"
                  name="username"
                  value={newTask.username}
                  onChange={handleTaskInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskDescription">Task Description</Label>
                <Input
                  id="taskDescription"
                  name="description"
                  value={newTask.description}
                  onChange={handleTaskInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskStatus">Status</Label>
                <Select onValueChange={handleTaskStatusChange} value={newTask.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Done">Not Done</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Assign Task</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Users</CardTitle>
          <CardDescription>Manage current employees and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Online" ? "success" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Tasks</CardTitle>
          <CardDescription>View and manage assigned tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Task Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.username}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={task.status === "Done" ? "success" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleTaskStatusToggle(task.id)}
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(task.assignedDate, "yyyy-MM-dd HH:mm")}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleTaskDelete(task.id)}>
                      Delete Task
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

export default AssignRoles

