import React from "react";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathnames = usePathname()
    .split("/")
    ?.filter((s) => s.length > 0 && s?.toLowerCase() !== "dashboard");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <Link href="/dashboard"> Dashboard </Link>{" "}
          </BreadcrumbPage>
        </BreadcrumbItem>

        {pathnames.length === 0 ? (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          pathnames?.map((path) => (
            <React.Fragment key={path}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <span className="capitalize">{path}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
