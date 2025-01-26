import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/components/ui/accordion"
import { Calendar } from "../components/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/components/ui/popover"
import { Button } from "../components/components/ui/button"
import { Input } from "../components/components/ui/input"
import { Calendar as CalendarIcon, Lightbulb } from "lucide-react";
import { format } from "date-fns"

// Generate mock data for 1000+ products across different categories
const generateProductData = (count) => {
  const categories = ["Electronics", "Clothing", "Home & Garden", "Books", "Toys", "Sports"]
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    sold: Math.floor(Math.random() * 1000),
    unsold: Math.floor(Math.random() * 500),
    price: Math.floor(Math.random() * 500) + 10,
    cost: Math.floor(Math.random() * 300) + 5,
  }))
}

const productData = generateProductData(1000)

const expirableData = [
  { name: "Expiring < 30 days", value: 400 },
  { name: "Expiring 30-60 days", value: 300 },
  { name: "Expiring 60-90 days", value: 300 },
  { name: "Expiring > 90 days", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Generate mock sales data for the past year
const generateSalesData = () => {
  const today = new Date()
  return Array.from({ length: 365 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    return {
      date: format(date, "yyyy-MM-dd"),
      sales: Math.floor(Math.random() * 1000) + 500,
    }
  }).reverse()
}

const salesData = generateSalesData()

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  const getDataForDate = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    return salesData.find((item) => item.date === formattedDate) || { date: formattedDate, sales: 0 }
  }

  const selectedDateData = getDataForDate(selectedDate)

  const totalSold = productData.reduce((sum, product) => sum + product.sold, 0)
  const totalUnsold = productData.reduce((sum, product) => sum + product.unsold, 0)
  const totalExpirable = expirableData.reduce((sum, category) => sum + category.value, 0)
  const totalProfit = productData.reduce((sum, product) => sum + product.sold * (product.price - product.cost), 0)

  const filteredProducts = useMemo(() => {
    return productData.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const categorizedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    }, {})
  }, [filteredProducts])

  // New function to generate AI insights
  const generateAIInsights = () => {
    const totalProducts = productData.length
    const totalSoldValue = productData.reduce((sum, product) => sum + product.sold * product.price, 0)
    const totalUnsoldValue = productData.reduce((sum, product) => sum + product.unsold * product.price, 0)
    const expiringWithin30Days = expirableData[0].value
    const topSellingCategory = Object.entries(categorizedProducts).reduce((a, b) =>
      a[1].reduce((sum, product) => sum + product.sold, 0) > b[1].reduce((sum, product) => sum + product.sold, 0)
        ? a
        : b,
    )[0]

    return [
      `Based on the current data, your inventory consists of ${totalProducts} products across various categories.`,
      `The total value of sold products is $${totalSoldValue.toLocaleString()}, while the value of unsold inventory is $${totalUnsoldValue.toLocaleString()}.`,
      `There are ${expiringWithin30Days} products expiring within the next 30 days. Consider running promotions to reduce potential losses.`,
      `The top-selling category is "${topSellingCategory}". Focus on restocking and marketing these products to maximize sales.`,
      `Your current profit margin is ${((totalProfit / totalSoldValue) * 100).toFixed(2)}%. Look for opportunities to increase this through bulk purchasing or negotiating better supplier rates.`,
    ]
  }

  const aiInsights = generateAIInsights()

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Inventory Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
              AI Insights
            </CardTitle>
            <CardDescription>Data-driven analysis and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {aiInsights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalSold.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total products sold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unsold Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUnsold.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total unsold products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expiring Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalExpirable.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total expiring products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalProfit.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Cumulative profit</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Sales Overview</CardTitle>
          <CardDescription>Top 20 products by sales volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData.sort((a, b) => b.sold - a.sold).slice(0, 20)}>
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
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expirableData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expirableData.map((entry, index) => (
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
          <CardDescription>Daily sales for the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
            <p className="text-sm font-medium mt-2 md:mt-0">
              Sales on {format(selectedDate, "PPP")}: ${selectedDateData.sales.toLocaleString()}
            </p>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
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
          <CardDescription>Detailed list of all products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(categorizedProducts).map(([category, products]) => (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger>
                  {category} ({products.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product Name</TableHead>
                          <TableHead>Sold</TableHead>
                          <TableHead>Unsold</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Profit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.sold}</TableCell>
                            <TableCell>{product.unsold}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>${product.cost}</TableCell>
                            <TableCell>${((product.price - product.cost) * product.sold).toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

