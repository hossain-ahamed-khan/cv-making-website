"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const formatSegmentLabel = (segment: string) => {
    return decodeURIComponent(segment)
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function AdminBreadcrumb() {
    const pathname = usePathname()

    const segments = pathname
        .split("/")
        .filter(Boolean)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.flatMap((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join("/")}`
                    const isLast = index === segments.length - 1

                    const nodes = [
                        <BreadcrumbItem key={href}>
                            {isLast ? (
                                <BreadcrumbPage>{formatSegmentLabel(segment)}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={href}>{formatSegmentLabel(segment)}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>,
                    ]

                    if (index > 0) {
                        nodes.unshift(
                            <BreadcrumbSeparator key={`${href}-separator`} className="hidden md:block" />
                        )
                    }

                    return nodes
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}