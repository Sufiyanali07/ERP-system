import Link from 'next/link'

const links = [
    {
        title: 'Admissions',
        href: '/admissions',
    },
    {
        title: 'Programs',
        href: '/programs',
    },
    {
        title: 'Campus',
        href: '/campus',
    },
    {
        title: 'Contact Admissions',
        href: '/contact-admissions',
    },
    {
        title: 'Student Portal',
        href: '/login',
    },
    {
        title: 'Support',
        href: '/support',
    },
    {
        title: 'Partners',
        href: '/partners',
    },
    {
        title: 'About',
        href: '/about',
    },
]

export default function FooterSection() {
    return (
        <footer className="border-t border-b bg-white py-12 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-muted-foreground hover:text-primary block duration-150">
                                <span>{link.title}</span>
                            </Link>
                        ))}
                    </div>
                    <span className="text-muted-foreground text-center text-sm">© {new Date().getFullYear()} NextCollege ERP, All rights reserved</span>
                </div>
            </div>
        </footer>
    )
}
