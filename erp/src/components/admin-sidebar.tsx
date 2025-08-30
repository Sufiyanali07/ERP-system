'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Users,
  GraduationCap,
  Building,
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Database,
  UserCheck,
  BookOpen,
  ClipboardList,
  TrendingUp,
  MessageSquare
} from 'lucide-react'

interface AdminSidebarProps {
  adminData: {
    name: string
    adminId: string
    email: string
    role: string
  }
  onSidebarToggle?: (collapsed: boolean) => void
}

export default function AdminSidebar({ adminData, onSidebarToggle }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    onSidebarToggle?.(newCollapsed)
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/admin-dashboard',
      badge: null
    },
    {
      title: 'Students',
      icon: Users,
      href: '/admin-dashboard/students',
      badge: null
    },
    {
      title: 'Faculty',
      icon: GraduationCap,
      href: '/admin-dashboard/faculty',
      badge: null
    },
    {
      title: 'Departments',
      icon: Building,
      href: '/admin-dashboard/departments',
      badge: null
    },
    {
      title: 'Finance',
      icon: DollarSign,
      href: '/admin-dashboard/finance',
      badge: 5
    },
    {
      title: 'Admissions',
      icon: UserCheck,
      href: '/admin-dashboard/admissions',
      badge: 12
    },
    {
      title: 'Academic',
      icon: BookOpen,
      href: '/admin-dashboard/academic',
      badge: null
    },
    {
      title: 'Examinations',
      icon: ClipboardList,
      href: '/admin-dashboard/examinations',
      badge: null
    },
    {
      title: 'Reports',
      icon: BarChart3,
      href: '/admin-dashboard/reports',
      badge: null
    },
    {
      title: 'Analytics',
      icon: TrendingUp,
      href: '/admin-dashboard/analytics',
      badge: null
    },
    {
      title: 'Documents',
      icon: FileText,
      href: '/admin-dashboard/documents',
      badge: 8
    },
    {
      title: 'Calendar',
      icon: Calendar,
      href: '/admin-dashboard/calendar',
      badge: null
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      href: '/admin-dashboard/messages',
      badge: 3
    },
    {
      title: 'System',
      icon: Database,
      href: '/admin-dashboard/system',
      badge: null
    }
  ]

  const isActive = (href: string) => {
    if (href === '/admin-dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">Admin Portal</h2>
                <p className="text-xs text-muted-foreground">ERP System</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className="hidden lg:flex"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Admin Info */}
      {!collapsed && (
        <div className="p-4 border-b bg-muted/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{adminData.name}</p>
              <p className="text-sm text-muted-foreground truncate">{adminData.adminId}</p>
              <p className="text-xs text-muted-foreground truncate">{adminData.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'} ${
                    active ? 'bg-primary/10 text-primary' : ''
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Link href="/admin-dashboard/settings">
          <Button variant="ghost" className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'}`}>
            <Settings className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && 'Settings'}
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="ghost" className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'}`}>
            <LogOut className={`w-4 h-4 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && 'Logout'}
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-background border-r z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full bg-background border-r z-40 transition-all duration-300 w-64 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold">Admin Portal</h2>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-background border-r">
              <SidebarContent />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
