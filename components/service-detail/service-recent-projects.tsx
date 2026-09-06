"use client";

import * as React from "react";
import Image from "next/image";
import { ServiceProjectData } from "./types";
import { getCategoryPreset } from "./category-presets";

export interface ServiceRecentProjectsProps {
  projects?: ServiceProjectData[];
  categoryTitle?: string;
  categorySlug?: string;
}

export function ServiceRecentProjects({
  projects,
  categoryTitle = "Cleaning",
  categorySlug = "cleaning",
}: ServiceRecentProjectsProps) {
  const preset = getCategoryPreset(categorySlug || categoryTitle);

  const displayProjects =
    projects && projects.length > 0 ? projects : preset.projects;

  const firstProject = displayProjects[0] || preset.projects[0];
  const otherProjects = displayProjects.slice(1, 3);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-grotesque font-bold text-[20px] text-[#222325]">
        Recent {categoryTitle.toLowerCase()} projects
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Project 1: Wide card with badge */}
        <div className="relative col-span-2 aspect-[16/9] sm:aspect-[16/10] rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
          <Image
            src={firstProject.imageUrl}
            alt={firstProject.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
          {/* Green banner overlay matching 5.png */}
          <div className="absolute bottom-0 inset-x-0 bg-[#0B3B24]/90 backdrop-blur-xs p-3 sm:p-4 text-white">
            <h4 className="font-grotesque font-bold text-[14px] sm:text-[15px] leading-snug text-white line-clamp-1">
              {firstProject.title}
            </h4>
            {firstProject.subtitle && (
              <p className="text-[12px] text-[#A7F3D0] line-clamp-1">
                {firstProject.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Project 2 */}
        {otherProjects[0] && (
          <div className="relative aspect-[4/3] sm:aspect-auto rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
            <Image
              src={otherProjects[0].imageUrl}
              alt={otherProjects[0].title}
              fill
              sizes="200px"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Project 3 */}
        {otherProjects[1] && (
          <div className="relative aspect-[4/3] sm:aspect-auto rounded-[12px] overflow-hidden bg-[#F7F7F7] border border-[#E5E7EB]">
            <Image
              src={otherProjects[1].imageUrl}
              alt={otherProjects[1].title}
              fill
              sizes="200px"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
