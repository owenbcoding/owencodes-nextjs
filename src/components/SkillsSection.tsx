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

const duplicatedSkills = [...skills, ...skills];

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="mt-12">
      <h2
        id="skills-heading"
        className="theme-heading text-center text-4xl font-bold"
      >
        My Skills
      </h2>

      <div className="mx-auto mt-5 max-w-5xl">
        <div className="mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)] w-full overflow-hidden">
          <ul className="animate-scroll flex w-max min-w-max flex-nowrap items-center [&_li]:mx-8">
            {duplicatedSkills.map((skill, index) => (
              <li
                key={`${skill.name}-${index}`}
                className="flex min-w-[80px] shrink-0 flex-col items-center space-y-2"
                aria-hidden={index >= skills.length}
              >
                <Icon icon={skill.icon} width="48" height="48" />
                <span className="theme-accent-text text-sm">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
