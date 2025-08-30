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
  FileText,
  Calendar,
  BookOpen,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  GraduationCap,
  CheckSquare,
  MessageSquare
} from 'lucide-react'

interface FacultySidebarProps {
  facultyData: {
    name: string
    employeeId: string
    email: string
    department: string
    designation: string
  }
  onSidebarToggle?: (isCollapsed: boolean) => void
}

export default function FacultySidebar({ facultyData, onSidebarToggle }: FacultySidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    const newCollapsedState = !collapsed
    setCollapsed(newCollapsedState)
    onSidebarToggle?.(newCollapsedState)
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/teacher-dashboard',
      badge: null
    },
    {
      title: 'My Classes',
      icon: GraduationCap,
      href: '/teacher-dashboard/classes',
      badge: null
    },
    {
      title: 'Students',
      icon: Users,
      href: '/teacher-dashboard/students',
      badge: null
    },
    {
      title: 'Attendance',
      icon: CheckSquare,
      href: '/teacher-dashboard/attendance',
      badge: null
    },
    {
      title: 'Assignments',
      icon: ClipboardList,
      href: '/teacher-dashboard/assignments',
      badge: 3
    },
    {
      title: 'Grades',
      icon: BarChart3,
      href: '/teacher-dashboard/grades',
      badge: null
    },
    {
      title: 'Schedule',
      icon: Calendar,
      href: '/teacher-dashboard/schedule',
      badge: null
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      href: '/teacher-dashboard/messages',
      badge: 2
    },
    {
      title: 'Resources',
      icon: BookOpen,
      href: '/teacher-dashboard/resources',
      badge: null
    },
    {
      title: 'Reports',
      icon: FileText,
      href: '/teacher-dashboard/reports',
      badge: null
    }
  ]

  const isActive = (href: string) => {
    if (href === '/teacher-dashboard') {
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
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">Faculty Portal</h2>
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

      {/* Faculty Info */}
      {!collapsed && (
        <div className="p-4 border-b bg-muted/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{facultyData.name}</p>
              <p className="text-sm text-muted-foreground truncate">{facultyData.employeeId}</p>
              <p className="text-xs text-muted-foreground truncate">{facultyData.designation}</p>
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
        <Link href="/faculty-dashboard/settings">
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
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 right-4 z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-background border-r z-40 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full bg-background border-r z-40 transition-all duration-300 w-64 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
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
    </>
  )
}
