// components/ProjectsTable.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  const [showFilters, setShowFilters] = useState(false);

  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [activeYears, setActiveYears] = useState<string[]>([]);
  const [activeConcepts, setActiveConcepts] = useState<string[]>([]);
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);

  // Collect unique values per category
  const { types, years, concepts, languages } = useMemo(() => {
    const types = new Set<string>();
    const years = new Set<string>();
    const concepts = new Set<string>();
    const languages = new Set<string>();

    projects.forEach((p) => {
      if (p.type) types.add(p.type);
      if (p.year) years.add(p.year);
      (p.concepts ?? []).forEach((c) => concepts.add(c));
      (p.languages ?? []).forEach((l) => languages.add(l));
    });

    const sortAlpha = (a: string, b: string) => a.localeCompare(b);

    return {
      types: Array.from(types).sort(sortAlpha),
      years: Array.from(years).sort(sortAlpha),
      concepts: Array.from(concepts).sort(sortAlpha),
      languages: Array.from(languages).sort(sortAlpha),
    };
  }, [projects]);

  // AND across categories, OR within each category
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // type
      if (activeTypes.length) {
        if (!p.type || !activeTypes.includes(p.type)) return false;
      }

      // year
      if (activeYears.length) {
        if (!p.year || !activeYears.includes(p.year)) return false;
      }

      // concepts
      if (activeConcepts.length) {
        const pConcepts = p.concepts ?? [];
        const hasAnyConcept = activeConcepts.some((tag) =>
          pConcepts.includes(tag)
        );
        if (!hasAnyConcept) return false;
      }

      // languages
      if (activeLanguages.length) {
        const pLanguages = p.languages ?? [];
        const hasAnyLang = activeLanguages.some((tag) =>
          pLanguages.includes(tag)
        );
        if (!hasAnyLang) return false;
      }

      return true;
    });
  }, [projects, activeTypes, activeYears, activeConcepts, activeLanguages]);

  const clearFilters = () => {
    setActiveTypes([]);
    setActiveYears([]);
    setActiveConcepts([]);
    setActiveLanguages([]);
  };

  const toggle = (
    value: string,
    setter: (fn: (prev: string[]) => string[]) => void
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="mt-6">
      {/* Header row with filter button */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          Showing {filteredProjects.length} of {projects.length} projects
          {activeTypes.length ||
          activeYears.length ||
          activeConcepts.length ||
          activeLanguages.length
            ? " (filters active)"
            : ""}
        </p>

        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm hover:border-zinc-400 hover:bg-zinc-50"
        >
          Filter Tags
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-4 rounded-xl border border-zinc-200 bg-white px-3 py-3 text-xs text-zinc-700 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium">Filter by category</p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-sky-700 hover:underline"
            >
              Clear all
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {/* Type (School / Work / Personal) */}
            {types.length > 0 && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Project Type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {types.map((k) => {
                    const active = activeTypes.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggle(k, setActiveTypes)}
                        className={`tag-pill ${active ? "tag-pill--active" : ""}`}
                      >
                        {k}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Year */}
            {years.length > 0 && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Year
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {years.map((y) => {
                    const active = activeYears.includes(y);
                    return (
                      <button
                        key={y}
                        type="button"
                        onClick={() => toggle(y, setActiveYears)}
                        className={`tag-pill ${active ? "tag-pill--active" : ""}`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Concepts */}
            {concepts.length > 0 && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Concepts
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {concepts.map((c) => {
                    const active = activeConcepts.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggle(c, setActiveConcepts)}
                        className={`tag-pill ${active ? "tag-pill--active" : ""}`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  Languages
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((l) => {
                    const active = activeLanguages.includes(l);
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => toggle(l, setActiveLanguages)}
                        className={`tag-pill ${active ? "tag-pill--active" : ""}`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Done Filtering button */}
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm hover:border-zinc-400 hover:bg-zinc-50"
            >
              Done Filtering
            </button>
          </div>
        </div>
      )}

      {/* Table: title + inline tags */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {filteredProjects.map((p) => {
              const href = `/projects/${p.slug}`;

              // Build inline tags in order: Type, Year, Concepts, Languages
              const inlineTags: string[] = [];
              if (p.type) inlineTags.push(p.type);
              if (p.year) inlineTags.push(p.year);
              if (p.concepts) inlineTags.push(...p.concepts);
              if (p.languages) inlineTags.push(...p.languages);

              return (
                <tr
                  key={href}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <td className="py-2 align-top">
                    <Link
                      href={href}
                      className="text-sm font-medium text-zinc-900 underline-offset-4 hover:text-sky-700 hover:underline"
                    >
                      {p.title}
                    </Link>

                    {inlineTags.length > 0 && (
                      <span className="ml-2 inline-flex flex-wrap gap-1">
                        {inlineTags.map((tag) => (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
