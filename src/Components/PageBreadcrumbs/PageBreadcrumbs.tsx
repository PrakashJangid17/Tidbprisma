"use client";

import { useRouter } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import React from "react";

interface PageBreadcrumbsProps {
  label: string;
}

const PageBreadcrumbs: React.FC<PageBreadcrumbsProps> = ({ label }) => {
  const router = useRouter();
  return (
    <Breadcrumbs size={"lg"} variant={"solid"} radius={"sm"}
       className={"bg-white shadow-sm border border-gray-200 rounded-md p-2 "}          

    >
      <BreadcrumbItem
        onPress={() => {
          router.push("/");
        }}
        className={"hover:text-primary-500  "}
        startContent={<HomeIcon className={"w-5 h-5 mb-1"} />}
      >
        {" "}
        Home
      </BreadcrumbItem>
      <BreadcrumbItem>{label}</BreadcrumbItem>
    </Breadcrumbs>
  );
};
export default PageBreadcrumbs;
