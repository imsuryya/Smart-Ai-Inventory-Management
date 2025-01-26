import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Input } from "../components/components/ui/input"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { format } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/components/ui/accordion"

// Mock data for e-commerce users
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", totalOrders: 15, totalSpent: 1250 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+0987654321", totalOrders: 8, totalSpent: 780 },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "+1122334455", totalOrders: 22, totalSpent: 1890 },
  { id: 4, name: "Bob Williams", email: "bob@example.com", phone: "+5566778899", totalOrders: 5, totalSpent: 450 },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+1357924680",
    totalOrders: 18,
    totalSpent: 1560,
  },
]

// Mock data for site visits
const siteVisitsData = [
  { date: "2023-06-01", visits: 1200 },
  { date: "2023-06-02", visits: 1300 },
  { date: "2023-06-03", visits: 1400 },
  { date: "2023-06-04", visits: 1100 },
  { date: "2023-06-05", visits: 1500 },
  { date: "2023-06-06", visits: 1600 },
  { date: "2023-06-07", visits: 1350 },
]

// Mock data for product sales
const productSalesData = [
  { name: "Product A", sold: 400, unsold: 240 },
  { name: "Product B", sold: 300, unsold: 139 },
  { name: "Product C", sold: 200, unsold: 980 },
  { name: "Product D", sold: 278, unsold: 390 },
  { name: "Product E", sold: 189, unsold: 480 },
]

// Mock data for expirable products
const expirableProductsData = [
  { name: "Expiring < 30 days", value: 400 },
  { name: "Expiring 30-60 days", value: 300 },
  { name: "Expiring 60-90 days", value: 300 },
  { name: "Expiring > 90 days", value: 200 },
]

// Mock data for sales over time
const salesOverTimeData = Array.from({ length: 30 }, (_, i) => ({
  date: format(new Date(2023, 5, i + 1), "MMM dd"),
  sales: Math.floor(Math.random() * 1000) + 500,
}))

// Updated mock data for product inventory with categories
const productInventoryData = [
  { id: 1, name: "Smartphone X", category: "Electronics", stock: 100, price: 599.99 },
  { id: 2, name: "Laptop Pro", category: "Electronics", stock: 50, price: 1299.99 },
  { id: 3, name: "Wireless Earbuds", category: "Electronics", stock: 200, price: 79.99 },
  { id: 4, name: "Cotton T-Shirt", category: "Clothing", stock: 300, price: 19.99 },
  { id: 5, name: "Denim Jeans", category: "Clothing", stock: 150, price: 49.99 },
  { id: 6, name: "Running Shoes", category: "Footwear", stock: 80, price: 89.99 },
  { id: 7, name: "Fitness Tracker", category: "Electronics", stock: 120, price: 99.99 },
  { id: 8, name: "Yoga Mat", category: "Fitness", stock: 100, price: 29.99 },
  { id: 9, name: "Blender", category: "Home & Kitchen", stock: 75, price: 39.99 },
  { id: 10, name: "Coffee Maker", category: "Home & Kitchen", stock: 60, price: 59.99 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const Ecommerce = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [inventorySearchTerm, setInventorySearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  const totalProfit = productSalesData.reduce((sum, product) => sum + product.sold * 10, 0) // Assuming $10 profit per sale

  const categorizedInventory = useMemo(() => {
    return productInventoryData.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    }, {})
  }, [])

  const filteredInventory = useMemo(() => {
    return Object.entries(categorizedInventory).reduce((acc, [category, products]) => {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(inventorySearchTerm.toLowerCase()),
      )
      if (filteredProducts.length > 0) {
        acc[category] = filteredProducts
      }
      return acc
    }, {})
  }, [categorizedInventory, inventorySearchTerm])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">E-commerce Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${productSalesData.reduce((sum, product) => sum + product.sold, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalProfit}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Site Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{siteVisitsData.reduce((sum, day) => sum + day.visits, 0)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Sales Overview</CardTitle>
          <CardDescription>Comparison of sold and unsold products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sold" fill="#8884d8" />
                <Bar dataKey="unsold" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expirable Products</CardTitle>
          <CardDescription>Distribution of products by expiration date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expirableProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expirableProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales Over Time</CardTitle>
          <CardDescription>Daily sales for the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Current stock levels and prices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search inventory..."
              value={inventorySearchTerm}
              onChange={(e) => setInventorySearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(filteredInventory).map(([category, products]) => (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger>
                  {category} ({products.length})
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Site Visits</CardTitle>
          <CardDescription>Daily site visits for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={siteVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>E-commerce Users</CardTitle>
          <CardDescription>List of registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.totalOrders}</TableCell>
                    <TableCell>${user.totalSpent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Ecommerce

