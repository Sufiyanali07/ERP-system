'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import React from 'react'
import { cn } from '@/lib/utils'
import { useScroll } from 'motion/react'

const menuItems = [
    {
        name: 'Programs',
        href: '/programs',
        items: [
            { name: 'Undergraduate', href: '/programs#undergraduate' },
            { name: 'Graduate', href: '/programs#graduate' },
            { name: 'Online Courses', href: '/programs#online' },
        ]
    },
    {
        name: 'Admissions',
        href: '/admissions',
        items: [
            { name: 'Apply Now', href: '/apply' },
            { name: 'Requirements', href: '/admissions#requirements' },
            { name: 'Financial Aid', href: '/financial-aid' },
            { name: 'Contact Admissions', href: '/contact-admissions' },
        ]
    },
    { name: 'Campus Life', href: '/campus' },
    { name: 'Partners', href: '/partners' },
    { name: 'About', href: '/about' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-20 w-full border-b transition-colors duration-150', scrolled && 'bg-background/50 backdrop-blur-3xl')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-foreground">NextCollege</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        {menuItems.map((item, index) => (
                                            <NavigationMenuItem key={index}>
                                                {item.items ? (
                                                    <>
                                                        <NavigationMenuTrigger className="text-muted-foreground hover:text-accent-foreground">
                                                            {item.name}
                                                        </NavigationMenuTrigger>
                                                        <NavigationMenuContent>
                                                            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                                {item.items.map((subItem, subIndex) => (
                                                                    <NavigationMenuLink key={subIndex} asChild>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                                        >
                                                                            <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                                                        </Link>
                                                                    </NavigationMenuLink>
                                                                ))}
                                                            </div>
                                                        </NavigationMenuContent>
                                                    </>
                                                ) : (
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={item.href}
                                                            className="text-muted-foreground hover:text-accent-foreground block px-4 py-2 text-sm font-medium transition-colors"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                )}
                                            </NavigationMenuItem>
                                        ))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className="flex items-center space-x-4">
                                    <Link href="/login">
                                        <Button variant="outline" size="sm">Login</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button size="sm">Sign Up</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
