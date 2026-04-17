'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Đăng nhập thành công!', {
          description: 'Đang chuyển đến trang quản trị...'
        })
        setTimeout(() => {
          router.push('/admin/panel')
        }, 500)
      } else {
        setError(data.message || 'Đăng nhập thất bại')
        toast.error('Đăng nhập thất bại', {
          description: data.message
        })
      }
    } catch (err) {
      setError('Lỗi kết nối hệ thống')
      toast.error('Lỗi kết nối hệ thống')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Đăng nhập Quản trị</CardTitle>
          <CardDescription>
            Vui lòng nhập thông tin đăng nhập để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Đăng nhập
                </div>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              Quay lại trang chủ
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
