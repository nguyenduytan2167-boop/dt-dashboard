'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Link2,
  Database,
  Calendar,
  BarChart3,
  FileText,
  Users,
  Shield,
  CheckCircle2,
  XCircle,
  Save,
  RefreshCw,
  ArrowLeft
} from 'lucide-react'

interface GoogleSheetLink {
  id: string
  name: string
  description: string | null
  url: string
  category: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface ClassData {
  id: string
  classCode: string
  name: string | null
  teacher: string | null
  schedule: string | null
  status: string
  sheetId: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminPanelPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sheets, setSheets] = useState<GoogleSheetLink[]>([])
  const [classes, setClasses] = useState<ClassData[]>([])
  const [activeTab, setActiveTab] = useState('sheets')
  const [showAddSheet, setShowAddSheet] = useState(false)
  const [showAddClass, setShowAddClass] = useState(false)
  const [editingSheet, setEditingSheet] = useState<GoogleSheetLink | null>(null)
  const [editingClass, setEditingClass] = useState<ClassData | null>(null)

  // Form states
  const [sheetForm, setSheetForm] = useState({
    name: '',
    description: '',
    url: '',
    category: 'gantt',
    order: 0
  })

  const [classForm, setClassForm] = useState({
    classCode: '',
    name: '',
    teacher: '',
    schedule: '',
    status: 'active',
    sheetId: ''
  })

  // Fetch functions
  const fetchSheets = async () => {
    try {
      const response = await fetch('/api/admin/sheets')
      const data = await response.json()
      if (data.success) {
        setSheets(data.data)
      }
    } catch {
      toast.error('Không thể tải danh sách Google Sheet')
    }
  }

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/admin/classes')
      const data = await response.json()
      if (data.success) {
        setClasses(data.data)
      }
    } catch {
      toast.error('Không thể tải danh sách lớp học')
    }
  }

  // Check authentication and fetch data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/login')
        const data = await response.json()
        setIsAuthenticated(data.authenticated)
        if (!data.authenticated) {
          router.push('/admin/login')
        }
      } catch {
        setIsAuthenticated(false)
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [router])

  // Fetch data when authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return
      
      try {
        const [sheetsRes, classesRes] = await Promise.all([
          fetch('/api/admin/sheets'),
          fetch('/api/admin/classes')
        ])
        const sheetsData = await sheetsRes.json()
        const classesData = await classesRes.json()
        
        if (sheetsData.success) setSheets(sheetsData.data)
        if (classesData.success) setClasses(classesData.data)
      } catch {
        toast.error('Không thể tải dữ liệu')
      }
    }
    fetchData()
  }, [isAuthenticated])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' })
      toast.success('Đăng xuất thành công')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Lỗi khi đăng xuất')
    }
  }

  const handleAddSheet = async () => {
    if (!sheetForm.name || !sheetForm.url) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    try {
      const response = await fetch('/api/admin/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetForm)
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Đã thêm Google Sheet thành công')
        setShowAddSheet(false)
        setSheetForm({ name: '', description: '', url: '', category: 'gantt', order: 0 })
        fetchSheets()
      } else {
        toast.error(data.message || 'Lỗi khi thêm')
      }
    } catch (error) {
      toast.error('Lỗi hệ thống')
    }
  }

  const handleUpdateSheet = async () => {
    if (!editingSheet) return

    try {
      const response = await fetch('/api/admin/sheets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingSheet, ...sheetForm })
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Đã cập nhật thành công')
        setEditingSheet(null)
        setSheetForm({ name: '', description: '', url: '', category: 'gantt', order: 0 })
        fetchSheets()
      } else {
        toast.error(data.message || 'Lỗi khi cập nhật')
      }
    } catch (error) {
      toast.error('Lỗi hệ thống')
    }
  }

  const handleDeleteSheet = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa link này?')) return

    try {
      const response = await fetch(`/api/admin/sheets?id=${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (data.success) {
        toast.success('Đã xóa thành công')
        fetchSheets()
      } else {
        toast.error(data.message || 'Lỗi khi xóa')
      }
    } catch (error) {
      toast.error('Lỗi hệ thống')
    }
  }

  const handleAddClass = async () => {
    if (!classForm.classCode) {
      toast.error('Mã lớp là bắt buộc')
      return
    }

    try {
      const response = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classForm)
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Đã thêm lớp học thành công')
        setShowAddClass(false)
        setClassForm({ classCode: '', name: '', teacher: '', schedule: '', status: 'active', sheetId: '' })
        fetchClasses()
      } else {
        toast.error(data.message || 'Lỗi khi thêm')
      }
    } catch (error) {
      toast.error('Lỗi hệ thống')
    }
  }

  const handleUpdateClass = async () => {
    if (!editingClass) return

    try {
      const response = await fetch('/api/admin/classes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingClass, ...classForm })
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Đã cập nhật thành công')
        setEditingClass(null)
        setClassForm({ classCode: '', name: '', teacher: '', schedule: '', status: 'active', sheetId: '' })
        fetchClasses()
      } else {
        toast.error(data.message || 'Lỗi khi cập nhật')
      }
    } catch (error) {
      toast.error('Lỗi hệ thống')
    }
  }

  const handleDeleteClass = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa lớp này?')) return

    try {
      const response = await fetch(`/api/admin/classes?id=${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (data.success) {
        toast.success('Đã xóa thành công')
        fetchClasses()
      } else {
        toast.error(data.message || 'Lỗi khi xóa')
      }
    } catch (error) {
      toast.error('Lỗi hệ thống')
    }
  }

  const openEditSheet = (sheet: GoogleSheetLink) => {
    setEditingSheet(sheet)
    setSheetForm({
      name: sheet.name,
      description: sheet.description || '',
      url: sheet.url,
      category: sheet.category,
      order: sheet.order
    })
  }

  const openEditClass = (cls: ClassData) => {
    setEditingClass(cls)
    setClassForm({
      classCode: cls.classCode,
      name: cls.name || '',
      teacher: cls.teacher || '',
      schedule: cls.schedule || '',
      status: cls.status,
      sheetId: cls.sheetId || ''
    })
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'gantt': return { label: 'Gantt Chart TKB', icon: <Calendar className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' }
      case 'stats': return { label: 'Thống kê giờ giảng', icon: <BarChart3 className="w-4 h-4" />, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' }
      case 'progress': return { label: 'Báo cáo tiến độ', icon: <FileText className="w-4 h-4" />, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' }
      case 'classes': return { label: 'Tình hình mở lớp', icon: <Users className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' }
      default: return { label: category, icon: <Link2 className="w-4 h-4" />, color: 'bg-gray-100 text-gray-700' }
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
          <span>Đang kiểm tra xác thực...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Trang Quản trị viên</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hệ thống Phòng Đào Tạo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Trang chủ
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid mb-6">
            <TabsTrigger value="sheets" className="gap-2">
              <Link2 className="w-4 h-4" />
              Google Sheet Links
            </TabsTrigger>
            <TabsTrigger value="classes" className="gap-2">
              <Database className="w-4 h-4" />
              Dữ liệu lớp học
            </TabsTrigger>
          </TabsList>

          {/* Google Sheets Tab */}
          <TabsContent value="sheets">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quản lý Google Sheet Links</CardTitle>
                    <CardDescription>
                      Thêm và quản lý các liên kết Google Apps Script cho các chức năng
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddSheet(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm link mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {sheets.length === 0 ? (
                  <div className="text-center py-12">
                    <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Chưa có Google Sheet link nào</p>
                    <Button className="mt-4" onClick={() => setShowAddSheet(true)}>
                      Thêm link đầu tiên
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sheets.map((sheet) => {
                        const catInfo = getCategoryInfo(sheet.category)
                        return (
                          <TableRow key={sheet.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{sheet.name}</p>
                                {sheet.description && (
                                  <p className="text-sm text-gray-500">{sheet.description}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={catInfo.color}>
                                <span className="flex items-center gap-1">
                                  {catInfo.icon}
                                  {catInfo.label}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <a
                                href={sheet.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Mở link
                              </a>
                            </TableCell>
                            <TableCell>
                              {sheet.isActive ? (
                                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Hoạt động
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-700">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Tạm dừng
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => openEditSheet(sheet)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteSheet(sheet.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Dữ liệu lớp học</CardTitle>
                    <CardDescription>
                      Quản lý dữ liệu lớp học cho tìm kiếm tại trang chủ
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddClass(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm lớp mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {classes.length === 0 ? (
                  <div className="text-center py-12">
                    <Database className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Chưa có dữ liệu lớp học nào</p>
                    <Button className="mt-4" onClick={() => setShowAddClass(true)}>
                      Thêm lớp đầu tiên
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã lớp</TableHead>
                        <TableHead>Tên lớp</TableHead>
                        <TableHead>Giảng viên</TableHead>
                        <TableHead>Lịch học</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classes.map((cls) => (
                        <TableRow key={cls.id}>
                          <TableCell className="font-medium">{cls.classCode}</TableCell>
                          <TableCell>{cls.name || '-'}</TableCell>
                          <TableCell>{cls.teacher || '-'}</TableCell>
                          <TableCell>{cls.schedule || '-'}</TableCell>
                          <TableCell>
                            {cls.status === 'active' ? (
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                Đang hoạt động
                              </Badge>
                            ) : cls.status === 'pending' ? (
                              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                Chờ duyệt
                              </Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                Đã kết thúc
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => openEditClass(cls)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteClass(cls.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Sheet Dialog */}
      <Dialog open={showAddSheet || !!editingSheet} onOpenChange={() => { setShowAddSheet(false); setEditingSheet(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSheet ? 'Cập nhật Google Sheet' : 'Thêm Google Sheet mới'}</DialogTitle>
            <DialogDescription>
              Nhập thông tin liên kết Google Apps Script
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Tên liên kết *</Label>
              <Input
                value={sheetForm.name}
                onChange={(e) => setSheetForm({ ...sheetForm, name: e.target.value })}
                placeholder="Ví dụ: Gantt Chart TKB"
              />
            </div>
            <div className="space-y-2">
              <Label>Mô tả</Label>
              <Textarea
                value={sheetForm.description}
                onChange={(e) => setSheetForm({ ...sheetForm, description: e.target.value })}
                placeholder="Mô tả ngắn gọn"
              />
            </div>
            <div className="space-y-2">
              <Label>URL *</Label>
              <Input
                value={sheetForm.url}
                onChange={(e) => setSheetForm({ ...sheetForm, url: e.target.value })}
                placeholder="https://script.google.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select value={sheetForm.category} onValueChange={(v) => setSheetForm({ ...sheetForm, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gantt">Gantt Chart TKB</SelectItem>
                  <SelectItem value="stats">Thống kê giờ giảng</SelectItem>
                  <SelectItem value="progress">Báo cáo tiến độ</SelectItem>
                  <SelectItem value="classes">Tình hình mở lớp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => { setShowAddSheet(false); setEditingSheet(null); }}>
                Hủy
              </Button>
              <Button onClick={editingSheet ? handleUpdateSheet : handleAddSheet}>
                <Save className="w-4 h-4 mr-2" />
                {editingSheet ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Class Dialog */}
      <Dialog open={showAddClass || !!editingClass} onOpenChange={() => { setShowAddClass(false); setEditingClass(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingClass ? 'Cập nhật lớp học' : 'Thêm lớp học mới'}</DialogTitle>
            <DialogDescription>
              Nhập thông tin lớp học
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Mã lớp *</Label>
              <Input
                value={classForm.classCode}
                onChange={(e) => setClassForm({ ...classForm, classCode: e.target.value })}
                placeholder="Ví dụ: 1/2026"
              />
            </div>
            <div className="space-y-2">
              <Label>Tên lớp</Label>
              <Input
                value={classForm.name}
                onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                placeholder="Ví dụ: Lập trình Web"
              />
            </div>
            <div className="space-y-2">
              <Label>Giảng viên</Label>
              <Input
                value={classForm.teacher}
                onChange={(e) => setClassForm({ ...classForm, teacher: e.target.value })}
                placeholder="Tên giảng viên"
              />
            </div>
            <div className="space-y-2">
              <Label>Lịch học</Label>
              <Input
                value={classForm.schedule}
                onChange={(e) => setClassForm({ ...classForm, schedule: e.target.value })}
                placeholder="Ví dụ: T2, T4 (7:00-9:00)"
              />
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select value={classForm.status} onValueChange={(v) => setClassForm({ ...classForm, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="pending">Chờ duyệt</SelectItem>
                  <SelectItem value="completed">Đã kết thúc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Google Sheet ID</Label>
              <Input
                value={classForm.sheetId}
                onChange={(e) => setClassForm({ ...classForm, sheetId: e.target.value })}
                placeholder="ID của Google Sheet liên kết"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => { setShowAddClass(false); setEditingClass(null); }}>
                Hủy
              </Button>
              <Button onClick={editingClass ? handleUpdateClass : handleAddClass}>
                <Save className="w-4 h-4 mr-2" />
                {editingClass ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
