'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts'
import { 
  Calendar, 
  BarChart3, 
  FileText, 
  Users, 
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Clock,
  TrendingUp,
  TrendingDown,
  Menu,
  X,
  Home,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Plus,
  RefreshCw,
  Download,
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Award,
  BookOpen,
  Building2,
  Zap,
  ExternalLink,
  MoreVertical,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Copy,
  Printer,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Activity,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Layers,
  Database,
  Server,
  Cpu,
  HardDrive,
  MessageSquare,
  Star,
  MessageCircle,
  Megaphone,
  Briefcase,
  Heart,
  Send,
  Rocket,
  Shield,
  Globe,
  Maximize2,
  Minimize2,
  Cloud,
  Sun,
  CloudRain,
  CloudSun,
  Wind,
  Thermometer,
  FolderOpen,
  FileCheck,
  Clock3,
  Newspaper,
  ArrowRight,
  Loader2,
  AlertTriangle,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { toast } from 'sonner'

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true
          setHasStarted(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, end, duration])

  return { count, ref }
}

// Animated Stat Card Component
function AnimatedStatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''))
  const { count, ref } = useAnimatedCounter(numericValue, 2000)
  const suffix = stat.value.includes('%') ? '%' : stat.value.includes(',') ? '' : ''
  
  return (
    <Card 
      ref={ref}
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden glass-card animate-in slide-in-from-bottom"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-5 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            {stat.icon}
          </div>
          <div className="flex items-center gap-1">
            {stat.trend === 'up' ? (
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
            ) : stat.trend === 'down' ? (
              <ArrowDownRight className="w-3 h-3 text-red-500" />
            ) : (
              <Minus className="w-3 h-3 text-gray-500" />
            )}
            <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-0 font-semibold">
              {stat.change}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1 tabular-nums">
          {count.toLocaleString()}{suffix}
        </p>
        <div className="relative mt-3">
          <Progress value={stat.progress} className="h-2" />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{stat.description}</p>
      </CardContent>
    </Card>
  )
}

// Chart configurations
const chartConfig = {
  classes: { label: 'Lớp học', color: '#10b981' },
  teachers: { label: 'Giảng viên', color: '#3b82f6' },
  hours: { label: 'Giờ giảng', color: '#f59e0b' },
  efficiency: { label: 'Hiệu suất', color: '#06b6d4' },
  hours: { label: 'Giờ giảng', color: '#8b5cf6' },
} satisfies ChartConfig

// Monthly data for charts
const monthlyData = [
  { month: 'T1', classes: 120, teachers: 75, hours: 980 },
  { month: 'T2', classes: 132, teachers: 78, hours: 1050 },
  { month: 'T3', classes: 145, teachers: 82, hours: 1120 },
  { month: 'T4', classes: 138, teachers: 80, hours: 1080 },
  { month: 'T5', classes: 142, teachers: 83, hours: 1100 },
  { month: 'T6', classes: 150, teachers: 85, hours: 1150 },
  { month: 'T7', classes: 148, teachers: 86, hours: 1180 },
  { month: 'T8', classes: 152, teachers: 87, hours: 1200 },
  { month: 'T9', classes: 155, teachers: 88, hours: 1220 },
  { month: 'T10', classes: 154, teachers: 89, hours: 1230 },
  { month: 'T11', classes: 156, teachers: 89, hours: 1240 },
  { month: 'T12', classes: 158, teachers: 90, hours: 1250 },
]

// Weekly hours data
const weeklyHoursData = [
  { day: 'T2', hours: 185 },
  { day: 'T3', hours: 195 },
  { day: 'T4', hours: 178 },
  { day: 'T5', hours: 202 },
  { day: 'T6', hours: 188 },
  { day: 'T7', hours: 145 },
  { day: 'CN', hours: 42 },
]

// Department distribution data
const departmentData = [
  { name: 'CNTT', value: 35, color: '#10b981' },
  { name: 'Kinh tế', value: 25, color: '#06b6d4' },
  { name: 'Kỹ thuật', value: 20, color: '#8b5cf6' },
  { name: 'Ngoại ngữ', value: 12, color: '#f59e0b' },
  { name: 'Khác', value: 8, color: '#ec4899' },
]

// Performance radial data
const performanceData = [
  { name: 'Hiệu suất', value: 94, fill: '#10b981' },
]

// Class table data
const classData = [
  { id: 'LH001', name: 'Lập trình Web nâng cao', department: 'CNTT', teacher: 'Nguyễn Văn A', students: 45, status: 'active', schedule: 'T2, T4 (7:00-9:00)' },
  { id: 'LH002', name: 'Cơ sở dữ liệu', department: 'CNTT', teacher: 'Trần Thị B', students: 38, status: 'active', schedule: 'T3, T5 (9:30-11:30)' },
  { id: 'LH003', name: 'Kinh tế vi mô', department: 'Kinh tế', teacher: 'Lê Văn C', students: 52, status: 'active', schedule: 'T2, T6 (13:00-15:00)' },
  { id: 'LH004', name: 'Tiếng Anh B2', department: 'Ngoại ngữ', teacher: 'Phạm Thị D', students: 30, status: 'pending', schedule: 'T3, T5 (15:30-17:30)' },
  { id: 'LH005', name: 'Cơ học kết cấu', department: 'Kỹ thuật', teacher: 'Hoàng Văn E', students: 42, status: 'active', schedule: 'T4, T6 (7:00-9:00)' },
  { id: 'LH006', name: 'Machine Learning', department: 'CNTT', teacher: 'Nguyễn Văn A', students: 35, status: 'active', schedule: 'T3, T5 (7:00-9:00)' },
  { id: 'LH007', name: 'Marketing số', department: 'Kinh tế', teacher: 'Vũ Thị F', students: 48, status: 'completed', schedule: 'Đã kết thúc' },
  { id: 'LH008', name: 'An toàn thông tin', department: 'CNTT', teacher: 'Trần Thị B', students: 40, status: 'active', schedule: 'T2, T4 (15:30-17:30)' },
]

interface MenuItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  link: string
  badge?: string
  gradient: string
  shortcut?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'gantt',
    title: 'Gantt Chart TKB',
    description: 'Xem và quản lý thời khóa biểu theo biểu đồ Gantt',
    icon: <Calendar className="w-6 h-6" />,
    link: 'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec',
    badge: 'Phổ biến',
    gradient: 'from-emerald-500 to-teal-600',
    shortcut: 'Ctrl+1'
  },
  {
    id: 'stats',
    title: 'Thống kê giờ giảng',
    description: 'Báo cáo chi tiết về giờ giảng của giảng viên',
    icon: <BarChart3 className="w-6 h-6" />,
    link: 'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec',
    gradient: 'from-cyan-500 to-blue-600',
    shortcut: 'Ctrl+2'
  },
  {
    id: 'progress',
    title: 'Báo cáo tiến độ',
    description: 'Theo dõi tiến độ công việc và kế hoạch đào tạo',
    icon: <FileText className="w-6 h-6" />,
    link: 'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec',
    badge: 'Mới',
    gradient: 'from-amber-500 to-orange-600',
    shortcut: 'Ctrl+3'
  },
  {
    id: 'classes',
    title: 'Tình hình mở lớp',
    description: 'Quản lý và theo dõi tình trạng các lớp học',
    icon: <Users className="w-6 h-6" />,
    link: 'https://script.google.com/macros/s/AKfycbylUhTwKcdq76gjvf5eKGOioVt3GMcFqnRFGzDNrgRHVIp75CUp15rBAYB0bopUHfKuaQ/exec',
    gradient: 'from-purple-500 to-pink-600',
    shortcut: 'Ctrl+4'
  }
]

const stats = [
  { 
    label: 'Lớp đang hoạt động', 
    value: '156', 
    icon: <GraduationCap className="w-5 h-5" />, 
    change: '+12',
    changeType: 'positive',
    progress: 78,
    description: 'trên tổng số 200 lớp',
    trend: 'up'
  },
  { 
    label: 'Giảng viên', 
    value: '89', 
    icon: <Users className="w-5 h-5" />, 
    change: '+3',
    changeType: 'positive',
    progress: 95,
    description: 'đang giảng dạy',
    trend: 'up'
  },
  { 
    label: 'Giờ giảng/tuần', 
    value: '1,234', 
    icon: <Clock className="w-5 h-5" />, 
    change: '+45',
    changeType: 'positive',
    progress: 82,
    description: 'tăng so với tuần trước',
    trend: 'up'
  },
  { 
    label: 'Hiệu suất', 
    value: '94%', 
    icon: <TrendingUp className="w-5 h-5" />, 
    change: '+2%',
    changeType: 'positive',
    progress: 94,
    description: 'vượt mục tiêu',
    trend: 'up'
  }
]

const quickActions = [
  { label: 'Thêm lớp mới', icon: <Plus className="w-4 h-4" />, color: 'bg-emerald-500 hover:bg-emerald-600' },
  { label: 'Xuất báo cáo', icon: <Download className="w-4 h-4" />, color: 'bg-blue-500 hover:bg-blue-600' },
  { label: 'Làm mới dữ liệu', icon: <RefreshCw className="w-4 h-4" />, color: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'Bộ lọc nâng cao', icon: <Filter className="w-4 h-4" />, color: 'bg-amber-500 hover:bg-amber-600' }
]

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'Cập nhật hệ thống Gantt Chart',
    description: 'Đã thêm tính năng lọc theo khoa và giảng viên',
    time: '2 giờ trước',
    icon: <CheckCircle2 className="w-4 h-4" />
  },
  {
    id: 2,
    type: 'warning',
    title: 'Nhắc nhở: Báo cáo tháng 11',
    description: 'Hạn chót nộp báo cáo: 30/11/2024',
    time: 'Hôm qua',
    icon: <AlertCircle className="w-4 h-4" />
  },
  {
    id: 3,
    type: 'info',
    title: 'Hội thảo đào tạo',
    description: 'Cuộc họp vào 10:00 sáng thứ Sáu',
    time: '2 ngày trước',
    icon: <Info className="w-4 h-4" />
  }
]

const recentActivities = [
  { action: 'Cập nhật TKB Khoa CNTT', user: 'Nguyễn Văn A', time: '5 phút trước', type: 'update' },
  { action: 'Thêm lớp học mới', user: 'Trần Thị B', time: '15 phút trước', type: 'create' },
  { action: 'Xuất báo cáo tuần', user: 'Lê Văn C', time: '1 giờ trước', type: 'export' },
  { action: 'Duyệt đề xuất mở lớp', user: 'Phạm Thị D', time: '2 giờ trước', type: 'approve' }
]

const systemMetrics = [
  { label: 'CPU', value: '42%', icon: <Cpu className="w-4 h-4" />, color: 'text-emerald-500' },
  { label: 'RAM', value: '68%', icon: <Server className="w-4 h-4" />, color: 'text-amber-500' },
  { label: 'Storage', value: '35%', icon: <HardDrive className="w-4 h-4" />, color: 'text-blue-500' },
  { label: 'Network', value: '12 MB/s', icon: <Activity className="w-4 h-4" />, color: 'text-purple-500' }
]

// Teacher directory data
const teacherData = [
  { id: 'GV001', name: 'Nguyễn Văn A', email: 'nguyenvana@prd.edu.vn', phone: '0901234567', department: 'CNTT', position: 'Trưởng khoa', classes: 4, rating: 4.8, avatar: 'NA' },
  { id: 'GV002', name: 'Trần Thị B', email: 'tranthib@prd.edu.vn', phone: '0902345678', department: 'CNTT', position: 'Giảng viên', classes: 3, rating: 4.6, avatar: 'TB' },
  { id: 'GV003', name: 'Lê Văn C', email: 'levanc@prd.edu.vn', phone: '0903456789', department: 'Kinh tế', position: 'Phó khoa', classes: 2, rating: 4.9, avatar: 'LC' },
  { id: 'GV004', name: 'Phạm Thị D', email: 'phamthid@prd.edu.vn', phone: '0904567890', department: 'Ngoại ngữ', position: 'Giảng viên', classes: 3, rating: 4.7, avatar: 'PD' },
  { id: 'GV005', name: 'Hoàng Văn E', email: 'hoangvane@prd.edu.vn', phone: '0905678901', department: 'Kỹ thuật', position: 'Giảng viên', classes: 2, rating: 4.5, avatar: 'HE' },
  { id: 'GV006', name: 'Vũ Thị F', email: 'vuthif@prd.edu.vn', phone: '0906789012', department: 'Kinh tế', position: 'Giảng viên', classes: 2, rating: 4.8, avatar: 'VF' },
]

// FAQ data
const faqData = [
  { 
    id: 1, 
    question: 'Làm thế nào để đăng ký lớp học mới?', 
    answer: 'Bạn có thể đăng ký lớp học mới bằng cách truy cập menu "Tình hình mở lớp" và nhấn nút "Thêm lớp mới". Điền đầy đủ thông tin và gửi yêu cầu để được phê duyệt.',
    category: 'Đăng ký'
  },
  { 
    id: 2, 
    question: 'Cách xuất báo cáo giờ giảng?', 
    answer: 'Vào mục "Thống kê giờ giảng", chọn khoảng thời gian và nhấn nút "Xuất báo cáo". Bạn có thể chọn định dạng PDF hoặc Excel.',
    category: 'Báo cáo'
  },
  { 
    id: 3, 
    question: 'Làm sao để xem thời khóa biểu?', 
    answer: 'Truy cập "Gantt Chart TKB" để xem thời khóa biểu dạng biểu đồ. Bạn có thể lọc theo khoa, giảng viên hoặc phòng học.',
    category: 'Lịch học'
  },
  { 
    id: 4, 
    question: 'Cách cập nhật thông tin cá nhân?', 
    answer: 'Nhấn vào avatar của bạn ở góc trên bên phải, chọn "Thông tin cá nhân" và cập nhật các thông tin cần thiết.',
    category: 'Tài khoản'
  },
  { 
    id: 5, 
    question: 'Làm thế nào để liên hệ hỗ trợ?', 
    answer: 'Bạn có thể gửi email đến support@prd.edu.vn hoặc gọi hotline 1900-xxxx trong giờ hành chính. Đội ngũ hỗ trợ sẽ phản hồi trong 24h.',
    category: 'Hỗ trợ'
  },
  { 
    id: 6, 
    question: 'Cách đổi mật khẩu đăng nhập?', 
    answer: 'Vào "Cài đặt" > "Bảo mật" > "Đổi mật khẩu". Nhập mật khẩu cũ và mật khẩu mới, sau đó nhấn "Xác nhận".',
    category: 'Tài khoản'
  },
]

// Calendar events data
const calendarEvents = [
  { id: 1, title: 'Hội nghị giảng viên', date: '2026-04-18', time: '09:00', type: 'meeting', color: 'bg-blue-500' },
  { id: 2, title: 'Hạn nộp báo cáo tháng', date: '2026-04-20', time: '17:00', type: 'deadline', color: 'bg-red-500' },
  { id: 3, title: 'Đào tạo hệ thống mới', date: '2026-04-22', time: '14:00', type: 'training', color: 'bg-emerald-500' },
  { id: 4, title: 'Kiểm tra cơ sở vật chất', date: '2026-04-25', time: '08:00', type: 'inspection', color: 'bg-amber-500' },
  { id: 5, title: 'Họp Ban giám hiệu', date: '2026-04-28', time: '10:00', type: 'meeting', color: 'bg-purple-500' },
]

// Announcements data
const announcements = [
  { id: 1, title: 'Cập nhật hệ thống quản lý đào tạo phiên bản 2.0', content: 'Hệ thống đã được nâng cấp với nhiều tính năng mới bao gồm biểu đồ tương tác, bảng dữ liệu nâng cao và giao diện tối.', date: '2026-04-16', priority: 'high' },
  { id: 2, title: 'Lịch nghỉ lễ 30/4 - 1/5', content: 'Thông báo lịch nghỉ lễ Giải phóng và Quốc tế Lao động từ ngày 30/4 đến 1/5. Các lớp học sẽ được bù vào tuần sau.', date: '2026-04-15', priority: 'normal' },
  { id: 3, title: 'Đăng ký đề tài NCKH năm 2026', content: 'Mở đợt đăng ký đề tài nghiên cứu khoa học năm 2026. Hạn chót nộp đề xuất: 15/5/2026.', date: '2026-04-14', priority: 'normal' },
]

// Weather data
const weatherData = {
  current: { temp: 32, condition: 'Nắng', humidity: 65, wind: 12, icon: 'sun' },
  forecast: [
    { day: 'Th 5', temp: 31, icon: 'cloud-sun' },
    { day: 'Th 6', temp: 29, icon: 'cloud-rain' },
    { day: 'Th 7', temp: 30, icon: 'cloud' },
    { day: 'CN', temp: 32, icon: 'sun' },
  ]
}

// Recent documents data
const recentDocuments = [
  { id: 1, name: 'Báo cáo tháng 4_2026.pdf', type: 'pdf', size: '2.4 MB', date: '2026-04-16', status: 'completed' },
  { id: 2, name: 'Danh sách lớp học kỳ 2.xlsx', type: 'excel', size: '856 KB', date: '2026-04-15', status: 'pending' },
  { id: 3, name: 'Kế hoạch đào tạo 2026.docx', type: 'doc', size: '1.2 MB', date: '2026-04-14', status: 'completed' },
  { id: 4, name: 'Thống kê giờ giảng Q1.xlsx', type: 'excel', size: '445 KB', date: '2026-04-13', status: 'completed' },
]

// Activity timeline data
const activityTimeline = [
  { id: 1, action: 'Cập nhật TKB Khoa CNTT', user: 'Nguyễn Văn A', time: '5 phút trước', type: 'update', icon: <RefreshCw className="w-4 h-4" />, color: 'bg-blue-500' },
  { id: 2, action: 'Thêm lớp học mới: Lập trình Web', user: 'Trần Thị B', time: '15 phút trước', type: 'create', icon: <Plus className="w-4 h-4" />, color: 'bg-emerald-500' },
  { id: 3, action: 'Xuất báo cáo tuần 15', user: 'Lê Văn C', time: '1 giờ trước', type: 'export', icon: <Download className="w-4 h-4" />, color: 'bg-purple-500' },
  { id: 4, action: 'Duyệt đề xuất mở lớp ML', user: 'Phạm Thị D', time: '2 giờ trước', type: 'approve', icon: <CheckCircle2 className="w-4 h-4" />, color: 'bg-amber-500' },
  { id: 5, action: 'Gửi thông báo đến GV', user: 'Hoàng Văn E', time: '3 giờ trước', type: 'notify', icon: <Bell className="w-4 h-4" />, color: 'bg-pink-500' },
]

// News ticker data
const newsTickerItems = [
  { id: 1, text: '📢 Đăng ký đề tài NCKH năm 2026 - Hạn chót: 15/5/2026', type: 'info', priority: 'high' },
  { id: 2, text: '🎉 Hệ thống đã cập nhật phiên bản 2.0 với nhiều tính năng mới', type: 'success', priority: 'normal' },
  { id: 3, text: '⚠️ Lịch nghỉ lễ 30/4 - 1/5: Các lớp học sẽ được bù vào tuần sau', type: 'warning', priority: 'high' },
  { id: 4, text: '📚 Mở thêm 5 lớp học kỳ hè cho các khoa CNTT và Kinh tế', type: 'info', priority: 'normal' },
  { id: 5, text: '🏆 Trường đạt top 10 trường đại học chất lượng đào tạo 2026', type: 'success', priority: 'normal' },
]

// Extended notifications for notification center
const allNotifications = [
  { id: 1, type: 'success', title: 'Cập nhật hệ thống Gantt Chart', description: 'Đã thêm tính năng lọc theo khoa và giảng viên', time: '2 giờ trước', read: false, category: 'system' },
  { id: 2, type: 'warning', title: 'Nhắc nhở: Báo cáo tháng 11', description: 'Hạn chót nộp báo cáo: 30/11/2024', time: 'Hôm qua', read: false, category: 'reminder' },
  { id: 3, type: 'info', title: 'Hội thảo đào tạo', description: 'Cuộc họp vào 10:00 sáng thứ Sáu', time: '2 ngày trước', read: true, category: 'meeting' },
  { id: 4, type: 'success', title: 'Duyệt đề xuất mở lớp', description: 'Đề xuất mở lớp Machine Learning đã được phê duyệt', time: '3 ngày trước', read: true, category: 'approval' },
  { id: 5, type: 'info', title: 'Cập nhật hồ sơ giảng viên', description: 'Thông tin giảng viên Nguyễn Văn A đã được cập nhật', time: '4 ngày trước', read: true, category: 'update' },
  { id: 6, type: 'warning', title: 'Cảnh báo dung lượng', description: 'Dung lượng lưu trữ đang ở mức 85%', time: '5 ngày trước', read: false, category: 'system' },
  { id: 7, type: 'success', title: 'Sao lưu thành công', description: 'Sao lưu dữ liệu hàng ngày hoàn tất', time: '6 ngày trước', read: true, category: 'system' },
  { id: 8, type: 'info', title: 'Lịch giảng dạy mới', description: 'Lịch giảng dạy tuần tới đã được cập nhật', time: '1 tuần trước', read: true, category: 'schedule' },
]

// Export options data
const exportOptions = [
  { id: 'pdf', label: 'PDF Document', icon: <FileText className="w-5 h-5" />, description: 'Xuất báo cáo định dạng PDF', color: 'bg-red-500' },
  { id: 'excel', label: 'Excel Spreadsheet', icon: <BarChart3 className="w-5 h-5" />, description: 'Xuất dữ liệu sang Excel', color: 'bg-green-500' },
  { id: 'csv', label: 'CSV File', icon: <FileText className="w-5 h-5" />, description: 'Xuất dữ liệu định dạng CSV', color: 'bg-blue-500' },
  { id: 'print', label: 'Print Report', icon: <Printer className="w-5 h-5" />, description: 'In báo cáo trực tiếp', color: 'bg-purple-500' },
]

// Goal progress data
const goalProgressData = [
  { id: 1, title: 'Mở lớp mới', current: 45, target: 50, color: 'bg-emerald-500', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 2, title: 'Giờ giảng dạy', current: 1150, target: 1400, color: 'bg-blue-500', icon: <Clock className="w-4 h-4" /> },
  { id: 3, title: 'Đề xuất NCKH', current: 12, target: 15, color: 'bg-purple-500', icon: <Target className="w-4 h-4" /> },
  { id: 4, title: 'Báo cáo hoàn thành', current: 8, target: 10, color: 'bg-amber-500', icon: <FileCheck className="w-4 h-4" /> },
]

// Performance KPI comparison data
const kpiComparisonData = [
  { id: 1, label: 'Tỉ lệ hoàn thành', current: 94, previous: 89, trend: 'up', unit: '%' },
  { id: 2, label: 'Giờ giảng trung bình', current: 24.5, previous: 22.8, trend: 'up', unit: 'h/tuần' },
  { id: 3, label: 'Sĩ số trung bình', current: 42, previous: 38, trend: 'up', unit: 'SV/lớp' },
  { id: 4, label: 'Tỉ lệ chuyên cần', current: 96.2, previous: 94.5, trend: 'up', unit: '%' },
]

// Weekly comparison data
const weeklyComparisonData = [
  { day: 'T2', thisWeek: 185, lastWeek: 172 },
  { day: 'T3', thisWeek: 195, lastWeek: 188 },
  { day: 'T4', thisWeek: 178, lastWeek: 165 },
  { day: 'T5', thisWeek: 202, lastWeek: 195 },
  { day: 'T6', thisWeek: 188, lastWeek: 178 },
  { day: 'T7', thisWeek: 145, lastWeek: 140 },
  { day: 'CN', thisWeek: 42, lastWeek: 38 },
]

// Top performers data
const topPerformersData = [
  { id: 1, name: 'Khoa CNTT', value: 98.5, change: '+2.3', avatar: 'CNTT' },
  { id: 2, name: 'Khoa Kinh tế', value: 95.2, change: '+1.8', avatar: 'KT' },
  { id: 3, name: 'Khoa Kỹ thuật', value: 93.7, change: '+1.2', avatar: 'KTH' },
  { id: 4, name: 'Khoa Ngoại ngữ', value: 91.4, change: '+0.9', avatar: 'NN' },
]

// Quick stats for mini dashboard
const quickStatsData = [
  { id: 1, label: 'Lớp hôm nay', value: 12, icon: <GraduationCap className="w-4 h-4" />, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { id: 2, label: 'Giảng viên dạy', value: 28, icon: <Users className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 3, label: 'Giờ giảng', value: 86, icon: <Clock className="w-4 h-4" />, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { id: 4, label: 'Phòng sử dụng', value: 15, icon: <Building2 className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30' },
]

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showSearch, setShowSearch] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [profileTab, setProfileTab] = useState('info')
  const [showWeather, setShowWeather] = useState(false)
  const [expandedStats, setExpandedStats] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')
  const [showExport, setShowExport] = useState(false)
  const [showNotificationCenter, setShowNotificationCenter] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [notificationFilter, setNotificationFilter] = useState('all')
  const [classSearchResults, setClassSearchResults] = useState<Array<{id: string, code: string, name: string}>>([])
  const [isSearchingClasses, setIsSearchingClasses] = useState(false)
  const [showClassSearchResults, setShowClassSearchResults] = useState(false)
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')
  const [iframeTitle, setIframeTitle] = useState('')
  const [iframeLoading, setIframeLoading] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const [iframeFullscreen, setIframeFullscreen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Loading progress animation
  useEffect(() => {
    if (isLoading || iframeLoading) {
      setLoadingProgress(0)
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    } else {
      setLoadingProgress(100)
      const timeout = setTimeout(() => setLoadingProgress(0), 500)
      return () => clearTimeout(timeout)
    }
  }, [isLoading, iframeLoading])

  // Welcome Guide on first load
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcomeGuide')
    if (!hasSeenWelcome) {
      setTimeout(() => {
        setShowWelcomeGuide(true)
      }, 1500)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        if (menuItems[index]) {
          setActiveMenu(menuItems[index].id)
        }
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setShowSearch(true)
      }
      if (e.key === 'F1' || (e.ctrlKey && e.key === '/')) {
        e.preventDefault()
        setShowShortcuts(true)
      }
      if (e.key === 'Escape') {
        setShowSearch(false)
        setShowShortcuts(false)
        setShowFeedback(false)
        setShowProfile(false)
        setActiveMenu(null)
        setShowIframe(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMenuClick = useCallback((item: MenuItem) => {
    setIsLoading(true)
    setActiveMenu(item.id)
    setMobileMenuOpen(false)
    
    // Show iframe for all menu items
    setIframeUrl(item.link)
    setIframeTitle(item.title)
    setIframeLoading(true)
    setShowIframe(true)
    
    toast.success(`Đang mở ${item.title}`, {
      description: 'Đang tải Google Apps Script...',
      icon: item.icon,
    })
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIframeLoading(false)
  }, [])

  const handleRefreshIframe = useCallback(() => {
    setIframeLoading(true)
    setIframeKey(prev => prev + 1)
    toast.success('Đang làm mới...', {
      icon: <RefreshCw className="w-4 h-4" />,
    })
  }, [])

  const toggleIframeFullscreen = useCallback(() => {
    setIframeFullscreen(prev => !prev)
  }, [])

  // Search classes by class code
  const searchClassesByCode = useCallback(async (query: string) => {
    if (!query || query.length < 1) {
      setClassSearchResults([])
      setShowClassSearchResults(false)
      return
    }
    
    setIsSearchingClasses(true)
    setShowClassSearchResults(true)
    
    try {
      const response = await fetch(`/api/admin/classes?search=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setClassSearchResults(data.classes || [])
      } else {
        setClassSearchResults([])
      }
    } catch (error) {
      console.error('Error searching classes:', error)
      setClassSearchResults([])
    } finally {
      setIsSearchingClasses(false)
    }
  }, [])

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchClassesByCode(searchQuery)
      } else {
        setClassSearchResults([])
        setShowClassSearchResults(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, searchClassesByCode])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const filteredMenuItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredClassData = classData.filter(item =>
    selectedDepartment === 'all' || item.department === selectedDepartment
  )

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
      case 'warning': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800'
      case 'info': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">Đang hoạt động</Badge>
      case 'pending': return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">Chờ duyệt</Badge>
      case 'completed': return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">Đã kết thúc</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex relative overflow-hidden">
      {/* Top Loading Progress Bar */}
      {(isLoading || iframeLoading) && (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-gray-200 dark:bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-pulse transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      )}
      
      {/* Floating Gradient Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl float-animation" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-cyan-400/15 dark:bg-cyan-500/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-2xl float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-2xl float-animation" style={{ animationDelay: '3s' }} />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-teal-950 text-white flex flex-col transition-all duration-300 ease-in-out shadow-2xl",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        sidebarCollapsed && "lg:w-20"
      )}
      style={{ width: sidebarCollapsed ? undefined : (mobileMenuOpen || !sidebarCollapsed ? undefined : undefined) }}
      >
        {/* Logo Section */}
        <div className={cn(
          "flex flex-col items-center border-b border-white/10 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "p-3" : "p-6"
        )}>
          <div className="relative group">
            <div className={cn(
              "absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse group-hover:animate-none group-hover:bg-white/30 transition-all",
              sidebarCollapsed && "blur-lg"
            )} />
            <div className={cn(
              "relative bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all group-hover:scale-105",
              sidebarCollapsed ? "w-12 h-12" : "w-28 h-28"
            )}>
              <img 
                src="/prd-logo.png" 
                alt="Logo PRD" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {!sidebarCollapsed && (
            <>
              <h1 className="mt-4 text-xl font-bold text-center">Phòng Đào Tạo</h1>
              <p className="text-emerald-200 dark:text-emerald-300 text-sm mt-1">Hệ thống quản lý đào tạo</p>
            </>
          )}
        </div>

        {/* Close Button - Mobile Only */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search in Sidebar */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-200" />
              <Input
                placeholder="Tìm mã lớp (VD: 1/2026)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowClassSearchResults(true)}
                onBlur={() => setTimeout(() => setShowClassSearchResults(false), 200)}
                className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-emerald-200 focus:bg-white/20 focus:border-white/40 transition-all"
              />
              {isSearchingClasses && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-200 animate-spin" />
              )}
            </div>
            
            {/* Class Search Results Dropdown */}
            {showClassSearchResults && (searchQuery || classSearchResults.length > 0) && (
              <div className="absolute left-4 right-4 top-full mt-1 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto z-50 overflow-hidden">
                {isSearchingClasses ? (
                  <div className="p-4 text-center text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    <span className="text-sm">Đang tìm kiếm...</span>
                  </div>
                ) : classSearchResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                      <Search className="w-3 h-3" />
                      Kết quả tìm kiếm
                    </div>
                    {classSearchResults.map((cls, index) => (
                      <button
                        key={cls.id}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all text-left group animate-in slide-in-from-left"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => {
                          toast.success(`Đã chọn lớp: ${cls.code}`, {
                            description: cls.name,
                            icon: <GraduationCap className="w-4 h-4" />,
                          })
                          setSearchQuery('')
                          setClassSearchResults([])
                          setShowClassSearchResults(false)
                        }}
                      >
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shadow-sm">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{cls.code}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cls.name}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2">
                      <Search className="w-5 h-5 opacity-50" />
                    </div>
                    <span className="text-sm">Không tìm thấy lớp với mã "{searchQuery}"</span>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Collapse/Expand Button */}
        <div className={cn(
          "flex items-center transition-all duration-300",
          sidebarCollapsed ? "justify-center p-2" : "justify-end px-4 py-2"
        )}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group"
          >
            {sidebarCollapsed ? (
              <ChevronsRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronsLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className={cn(
          "flex-1 space-y-2 overflow-y-auto transition-all duration-300",
          sidebarCollapsed ? "p-2" : "p-4"
        )}>
          {!sidebarCollapsed && (
            <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3 px-2">
              Chức năng chính
            </div>
          )}
          
          {filteredMenuItems.map((item, index) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={cn(
                    "w-full group relative flex items-center gap-3 rounded-xl transition-all duration-300 animate-in slide-in-from-left",
                    activeMenu === item.id 
                      ? "bg-white text-emerald-700 shadow-lg transform scale-[1.02] dark:bg-emerald-100" 
                      : "bg-white/10 hover:bg-white/20 text-white dark:text-emerald-100",
                    sidebarCollapsed ? "px-3 py-3 justify-center" : "px-4 py-3"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn(
                    "flex-shrink-0 p-2 rounded-lg transition-colors",
                    activeMenu === item.id ? "bg-emerald-100 dark:bg-emerald-200" : "bg-white/10 group-hover:bg-white/20"
                  )}>
                    {item.icon}
                  </div>
                  {!sidebarCollapsed && (
                    <>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-emerald-500 text-white border-0 animate-pulse">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className={cn(
                          "text-xs mt-0.5 line-clamp-1",
                          activeMenu === item.id ? "text-emerald-600 dark:text-emerald-700" : "text-emerald-200"
                        )}>
                          {item.description}
                        </p>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        activeMenu === item.id ? "translate-x-1" : "opacity-50 group-hover:opacity-100"
                      )} />
                    </>
                  )}
                  {!sidebarCollapsed && item.shortcut && (
                    <span className="absolute right-2 bottom-1 text-[10px] text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              {sidebarCollapsed && (
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Quick Stats Mini with Sparkline */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors cursor-pointer group">
                <div className="text-lg font-bold group-hover:scale-110 transition-transform">156</div>
                <div className="text-xs text-emerald-200">Lớp học</div>
                {/* Mini Sparkline */}
                <svg viewBox="0 0 50 15" className="w-full h-3 mt-1">
                  <polyline
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    points="0,12 8,8 16,10 24,6 32,8 40,4 48,2"
                  />
                </svg>
              </div>
              <div className="bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-colors cursor-pointer group">
                <div className="text-lg font-bold group-hover:scale-110 transition-transform">89</div>
                <div className="text-xs text-emerald-200">Giảng viên</div>
                {/* Mini Sparkline */}
                <svg viewBox="0 0 50 15" className="w-full h-3 mt-1">
                  <polyline
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    points="0,10 8,8 16,6 24,8 32,4 40,6 48,3"
                  />
                </svg>
              </div>
            </div>
            {/* Weekly Overview Mini Chart */}
            <div className="mt-3 bg-white/5 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-200">Tuần này</span>
                <span className="text-xs font-semibold text-white">+12%</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                {[40, 65, 45, 80, 55, 70, 35].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-white/30 rounded-sm transition-all hover:bg-white/50"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1 text-[8px] text-emerald-300/70">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
                <span>CN</span>
              </div>
            </div>
          </div>
        )}

        {/* Time & Date Section */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold font-mono tracking-wider">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-emerald-200 dark:text-emerald-300 mt-1">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        )}

        {/* Admin Button */}
        <div className={cn(
          "border-t border-white/10 relative",
          sidebarCollapsed ? "p-2" : "p-4"
        )}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/admin/login"
                className={cn(
                  "w-full flex items-center gap-3 rounded-xl bg-white/10 hover:bg-gradient-to-r hover:from-emerald-400/30 hover:to-teal-400/30 text-white transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg relative overflow-hidden",
                  sidebarCollapsed ? "px-2 py-2 justify-center" : "px-4 py-3"
                )}
              >
                {/* Pulsing indicator */}
                {!sidebarCollapsed && (
                  <div className="absolute top-2 right-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
                    </span>
                  </div>
                )}
                {sidebarCollapsed && (
                  <div className="absolute top-1 right-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-300"></span>
                    </span>
                  </div>
                )}
                <div className={cn(
                  "flex-shrink-0 p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors group-hover:rotate-12",
                  sidebarCollapsed && "p-1.5"
                )}>
                  <Shield className={cn("w-5 h-5", sidebarCollapsed && "w-4 h-4")} />
                </div>
                {!sidebarCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <span className="font-semibold">Quản trị viên</span>
                      <p className="text-xs text-emerald-200">Đăng nhập admin</p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </>
                )}
              </a>
            </TooltipTrigger>
            {sidebarCollapsed && (
              <TooltipContent side="right">
                <p>Quản trị viên</p>
              </TooltipContent>
            )}
          </Tooltip>
          
          {/* Collapse/Expand Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={cn(
                  "absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110",
                  sidebarCollapsed && "right-1/2 translate-x-1/2"
                )}
              >
                {sidebarCollapsed ? (
                  <ChevronsRight className="w-4 h-4" />
                ) : (
                  <ChevronsLeft className="w-4 h-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side={sidebarCollapsed ? "right" : "top"}>
              <p>{sidebarCollapsed ? "Mở rộng" : "Thu nhỏ"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Header with Glassmorphism */}
        <header className="sticky top-0 z-30 glass border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trang chủ</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Hệ thống cập nhật tự động các công việc</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden sm:flex h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tìm kiếm nhanh <kbd className="ml-1 px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700 rounded">Ctrl+K</kbd></p>
                </TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setShowNotificationCenter(true)}>
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="font-semibold">Thông báo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex items-start gap-3 p-3 cursor-pointer">
                      <div className={cn("p-1 rounded-full", getNotificationColor(notif.type))}>
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notif.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center text-emerald-600 dark:text-emerald-400 font-medium">
                    Xem tất cả thông báo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Feedback Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden sm:flex h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setShowFeedback(true)}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Gửi phản hồi</p>
                </TooltipContent>
              </Tooltip>

              {/* Help Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden sm:flex h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setShowWelcomeGuide(true)}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Hướng dẫn sử dụng</p>
                </TooltipContent>
              </Tooltip>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-9 px-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/prd-logo.png" alt="User" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">Admin</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Quản trị viên</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>Admin</span>
                      <span className="text-xs text-gray-500 font-normal">admin@prd.edu.vn</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setShowProfile(true); setProfileTab('info'); }}>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setShowProfile(true); setProfileTab('settings'); }}>
                    <Settings className="w-4 h-4 mr-2" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setShowProfile(true); setProfileTab('security'); }}>
                    <Shield className="w-4 h-4 mr-2" />
                    Bảo mật
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowShortcuts(true)}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Trợ giúp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => toast.info('Đăng xuất', { description: 'Tính năng đang được phát triển' })}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* System Status */}
              <Badge variant="outline" className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Hoạt động
              </Badge>
            </div>
          </div>
        </header>

        {/* News Ticker Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 py-2 overflow-hidden">
          <div className="flex items-center gap-3 px-4">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex-shrink-0">
              <Newspaper className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold whitespace-nowrap">Tin mới</span>
            </div>
            <div className="flex-1 text-center py-1">
              <span className="text-white/80 text-sm">Danh sách lớp học sẽ hiển thị tại đây sau khi được cập nhật</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-8">
            {!activeMenu ? (
              <>
                {/* Quick Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {quickStatsData.map((stat, index) => (
                    <div 
                      key={stat.id}
                      className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700 animate-in slide-in-from-bottom"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", stat.bg)}>
                          <div className={stat.color}>{stat.icon}</div>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white count-up-smooth">{stat.value}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Welcome Banner */}
                <Card className="mb-8 overflow-hidden border-0 shadow-xl relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700">
                  <CardContent className="p-0">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 parallax-float" />
                      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl parallax-float" style={{ animationDelay: '2s' }} />
                      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl parallax-float" style={{ animationDelay: '4s' }} />
                    </div>
                    
                    {/* Floating decoration */}
                    <div className="absolute top-10 right-10 opacity-20 group">
                      <Sparkles className="w-20 h-20 text-white animate-spin-slow" />
                      <div className="absolute inset-0 bg-white/20 blur-xl rounded-full group-hover:scale-150 transition-transform" />
                    </div>
                    
                    <div className="relative p-6 lg:p-10 z-10">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                            <span className="text-sm text-white/90">Hệ thống đang hoạt động</span>
                          </div>
                          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                            <span className="animated-gradient-text">Hệ thống cập nhật tự động</span>
                            <span className="block text-white mt-1">Phòng Đào tạo</span>
                          </h1>
                          <p className="text-emerald-100 max-w-xl">
                            Quản lý và theo dõi các hoạt động đào tạo một cách hiệu quả với hệ thống tự động hóa toàn diện.
                          </p>
                          <div className="flex flex-wrap gap-3 mt-5">
                            <Button 
                              size="default" 
                              className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg transition-all hover:scale-105 hover:shadow-xl group"
                              onClick={() => handleMenuClick(menuItems[0])}
                            >
                              <Calendar className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                              Xem thời khóa biểu
                            </Button>
                            <Button 
                              size="default" 
                              variant="outline" 
                              className="bg-transparent text-white border-white/30 hover:bg-white/10 transition-all hover:scale-105 group"
                              onClick={() => handleMenuClick(menuItems[1])}
                            >
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Thống kê
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <div className="text-xs text-white/70 mb-1">Truy cập nhanh</div>
                          <div className="flex gap-2">
                            {quickActions.map((action, index) => (
                              <Button
                                key={index}
                                size="sm"
                                className={cn("text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl group", action.color)}
                                title={action.label}
                                onClick={() => {
                                  toast.success(action.label, {
                                    description: index === 0 ? 'Đang mở form thêm lớp mới...' :
                                                 index === 1 ? 'Đang chuẩn bị xuất báo cáo...' :
                                                 index === 2 ? 'Đang làm mới dữ liệu hệ thống...' :
                                                 'Đang mở bộ lọc nâng cao...',
                                    icon: index === 0 ? <Plus className="w-4 h-4" /> :
                                          index === 1 ? <Download className="w-4 h-4" /> :
                                          index === 2 ? <RefreshCw className="w-4 h-4 animate-spin" /> :
                                          <Filter className="w-4 h-4" />,
                                  })
                                }}
                              >
                                <div className="group-hover:scale-110 transition-transform">
                                  {action.icon}
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid with Animated Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <AnimatedStatCard key={index} stat={stat} index={index} />
                  ))}
                </div>

                {/* Tabs for different views */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
                    <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 transition-all">
                      <LayoutGrid className="w-4 h-4" />
                      <span className="hidden sm:inline">Tổng quan</span>
                    </TabsTrigger>
                    <TabsTrigger value="charts" className="gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 transition-all">
                      <BarChart3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Biểu đồ</span>
                    </TabsTrigger>
                    <TabsTrigger value="classes" className="gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 transition-all">
                      <GraduationCap className="w-4 h-4" />
                      <span className="hidden sm:inline">Lớp học</span>
                    </TabsTrigger>
                    <TabsTrigger value="directory" className="gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 transition-all">
                      <Users className="w-4 h-4" />
                      <span className="hidden sm:inline">Giảng viên</span>
                    </TabsTrigger>
                    <TabsTrigger value="help" className="gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 transition-all">
                      <HelpCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Trợ giúp</span>
                    </TabsTrigger>
                    <TabsTrigger value="system" className="gap-2 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700 dark:data-[state=active]:bg-emerald-900/30 dark:data-[state=active]:text-emerald-400 transition-all">
                      <Server className="w-4 h-4" />
                      <span className="hidden sm:inline">Hệ thống</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-6 space-y-6">
                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Feature Cards */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-emerald-500" />
                            Chức năng chính
                          </h2>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={viewMode === 'grid' ? 'default' : 'ghost'}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setViewMode('grid')}
                            >
                              <LayoutGrid className="w-4 h-4" />
                            </Button>
                            <Button
                              variant={viewMode === 'list' ? 'default' : 'ghost'}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setViewMode('list')}
                            >
                              <List className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "grid gap-4",
                          viewMode === 'grid' ? "sm:grid-cols-2" : "grid-cols-1"
                        )}>
                          {menuItems.map((item, index) => (
                            <Card 
                              key={item.id}
                              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden bg-white dark:bg-gray-900 animate-in slide-in-from-left feature-card-border inner-glow"
                              onClick={() => handleMenuClick(item)}
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <CardContent className="p-0 relative">
                                {/* Animated gradient top border */}
                                <div className={cn(
                                  "h-1.5 bg-gradient-to-r animated-gradient",
                                  item.gradient
                                )} />
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  <div className="absolute inset-0 shimmer" />
                                </div>
                                <div className={cn("p-5 relative z-10", viewMode === 'list' && "flex items-center gap-4")}>
                                  {viewMode === 'grid' ? (
                                    <>
                                      <div className="flex items-start justify-between mb-3">
                                        <div className={cn(
                                          "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                                          item.gradient
                                        )}>
                                          {item.icon}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          {item.badge && (
                                            <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0 animate-pulse">
                                              {item.badge}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        {item.title}
                                      </h3>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {item.description}
                                      </p>
                                      <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:gap-2 transition-all">
                                          <span>Truy cập</span>
                                          <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />
                                        </div>
                                        {item.shortcut && (
                                          <Badge variant="outline" className="text-[10px] text-gray-400 border-gray-200 dark:border-gray-700 group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors">
                                            {item.shortcut}
                                          </Badge>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className={cn(
                                        "p-2.5 rounded-lg bg-gradient-to-br text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform",
                                        item.gradient
                                      )}>
                                        {item.icon}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            {item.title}
                                          </h3>
                                          {item.badge && (
                                            <Badge variant="secondary" className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0">
                                              {item.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Notifications */}
                        <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Bell className="w-4 h-4 text-emerald-500" />
                              Thông báo mới nhất
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {notifications.map((notif, index) => (
                              <div 
                                key={notif.id} 
                                className={cn(
                                  "flex items-start gap-3 p-3 rounded-xl border transition-all hover:shadow-sm cursor-pointer animate-in slide-in-from-right",
                                  getNotificationColor(notif.type)
                                )}
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="p-1 rounded-full bg-inherit">
                                  {notif.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{notif.title}</p>
                                  <p className="text-xs opacity-70 mt-0.5 line-clamp-2">{notif.description}</p>
                                  <p className="text-xs opacity-50 mt-1">{notif.time}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="border-0 shadow-md bg-white dark:bg-gray-900">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Clock className="w-4 h-4 text-emerald-500" />
                              Hoạt động gần đây
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm animate-in fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white">{activity.action}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {activity.user} • {activity.time}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Quick Links */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-emerald-500" />
                            Liên kết nhanh
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {[
                            { label: 'Website trường', icon: <Building2 className="w-4 h-4" /> },
                            { label: 'Thư viện số', icon: <BookOpen className="w-4 h-4" /> },
                            { label: 'Hướng dẫn sử dụng', icon: <HelpCircle className="w-4 h-4" /> },
                            { label: 'Liên hệ hỗ trợ', icon: <Users className="w-4 h-4" /> }
                          ].map((link, index) => (
                            <button key={index} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left group">
                              <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                                {link.icon}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">{link.label}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-emerald-500 transition-colors" />
                            </button>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Achievements */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-500" />
                            Thành tựu tháng
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 hover:scale-105 transition-transform">
                              <Target className="w-6 h-6 text-amber-500 mx-auto mb-1" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">98%</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Mục tiêu</div>
                            </div>
                            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 hover:scale-105 transition-transform">
                              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">45</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Hoàn thành</div>
                            </div>
                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 hover:scale-105 transition-transform">
                              <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                              <div className="text-lg font-bold text-gray-900 dark:text-white">12</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Đề xuất</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* System Info */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Settings className="w-4 h-4 text-emerald-500" />
                            Thông tin hệ thống
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Phiên bản</span>
                            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">v2.0.0</Badge>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Cập nhật cuối</span>
                            <span className="text-gray-900 dark:text-white font-medium">16/04/2026</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Trạng thái</span>
                            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-0">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                              Hoạt động
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* New Row: Calendar, Weather, Activity Timeline, Documents */}
                    <div className="grid lg:grid-cols-4 gap-6 mt-6">
                      {/* Interactive Calendar Widget */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all lg:col-span-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-emerald-500" />
                            Lịch tháng 4
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                              <div key={day} className="text-gray-400 font-medium py-1">{day}</div>
                            ))}
                            {Array.from({ length: 30 }, (_, i) => {
                              const day = i + 1
                              const isToday = day === 16
                              const hasEvent = [18, 20, 22, 25, 28].includes(day)
                              return (
                                <button
                                  key={day}
                                  className={cn(
                                    "p-1.5 rounded-lg text-sm transition-all hover:bg-emerald-100 dark:hover:bg-emerald-900/30 relative",
                                    isToday && "bg-emerald-500 text-white hover:bg-emerald-600",
                                    hasEvent && !isToday && "font-bold text-emerald-600 dark:text-emerald-400"
                                  )}
                                >
                                  {day}
                                  {hasEvent && !isToday && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                                  )}
                                </button>
                              )
                            })}
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300">18/4 - Hội nghị GV</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <span className="text-gray-700 dark:text-gray-300">20/4 - Hạn báo cáo</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Weather Widget */}
                      <Card className="border-0 shadow-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:shadow-lg transition-all lg:col-span-1 overflow-hidden">
                        <CardContent className="p-5 relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                          <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-sm text-cyan-100">Hà Nội</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Sun className="w-10 h-10 text-yellow-300" />
                                  <span className="text-4xl font-bold">{weatherData.current.temp}°</span>
                                </div>
                                <p className="text-sm text-cyan-100 mt-1">{weatherData.current.condition}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-cyan-100 mb-4">
                              <div className="flex items-center gap-1">
                                <Thermometer className="w-4 h-4" />
                                <span>{weatherData.current.humidity}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Wind className="w-4 h-4" />
                                <span>{weatherData.current.wind} km/h</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/20">
                              {weatherData.forecast.map((day, i) => (
                                <div key={i} className="text-center">
                                  <p className="text-xs text-cyan-100">{day.day}</p>
                                  <div className="my-1">
                                    {day.icon === 'sun' && <Sun className="w-4 h-4 mx-auto text-yellow-300" />}
                                    {day.icon === 'cloud-sun' && <CloudSun className="w-4 h-4 mx-auto text-cyan-200" />}
                                    {day.icon === 'cloud-rain' && <CloudRain className="w-4 h-4 mx-auto text-cyan-200" />}
                                    {day.icon === 'cloud' && <Cloud className="w-4 h-4 mx-auto text-cyan-200" />}
                                  </div>
                                  <p className="text-xs font-medium">{day.temp}°</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Activity Timeline */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all lg:col-span-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            Hoạt động
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                            <div className="space-y-4">
                              {activityTimeline.slice(0, 4).map((item, index) => (
                                <div key={item.id} className="relative flex gap-3 pl-6 animate-in slide-in-from-left" style={{ animationDelay: `${index * 100}ms` }}>
                                  <div className={cn(
                                    "absolute left-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white",
                                    item.color
                                  )}>
                                    {item.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.action}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.user} • {item.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Documents */}
                      <Card className="border-0 shadow-md bg-white dark:bg-gray-900 hover:shadow-lg transition-all lg:col-span-1">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <FolderOpen className="w-4 h-4 text-emerald-500" />
                            Tài liệu gần đây
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {recentDocuments.map((doc, index) => (
                            <button
                              key={doc.id}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left group animate-in fade-in"
                              style={{ animationDelay: `${index * 50}ms` }}
                              onClick={() => toast.info(`Đang mở ${doc.name}`, { icon: <FileText className="w-4 h-4" /> })}
                            >
                              <div className={cn(
                                "p-2 rounded-lg",
                                doc.type === 'pdf' && "bg-red-100 dark:bg-red-900/30 text-red-600",
                                doc.type === 'excel' && "bg-green-100 dark:bg-green-900/30 text-green-600",
                                doc.type === 'doc' && "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                              )}>
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{doc.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{doc.size}</p>
                              </div>
                              <FileCheck className={cn(
                                "w-4 h-4",
                                doc.status === 'completed' ? "text-emerald-500" : "text-amber-500"
                              )} />
                            </button>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Charts Tab */}
                  <TabsContent value="charts" className="mt-6 space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Monthly Trend Chart */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            Xu hướng theo tháng
                          </CardTitle>
                          <CardDescription>Số lượng lớp học và giảng viên trong năm 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <AreaChart data={monthlyData}>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="month" className="text-xs" />
                              <YAxis className="text-xs" />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area type="monotone" dataKey="classes" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                              <Area type="monotone" dataKey="teachers" stackId="2" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                            </AreaChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Weekly Hours Chart */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            Giờ giảng theo tuần
                          </CardTitle>
                          <CardDescription>Phân bố giờ giảng trong tuần hiện tại</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <BarChart data={weeklyHoursData}>
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                              <XAxis dataKey="day" className="text-xs" />
                              <YAxis className="text-xs" />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Department Distribution */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-emerald-500" />
                            Phân bố theo khoa
                          </CardTitle>
                          <CardDescription>Tỷ lệ lớp học theo từng khoa</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <PieChart>
                              <Pie
                                data={departmentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {departmentData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Legend />
                            </PieChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Performance Gauge */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-emerald-500" />
                            Hiệu suất tổng thể
                          </CardTitle>
                          <CardDescription>Đánh giá hiệu suất hoạt động hệ thống</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig} className="h-[300px]">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="80%" data={performanceData}>
                              <RadialBar
                                background
                                dataKey="value"
                                cornerRadius={10}
                              />
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </RadialBarChart>
                          </ChartContainer>
                          <div className="text-center mt-4">
                            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">94%</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Vượt mục tiêu 4%</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Classes Tab */}
                  <TabsContent value="classes" className="mt-6">
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-emerald-500" />
                              Danh sách lớp học
                            </CardTitle>
                            <CardDescription>Quản lý và theo dõi các lớp học trong hệ thống</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Lọc theo khoa" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Tất cả khoa</SelectItem>
                                <SelectItem value="CNTT">CNTT</SelectItem>
                                <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                                <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                                <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" className="gap-2">
                              <Plus className="w-4 h-4" />
                              Thêm lớp
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50 dark:bg-gray-800">
                                <TableHead className="font-semibold">Mã lớp</TableHead>
                                <TableHead className="font-semibold">Tên lớp</TableHead>
                                <TableHead className="font-semibold">Khoa</TableHead>
                                <TableHead className="font-semibold">Giảng viên</TableHead>
                                <TableHead className="font-semibold">Sĩ số</TableHead>
                                <TableHead className="font-semibold">Lịch học</TableHead>
                                <TableHead className="font-semibold">Trạng thái</TableHead>
                                <TableHead className="font-semibold text-right">Thao tác</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredClassData.map((cls, index) => (
                                <TableRow key={cls.id} className="animate-in fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                  <TableCell className="font-mono text-sm">{cls.id}</TableCell>
                                  <TableCell className="font-medium">{cls.name}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className="text-xs">{cls.department}</Badge>
                                  </TableCell>
                                  <TableCell>{cls.teacher}</TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-1">
                                      <Users className="w-3 h-3 text-gray-400" />
                                      {cls.students}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm text-gray-500">{cls.schedule}</TableCell>
                                  <TableCell>{getStatusBadge(cls.status)}</TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="w-4 h-4 mr-2" />
                                          Xem chi tiết
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Edit className="w-4 h-4 mr-2" />
                                          Chỉnh sửa
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Copy className="w-4 h-4 mr-2" />
                                          Sao chép
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                          <Trash2 className="w-4 h-4 mr-2" />
                                          Xóa
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* System Tab */}
                  <TabsContent value="system" className="mt-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* System Metrics */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-500" />
                            Tài nguyên hệ thống
                          </CardTitle>
                          <CardDescription>Theo dõi hiệu suất hệ thống theo thời gian thực</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {systemMetrics.map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className={metric.color}>{metric.icon}</span>
                                  <span className="text-sm font-medium">{metric.label}</span>
                                </div>
                                <span className="text-sm font-bold">{metric.value}</span>
                              </div>
                              <Progress 
                                value={parseInt(metric.value)} 
                                className={cn(
                                  "h-2",
                                  parseInt(metric.value) > 80 && "[&>div]:bg-red-500",
                                  parseInt(metric.value) > 60 && parseInt(metric.value) <= 80 && "[&>div]:bg-amber-500"
                                )}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Database Info */}
                      <Card className="border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-emerald-500" />
                            Cơ sở dữ liệu
                          </CardTitle>
                          <CardDescription>Thông tin kết nối và trạng thái database</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">15.2 GB</div>
                              <div className="text-sm text-gray-500">Dung lượng sử dụng</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">2.3M</div>
                              <div className="text-sm text-gray-500">Số bản ghi</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">99.9%</div>
                              <div className="text-sm text-gray-500">Uptime</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                              <div className="text-2xl font-bold text-emerald-600">12ms</div>
                              <div className="text-sm text-gray-500">Latency</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              <span className="font-medium">Kết nối ổn định</span>
                            </div>
                            <span className="text-sm text-gray-500">Last sync: 2 phút trước</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Backups */}
                      <Card className="border-0 shadow-md lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Layers className="w-5 h-5 text-emerald-500" />
                            Sao lưu gần đây
                          </CardTitle>
                          <CardDescription>Lịch sử sao lưu dữ liệu hệ thống</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              { date: '16/04/2026 08:00', size: '15.2 GB', status: 'success', type: 'Tự động' },
                              { date: '15/04/2026 08:00', size: '15.1 GB', status: 'success', type: 'Tự động' },
                              { date: '14/04/2026 20:00', size: '15.0 GB', status: 'success', type: 'Thủ công' },
                              { date: '14/04/2026 08:00', size: '14.9 GB', status: 'success', type: 'Tự động' },
                            ].map((backup, index) => (
                              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex items-center gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                  <div>
                                    <p className="font-medium">{backup.date}</p>
                                    <p className="text-sm text-gray-500">{backup.type}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{backup.size}</p>
                                  <Badge variant="outline" className="text-emerald-600 border-emerald-200">Thành công</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Directory Tab */}
                  <TabsContent value="directory" className="mt-6 space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Teacher Directory */}
                      <div className="lg:col-span-2">
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <Users className="w-5 h-5 text-emerald-500" />
                                  Danh sách giảng viên
                                </CardTitle>
                                <CardDescription>Thông tin chi tiết các giảng viên trong hệ thống</CardDescription>
                              </div>
                              <Button size="sm" className="gap-2 w-full sm:w-auto">
                                <Plus className="w-4 h-4" />
                                Thêm giảng viên
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="rounded-lg border overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                                    <TableHead className="font-semibold">Giảng viên</TableHead>
                                    <TableHead className="font-semibold">Khoa</TableHead>
                                    <TableHead className="font-semibold">Chức vụ</TableHead>
                                    <TableHead className="font-semibold">Lớp</TableHead>
                                    <TableHead className="font-semibold">Đánh giá</TableHead>
                                    <TableHead className="font-semibold text-right">Thao tác</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {teacherData.map((teacher, index) => (
                                    <TableRow key={teacher.id} className="animate-in fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                      <TableCell>
                                        <div className="flex items-center gap-3">
                                          <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                              {teacher.avatar}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <p className="font-medium">{teacher.name}</p>
                                            <p className="text-xs text-gray-500">{teacher.email}</p>
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className="text-xs">{teacher.department}</Badge>
                                      </TableCell>
                                      <TableCell className="text-sm">{teacher.position}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <GraduationCap className="w-3 h-3 text-gray-400" />
                                          {teacher.classes}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1">
                                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                          <span className="font-medium">{teacher.rating}</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                              <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                              <Eye className="w-4 h-4 mr-2" />
                                              Xem chi tiết
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Mail className="w-4 h-4 mr-2" />
                                              Gửi email
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Phone className="w-4 h-4 mr-2" />
                                              Gọi điện
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                              <Trash2 className="w-4 h-4 mr-2" />
                                              Xóa
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Calendar Events */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <CalendarDays className="w-5 h-5 text-emerald-500" />
                              Lịch sắp tới
                            </CardTitle>
                            <CardDescription>Các sự kiện và cuộc họp trong tuần</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {calendarEvents.map((event, index) => (
                              <div 
                                key={event.id} 
                                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div className={cn("w-2 h-full min-h-[40px] rounded-full", event.color)} />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{event.title}</p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span>{event.date}</span>
                                    <span>•</span>
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Announcements */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Megaphone className="w-5 h-5 text-emerald-500" />
                              Thông báo
                            </CardTitle>
                            <CardDescription>Các thông báo quan trọng từ Ban giám hiệu</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {announcements.map((ann, index) => (
                              <div 
                                key={ann.id} 
                                className={cn(
                                  "p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer animate-in fade-in",
                                  ann.priority === 'high' 
                                    ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800" 
                                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <div className="flex items-start gap-2">
                                  {ann.priority === 'high' && (
                                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  )}
                                  <div>
                                    <p className="font-medium text-sm">{ann.title}</p>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                                    <p className="text-xs text-gray-400 mt-2">{ann.date}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Help Tab */}
                  <TabsContent value="help" className="mt-6 space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* FAQ Section */}
                      <div className="lg:col-span-2">
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MessageCircle className="w-5 h-5 text-emerald-500" />
                              Câu hỏi thường gặp
                            </CardTitle>
                            <CardDescription>Tìm câu trả lời cho các thắc mắc phổ biến</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {faqData.map((faq, index) => (
                              <details 
                                key={faq.id} 
                                className="group rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                                      {faq.category}
                                    </Badge>
                                    <span className="font-medium text-sm">{faq.question}</span>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                                </div>
                              </details>
                            ))}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Quick Help */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-emerald-500" />
                              Hỗ trợ nhanh
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">Hướng dẫn sử dụng</p>
                                <p className="text-xs text-gray-500">Xem tài liệu hướng dẫn chi tiết</p>
                              </div>
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">Video hướng dẫn</p>
                                <p className="text-xs text-gray-500">Xem các video tutorial</p>
                              </div>
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3">
                              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">Diễn đàn hỗ trợ</p>
                                <p className="text-xs text-gray-500">Thảo luận với cộng đồng</p>
                              </div>
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Contact Support */}
                        <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Heart className="w-5 h-5" />
                              <span className="font-semibold">Cần hỗ trợ?</span>
                            </div>
                            <p className="text-emerald-100 text-sm mb-4">
                              Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn 24/7
                            </p>
                            <div className="space-y-3">
                              <Button variant="secondary" size="sm" className="w-full gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                                <Mail className="w-4 h-4" />
                                support@prd.edu.vn
                              </Button>
                              <Button variant="secondary" size="sm" className="w-full gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30">
                                <Phone className="w-4 h-4" />
                                1900-xxxx
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Keyboard Shortcuts */}
                        <Card className="border-0 shadow-md">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <Settings className="w-5 h-5 text-emerald-500" />
                              Phím tắt
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {[
                              { key: 'Ctrl + K', action: 'Mở tìm kiếm' },
                              { key: 'Ctrl + 1-4', action: 'Mở menu nhanh' },
                              { key: 'ESC', action: 'Đóng/Quay lại' },
                            ].map((shortcut, index) => (
                              <div key={index} className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">{shortcut.action}</span>
                                <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded font-mono">{shortcut.key}</kbd>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              /* App Frame View */
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveMenu(null)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                      Quay lại
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "p-2 rounded-lg bg-gradient-to-br text-white",
                        menuItems.find(m => m.id === activeMenu)?.gradient
                      )}>
                        {menuItems.find(m => m.id === activeMenu)?.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {menuItems.find(m => m.id === activeMenu)?.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {menuItems.find(m => m.id === activeMenu)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Làm mới
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Mở mới
                    </Button>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-[calc(100vh-220px)] min-h-[600px] w-full rounded-xl" />
                  </div>
                ) : (
                  <Card className="overflow-hidden border-0 shadow-xl bg-white dark:bg-gray-900">
                    <CardContent className="p-0">
                      <iframe
                        src={menuItems.find(m => m.id === activeMenu)?.link || ''}
                        className="w-full h-[calc(100vh-220px)] min-h-[600px] border-0"
                        title={menuItems.find(m => m.id === activeMenu)?.title}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Enhanced Footer */}
        <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <div className="px-4 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Column 1: Logo & Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <img src="/prd-logo.png" alt="Logo PRD" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Phòng Đào Tạo</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hệ thống quản lý</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Hệ thống quản lý đào tạo toàn diện, hỗ trợ giảng viên và sinh viên theo dõi lịch học, báo cáo và thống kê.
                </p>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Liên kết nhanh</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => setActiveMenu(null)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Trang chủ
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveTab('charts')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Thống kê
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveMenu('gantt')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Lịch học
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Support */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Hỗ trợ</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => setShowWelcomeGuide(true)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Hướng dẫn
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setShowFeedback(true)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Liên hệ hỗ trợ
                    </button>
                  </li>
                  <li>
                    <a href="mailto:support@prd.edu.vn" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      support@prd.edu.vn
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: System Info */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Thông tin hệ thống</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Phiên bản</span>
                    <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">v3.0.0</Badge>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Cập nhật cuối</span>
                    <span className="text-gray-700 dark:text-gray-300">16/04/2026</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Trạng thái</span>
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Hoạt động
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
                <p>© 2026 Phòng Đào Tạo. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline">Lần truy cập cuối: {formatTime(currentTime)}</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowSearch(false)}>
          <Card className="w-full max-w-xl mx-4 shadow-2xl border-0 animate-in slide-in-from-top" onClick={e => e.stopPropagation()}>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm chức năng..."
                  className="pl-10 h-12 text-lg"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd>
              </div>
              {searchQuery && (
                <div className="mt-4 space-y-2">
                  {filteredMenuItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleMenuClick(item)
                        setShowSearch(false)
                        setSearchQuery('')
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-in fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={cn("p-2 rounded-lg bg-gradient-to-br text-white", item.gradient)}>
                        {item.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowShortcuts(false)}>
          <Card className="w-full max-w-lg mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  Phím tắt
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowShortcuts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Sử dụng các phím tắt để làm việc nhanh hơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { keys: ['Ctrl', 'K'], action: 'Mở tìm kiếm nhanh', icon: <Search className="w-4 h-4" /> },
                { keys: ['Ctrl', '1'], action: 'Mở Gantt Chart TKB', icon: <Calendar className="w-4 h-4" /> },
                { keys: ['Ctrl', '2'], action: 'Mở Thống kê giờ giảng', icon: <BarChart3 className="w-4 h-4" /> },
                { keys: ['Ctrl', '3'], action: 'Mở Báo cáo tiến độ', icon: <FileText className="w-4 h-4" /> },
                { keys: ['Ctrl', '4'], action: 'Mở Tình hình mở lớp', icon: <Users className="w-4 h-4" /> },
                { keys: ['F1'], action: 'Hiển thị trợ giúp', icon: <HelpCircle className="w-4 h-4" /> },
                { keys: ['ESC'], action: 'Đóng dialog/quay lại', icon: <X className="w-4 h-4" /> },
              ].map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-in slide-in-from-left" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      {shortcut.icon}
                    </div>
                    <span className="text-sm font-medium">{shortcut.action}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex}>
                        <kbd className="px-2 py-1 text-xs font-semibold bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && <span className="mx-0.5 text-gray-400">+</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowShortcuts(false)}>
                  Đóng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowFeedback(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  Gửi phản hồi
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowFeedback(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Chia sẻ ý kiến của bạn để chúng tôi cải thiện hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Loại phản hồi</label>
                <Select defaultValue="suggestion">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">💡 Đề xuất tính năng</SelectItem>
                    <SelectItem value="bug">🐛 Báo cáo lỗi</SelectItem>
                    <SelectItem value="question">❓ Câu hỏi</SelectItem>
                    <SelectItem value="other">📝 Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nội dung</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Nhập nội dung phản hồi của bạn..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowFeedback(false)}>
                  Hủy
                </Button>
                <Button 
                  size="sm" 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    toast.success('Cảm ơn phản hồi của bạn!', {
                      description: 'Chúng tôi sẽ xem xét và phản hồi sớm nhất.',
                      icon: <Heart className="w-4 h-4" />,
                    })
                    setShowFeedback(false)
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gửi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Profile Settings Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowProfile(false)}>
          <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-500" />
                  Cài đặt tài khoản
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowProfile(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={profileTab} onValueChange={setProfileTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="info" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Thông tin</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Cài đặt</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="hidden sm:inline">Bảo mật</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 animate-in fade-in">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/prd-logo.png" alt="User" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-bold">AD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Đổi ảnh đại diện</Button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Họ và tên</label>
                        <Input defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input defaultValue="admin@prd.edu.vn" type="email" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Số điện thoại</label>
                        <Input defaultValue="0901234567" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chức vụ</label>
                        <Input defaultValue="Quản trị viên" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Khoa/Phòng ban</label>
                      <Select defaultValue="admin">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Ban quản trị</SelectItem>
                          <SelectItem value="cntt">Khoa CNTT</SelectItem>
                          <SelectItem value="kinhte">Khoa Kinh tế</SelectItem>
                          <SelectItem value="kythuat">Khoa Kỹ thuật</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 animate-in fade-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Thông báo email</p>
                          <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 accent-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Ngôn ngữ</p>
                          <p className="text-sm text-gray-500">Chọn ngôn ngữ hiển thị</p>
                        </div>
                      </div>
                      <Select defaultValue="vi">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Định dạng ngày</p>
                          <p className="text-sm text-gray-500">Chọn định dạng hiển thị ngày</p>
                        </div>
                      </div>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4 animate-in fade-in">
                  <div className="space-y-4">
                    <Card className="border border-gray-200 dark:border-gray-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Đổi mật khẩu</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mật khẩu hiện tại</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Mật khẩu mới</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <Button className="bg-emerald-500 hover:bg-emerald-600">Cập nhật mật khẩu</Button>
                      </CardContent>
                    </Card>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Xác thực hai yếu tố</p>
                          <p className="text-sm text-gray-500">Bảo vệ tài khoản với 2FA</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Bật</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        <div>
                          <p className="font-medium">Lịch sử đăng nhập</p>
                          <p className="text-sm text-gray-500">Xem các phiên đăng nhập gần đây</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Xem</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="pt-4 mt-4 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowProfile(false)}>Hủy</Button>
                <Button 
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => {
                    toast.success('Đã lưu thay đổi!', { icon: <CheckCircle2 className="w-4 h-4" /> })
                    setShowProfile(false)
                  }}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowExport(false)}>
          <Card className="w-full max-w-md mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-500" />
                  Xuất dữ liệu
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowExport(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Chọn định dạng xuất dữ liệu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {exportOptions.map((option, index) => (
                <button
                  key={option.id}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group animate-in slide-in-from-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => {
                    toast.success(`Đang xuất ${option.label}...`, {
                      description: 'File sẽ được tải xuống trong giây lát.',
                      icon: option.icon,
                    })
                    setShowExport(false)
                  }}
                >
                  <div className={cn("p-3 rounded-lg text-white group-hover:scale-110 transition-transform", option.color)}>
                    {option.icon}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                </button>
              ))}
              <div className="pt-4 border-t mt-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Tùy chọn xuất</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="accent-emerald-500" />
                    <span>Bao gồm biểu đồ</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-emerald-500" />
                    <span>Chỉ dữ liệu tháng hiện tại</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification Center Panel */}
      {showNotificationCenter && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowNotificationCenter(false)}>
          <Card className="w-full sm:w-96 h-[80vh] sm:h-auto sm:max-h-[80vh] shadow-2xl border-0 rounded-l-2xl sm:rounded-2xl animate-in slide-in-from-right sm:zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-500" />
                  Trung tâm thông báo
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowNotificationCenter(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {['all', 'unread', 'system', 'reminder'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setNotificationFilter(filter)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-full transition-all",
                      notificationFilter === filter
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {filter === 'all' ? 'Tất cả' : filter === 'unread' ? 'Chưa đọc' : filter === 'system' ? 'Hệ thống' : 'Nhắc nhở'}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto max-h-[60vh]">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-3">
                  {allNotifications
                    .filter(n => notificationFilter === 'all' || 
                                 (notificationFilter === 'unread' && !n.read) ||
                                 (notificationFilter === n.category))
                    .map((notif, index) => (
                    <div 
                      key={notif.id}
                      className={cn(
                        "p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer animate-in fade-in",
                        !notif.read && "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800",
                        notif.read && "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          notif.type === 'success' && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600",
                          notif.type === 'warning' && "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
                          notif.type === 'info' && "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        )}>
                          {notif.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
                          {notif.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                          {notif.type === 'info' && <Info className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{notif.title}</p>
                            {!notif.read && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{notif.description}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast.success('Đã đánh dấu tất cả là đã đọc')
                  setShowNotificationCenter(false)
                }}
              >
                Đánh dấu tất cả đã đọc
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Welcome Guide Modal */}
      {showWelcomeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowWelcomeGuide(false)}>
          <Card className="w-full max-w-lg mx-4 shadow-2xl border-0 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-xl">Chào mừng đến với Hệ thống Phòng Đào Tạo!</CardTitle>
              <CardDescription>Khám phá các tính năng hữu ích để làm việc hiệu quả hơn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  icon: <Search className="w-5 h-5" />, 
                  title: 'Tìm kiếm nhanh', 
                  description: 'Sử dụng thanh tìm kiếm để tìm lớp theo mã (VD: 1/2026)',
                  color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                },
                { 
                  icon: <Zap className="w-5 h-5" />, 
                  title: 'Phím tắt', 
                  description: 'Nhấn Ctrl+K để tìm kiếm nhanh',
                  color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                },
                { 
                  icon: <Menu className="w-5 h-5" />, 
                  title: 'Điều hướng', 
                  description: 'Bấm vào các menu bên trái để truy cập chức năng',
                  color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                },
                { 
                  icon: <Shield className="w-5 h-5" />, 
                  title: 'Quản trị', 
                  description: 'Truy cập Quản trị viên ở cuối sidebar để cấu hình hệ thống',
                  color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                },
              ].map((tip, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors animate-in slide-in-from-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn("p-2.5 rounded-xl flex-shrink-0", tip.color)}>
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{tip.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{tip.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-6 pt-2">
              <Button 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
                onClick={() => {
                  sessionStorage.setItem('hasSeenWelcomeGuide', 'true')
                  setShowWelcomeGuide(false)
                }}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Bắt đầu sử dụng
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Floating Help Button */}
      <button
        onClick={() => setShowWelcomeGuide(true)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        <HelpCircle className="w-6 h-6 text-white" />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25"></span>
      </button>

      {/* Quick Actions Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Quick Actions Menu */}
          {showQuickActions && (
            <div className="absolute bottom-16 right-0 flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-200">
              {[
                { icon: <Plus className="w-5 h-5" />, label: 'Thêm mới', color: 'bg-emerald-500', action: () => toast.success('Mở form thêm mới') },
                { icon: <Download className="w-5 h-5" />, label: 'Xuất dữ liệu', color: 'bg-blue-500', action: () => setShowExport(true) },
                { icon: <RefreshCw className="w-5 h-5" />, label: 'Làm mới', color: 'bg-purple-500', action: () => toast.success('Đã làm mới dữ liệu') },
                { icon: <Bell className="w-5 h-5" />, label: 'Thông báo', color: 'bg-amber-500', action: () => setShowNotificationCenter(true) },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all group"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => {
                    action.action()
                    setShowQuickActions(false)
                  }}
                >
                  <div className={cn("p-2 rounded-lg text-white", action.color)}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Main FAB Button */}
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className={cn(
              "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300",
              showQuickActions 
                ? "bg-gray-700 dark:bg-gray-600 rotate-45" 
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-110 hover:shadow-2xl"
            )}
          >
            {showQuickActions ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Google Apps Script Iframe Overlay */}
      {showIframe && (
        <div className={cn(
          "fixed bg-white dark:bg-gray-950 animate-in fade-in duration-200",
          iframeFullscreen ? "inset-0 z-[70]" : "inset-0 z-[60]"
        )}>
          {/* Header Bar */}
          <div className={cn(
            "fixed top-0 left-0 right-0 h-14 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-800 dark:to-teal-900 shadow-lg z-10 flex items-center justify-between px-4",
            iframeFullscreen && "z-[71]"
          )}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">{iframeTitle}</h2>
                <p className="text-emerald-200 text-xs">Google Apps Script</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={handleRefreshIframe}
                disabled={iframeLoading}
              >
                <RefreshCw className={cn("w-4 h-4", iframeLoading && "animate-spin")} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={toggleIframeFullscreen}
              >
                {iframeFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => window.open(iframeUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  navigator.clipboard.writeText(iframeUrl)
                  toast.success('Đã sao chép link!', { icon: <Copy className="w-4 h-4" /> })
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  const printWindow = window.open(iframeUrl, '_blank')
                  if (printWindow) {
                    printWindow.onload = () => {
                      printWindow.print()
                    }
                  }
                  toast.success('Đang chuẩn bị in...', { icon: <Printer className="w-4 h-4" /> })
                }}
              >
                <Printer className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 bg-white/20 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  setShowIframe(false)
                  setIframeFullscreen(false)
                }}
              >
                <X className="w-4 h-4 mr-1" />
                Đóng
              </Button>
            </div>
          </div>
          
          {/* Loading Overlay */}
          {iframeLoading && (
            <div className="fixed inset-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm flex items-center justify-center pt-14">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-200 dark:border-emerald-800 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Đang tải nội dung...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vui lòng đợi trong giây lát</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Iframe Content */}
          <iframe 
            key={iframeKey}
            src={iframeUrl}
            width="100%"
            height="100%"
            allowFullScreen
            className="pt-14"
            style={{ border: 'none' }}
            onLoad={handleIframeLoad}
          />
        </div>
      )}
    </div>
    </TooltipProvider>
  )
}
