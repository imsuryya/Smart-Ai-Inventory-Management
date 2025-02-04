import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Button } from "../components/components/ui/button"
import { Input } from "../components/components/ui/input"
import { Label } from "../components/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/components/ui/select"
import { Badge } from "../components/components/ui/badge"
import { format } from "date-fns"
import axios from "axios"

const API_BASE_URL = 'http://localhost:5000/api';

const AssignRoles = () => {
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "" })
  const [newTask, setNewTask] = useState({
    username: "",
    description: "",
    status: "Not Done",
  })

  useEffect(() => {
    fetchUsers()
    fetchTasks()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`)
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value) => {
    setNewUser({ ...newUser, role: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (newUser.username && newUser.password && newUser.role) {
        await axios.post(`${API_BASE_URL}/users`, newUser)
        setNewUser({ username: "", password: "", role: "" })
        fetchUsers()
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleTaskInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleTaskSubmit = async (e) => {
    e.preventDefault()
    try {
      if (newTask.username && newTask.description) {
        await axios.post(`${API_BASE_URL}/tasks`, newTask)
        setNewTask({ username: "", description: "", status: "Not Done" })
        fetchTasks()
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`)
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleTaskStatusToggle = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/tasks/${id}/status`)
      fetchTasks()
    } catch (error) {
      console.error('Error updating task status:', error)
    }
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
                <Select onValueChange={(value) => setNewTask({ ...newTask, status: value })} value={newTask.status}>
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
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Online" ? "success" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(user.lastActive), "yyyy-MM-dd HH:mm")}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user._id)}>
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
                <TableRow key={task._id}>
                  <TableCell>{task.username}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={task.status === "Done" ? "success" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleTaskStatusToggle(task._id)}
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(task.assignedDate), "yyyy-MM-dd HH:mm")}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleTaskDelete(task._id)}>
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