'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  CreditCard, 
  FileText, 
  Calendar, 
  BookOpen, 
  Trophy,
  Bell,
  Settings,
  LogOut,
  User,
  MessageSquare,
  Download,
  Menu,
  X
} from 'lucide-react'

interface SidebarProps {
  studentData: {
    name: string
    studentId: string
    course: string
    semester: number
  }
  onSidebarToggle?: (isCollapsed: boolean) => void
}

export default function StudentSidebar({ studentData, onSidebarToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    onSidebarToggle?.(newCollapsedState)
  }

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/student-dashboard',
      icon: Home,
      active: pathname === '/student-dashboard'
    },
    {
      title: 'Fee Payment',
      href: '/student-dashboard/fees',
      icon: CreditCard,
      active: pathname.includes('/fees'),
      badge: '2'
    },
    {
      title: 'Documents',
      href: '/student-dashboard/documents',
      icon: FileText,
      active: pathname.includes('/documents'),
      badge: '1'
    },
    {
      title: 'Exam Schedule',
      href: '/student-dashboard/exams',
      icon: Calendar,
      active: pathname.includes('/exams')
    },
    {
      title: 'Results',
      href: '/student-dashboard/results',
      icon: Trophy,
      active: pathname.includes('/results')
    },
    {
      title: 'Courses',
      href: '/student-dashboard/courses',
      icon: BookOpen,
      active: pathname.includes('/courses')
    },
    {
      title: 'Notifications',
      href: '/student-dashboard/notifications',
      icon: Bell,
      active: pathname.includes('/notifications'),
      badge: '5'
    },
    {
      title: 'Messages',
      href: '/student-dashboard/messages',
      icon: MessageSquare,
      active: pathname.includes('/messages')
    },
    {
      title: 'Downloads',
      href: '/student-dashboard/downloads',
      icon: Download,
      active: pathname.includes('/downloads')
    }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 right-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{studentData.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{studentData.studentId}</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={handleToggle}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          
          {!isCollapsed && (
            <div className="mt-3 p-2 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-600">{studentData.course}</p>
              <p className="text-xs text-gray-500">Semester {studentData.semester}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer
                ${item.active 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100 text-gray-700'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}>
                <item.icon className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-sm flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link href="/settings">
            <div className={`
              flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer
              ${isCollapsed ? 'justify-center' : ''}
            `}>
              <Settings className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
              {!isCollapsed && <span className="font-medium text-sm">Settings</span>}
            </div>
          </Link>
          
          <Link href="/login">
            <div className={`
              flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer
              ${isCollapsed ? 'justify-center' : ''}
            `}>
              <LogOut className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
              {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
