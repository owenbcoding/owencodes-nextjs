import { Icon } from "@iconify/react";

const skills = [
  { name: "HTML", icon: "vscode-icons:file-type-html" },
  { name: "CSS", icon: "logos:css-3" },
  { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "Laravel", icon: "logos:laravel" },
  { name: "Vue", icon: "logos:vue" },
  { name: "React", icon: "logos:react" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "PHP", icon: "logos:php" },
  { name: "PostgreSQL", icon: "logos:postgresql" },
  { name: "shopify", icon: "logos:shopify" },
];

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="mt-12">
      <h2
        id="skills-heading"
        className="text-center text-4xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      >
        My Skills
      </h2>

      <div className="mx-auto mt-5 max-w-5xl">
        <div className="mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)] inline-flex w-full flex-nowrap overflow-hidden">
          <ul className="animate-scroll flex shrink-0 items-center justify-center md:justify-start [&_li]:mx-8">
            {skills.map((skill) => (
              <li key={`skills-main-${skill.name}`} className="flex min-w-[80px] flex-col items-center space-y-2">
                <Icon icon={skill.icon} width="48" height="48" />
                <span className="text-sm text-teal-300">{skill.name}</span>
              </li>
            ))}
          </ul>

          <ul className="animate-scroll flex shrink-0 items-center justify-center md:justify-start [&_li]:mx-8" aria-hidden="true">
            {skills.map((skill) => (
              <li key={`skills-copy-${skill.name}`} className="flex min-w-[80px] flex-col items-center space-y-2">
                <Icon icon={skill.icon} width="48" height="48" />
                <span className="text-sm text-teal-300">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
