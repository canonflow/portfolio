"use client";

import { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/config/portfolio";
import type { IconType } from "react-icons";
import {
  SiGo,
  SiPhp,
  SiTypescript,
  SiPython,
  SiKotlin,
  SiDotnet,
  SiGin,
  SiLaravel,
  SiExpress,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiMariadb,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiDigitalocean,
  SiDocker,
  SiNginx,
  SiGithub,
  SiBitbucket,
  SiInsomnia,
  SiNotion,
  SiJira,
  SiConfluence,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { FiLayers, FiBox } from "react-icons/fi";

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
};

// Static class strings so Tailwind's JIT compiler can detect them.
const accentText: Record<string, string> = {
  mauve: "text-mauve",
  blue: "text-blue",
  green: "text-green",
  peach: "text-peach",
  sky: "text-sky",
  pink: "text-pink",
  yellow: "text-yellow",
};

// Icon + brand color per skill. Colors are tuned to stay readable on the dark
// background. C# uses the .NET mark and Fiber falls back to a generic icon
// since neither has a dedicated brand logo in the icon set.
const skillMeta: Record<string, { icon: IconType; color: string }> = {
  Go: { icon: SiGo, color: "#00ADD8" },
  PHP: { icon: SiPhp, color: "#8B93C9" },
  Typescript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#FFD43B" },
  "C#": { icon: SiDotnet, color: "#A97BFF" },
  Kotlin: { icon: SiKotlin, color: "#A97BFF" },
  Gin: { icon: SiGin, color: "#00ACD7" },
  Fiber: { icon: FiLayers, color: "#00ACD7" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },
  Express: { icon: SiExpress, color: "#CDD6F4" },
  FastAPI: { icon: SiFastapi, color: "#25C2A0" },
  MySQL: { icon: SiMysql, color: "#5B8FB0" },
  PostgreSQL: { icon: SiPostgresql, color: "#6C8EDB" },
  MariaDB: { icon: SiMariadb, color: "#C0765A" },
  Redis: { icon: SiRedis, color: "#FF4438" },
  Kafka: { icon: SiApachekafka, color: "#CDD6F4" },
  RabbitMQ: { icon: SiRabbitmq, color: "#FF6600" },
  AWS: { icon: FaAws, color: "#FF9900" },
  DigitalOcean: { icon: SiDigitalocean, color: "#3B82F6" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Nginx: { icon: SiNginx, color: "#4CB050" },
  Github: { icon: SiGithub, color: "#CDD6F4" },
  "Bit Bucket": { icon: SiBitbucket, color: "#2684FF" },
  Insomnia: { icon: SiInsomnia, color: "#9B5DE5" },
  Notion: { icon: SiNotion, color: "#CDD6F4" },
  Jira: { icon: SiJira, color: "#2684FF" },
  Confluence: { icon: SiConfluence, color: "#2684FF" },
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const banner = (
    <div>
      <pre className="text-transparent bg-clip-text bg-gradient-to-r from-mauve via-pink to-sky text-[0.42rem] sm:text-[0.6rem] mb-4 leading-tight">
        {`
 ██████╗ █████╗ ███╗   ██╗ ██████╗ ███╗   ██╗███████╗██╗      ██████╗ ██╗    ██╗
██╔════╝██╔══██╗████╗  ██║██╔═══██╗████╗  ██║██╔════╝██║     ██╔═══██╗██║    ██║
██║     ███████║██╔██╗ ██║██║   ██║██╔██╗ ██║█████╗  ██║     ██║   ██║██║ █╗ ██║
██║     ██╔══██║██║╚██╗██║██║   ██║██║╚██╗██║██╔══╝  ██║     ██║   ██║██║███╗██║
╚██████╗██║  ██║██║ ╚████║╚██████╔╝██║ ╚████║██║     ███████╗╚██████╔╝╚███╔███╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝ 
                                                                                  
███████╗██╗  ██╗███████╗
██╔════╝╚██╗██╔╝██╔════╝
█████╗   ╚███╔╝ █████╗  
██╔══╝   ██╔██╗ ██╔══╝  
███████╗██╔╝ ██╗███████╗
╚══════╝╚═╝  ╚═╝╚══════╝
`}
      </pre>
      <div className="space-y-1">
        <div className="text-fg text-sm font-medium">{portfolioData.title}</div>
        <div className="text-muted text-xs">
          Welcome to my corner of the internet! I&apos;m glad you&apos;re here. —{" "}
          <span className="text-mauve">{portfolioData.name}</span>{" "}
          <span className="text-overlay">({portfolioData.version})</span>
        </div>
      </div>
      <div className="text-xs text-muted mt-4">
        Type <CommandLink cmd="help" onRun={runCommand} /> to see available
        commands.
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-surface0 via-surface2 to-transparent" />
    </div>
  );

  useEffect(() => {
    setHistory([{ command: "", output: banner }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const commands: Record<string, (args: string[]) => React.ReactNode> = {
    help: () => (
      <div className="text-xs">
        <SectionTitle>Available Commands</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {(
            [
              ["about", "Learn more about me"],
              ["skills", "View my technical skills"],
              ["projects", "See my projects"],
              ["experiences", "View my work experiences"],
              ["education", "See my education"],
              ["contact", "Get my contact information"],
              ["resume", "View my resume"],
              ["whoami", "Print current user"],
              ["ls", "List available sections"],
              ["date", "Show the current date"],
              ["echo", "Print text back to the screen"],
              ["history", "Show command history"],
              ["clear", "Clear the terminal"],
            ] as const
          ).map(([name, desc]) => (
            <div key={name} className="flex items-baseline gap-2">
              <span className="min-w-[6.5rem]">
                <CommandLink cmd={name} onRun={runCommand} />
              </span>
              <span className="text-muted">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),

    about: () => (
      <div className="text-xs">
        <SectionTitle>About Me</SectionTitle>
        <div className="text-fg whitespace-pre-line leading-relaxed max-w-2xl">
          {portfolioData.about}
        </div>
      </div>
    ),

    skills: () => (
      <div className="text-xs space-y-3">
        <SectionTitle>Skills</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            [
              ["LANGUAGES", portfolioData.programmingLanguages, "mauve"],
              ["BACKEND", portfolioData.backends, "blue"],
              ["DATABASE", portfolioData.databases, "green"],
              ["MESSAGE BROKER", portfolioData.messageBrokers, "yellow"],
              ["INFRA", portfolioData.infra, "peach"],
              ["VERSION CONTROL", portfolioData.versionControl, "sky"],
              ["TOOLS", portfolioData.tools, "pink"],
            ] as const
          ).map(([label, items, accent]) => (
            <div
              key={label}
              className="rounded-lg bg-mantle/60 border border-surface0 p-3 space-y-2 transition-colors hover:border-surface2"
            >
              <div
                className={`${accentText[accent]} text-[0.7rem] tracking-widest`}
              >
                {label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill, i) => (
                  <SkillChip key={i} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    projects: () => (
      <div className="text-xs space-y-3">
        <SectionTitle>Projects</SectionTitle>
        <div className="grid grid-cols-1 gap-3">
          {portfolioData.projects.map((project, i) => (
            <div
              key={i}
              className="rounded-lg bg-mantle/60 border border-surface0 p-3 space-y-1.5 transition-all hover:border-mauve hover:bg-mantle"
            >
              <div className="flex items-center gap-2">
                <span className="text-mauve">▹</span>
                <span className="text-yellow font-medium">{project.name}</span>
              </div>
              <div className="text-fg leading-relaxed">
                {project.description}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="bg-surface0 text-muted px-2 py-0.5 rounded text-[0.65rem]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue hover:text-sky hover:underline pt-1"
              >
                → {project.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    ),

    experiences: () => (
      <div className="text-xs space-y-3">
        <SectionTitle>Work Experience</SectionTitle>
        <div className="relative pl-5 space-y-4 before:absolute before:left-1 before:top-1 before:bottom-1 before:w-px before:bg-surface1">
          {portfolioData.experience.map((exp, i) => (
            <div key={i} className="relative space-y-1">
              <span className="absolute -left-[1.05rem] top-1 w-2 h-2 rounded-full bg-mauve ring-2 ring-base" />
              <div className="text-yellow font-medium">{exp.role}</div>
              <div className="text-overlay">
                {exp.company} <span className="text-surface2">|</span>{" "}
                {exp.period}
              </div>
              <div className="text-fg leading-relaxed">{exp.description}</div>
            </div>
          ))}
        </div>
      </div>
    ),

    education: () => (
      <div className="text-xs space-y-3">
        <SectionTitle>Education</SectionTitle>
        {portfolioData.education.map((edu, i) => (
          <div
            key={i}
            className="rounded-lg bg-mantle/60 border border-surface0 p-3 space-y-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-yellow font-medium">{edu.degree}</div>
                <div className="text-fg">{edu.school}</div>
                <div className="text-overlay">{edu.year}</div>
              </div>
              {edu.gpa && (
                <div className="text-right">
                  <span className="text-overlay">GPA </span>
                  <span className="text-green font-semibold">{edu.gpa}</span>
                </div>
              )}
            </div>

            {edu.thesis && (
              <div>
                <span className="text-sky">Thesis: </span>
                <span className="text-fg leading-relaxed">{edu.thesis}</span>
              </div>
            )}

            {edu.coursework && edu.coursework.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-sky">Relevant Coursework</div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course, j) => (
                    <span
                      key={j}
                      className="bg-surface0 text-muted px-2 py-0.5 rounded text-[0.65rem]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {edu.achievements && edu.achievements.length > 0 && (
              <div className="space-y-1">
                <div className="text-sky">Achievements</div>
                <ul className="space-y-0.5">
                  {edu.achievements.map((item, j) => (
                    <li key={j} className="flex gap-2 text-fg leading-relaxed">
                      <span className="text-peach shrink-0">★</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {edu.activities && (
              <div>
                <span className="text-sky">Activities: </span>
                <span className="text-fg leading-relaxed">
                  {edu.activities}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    ),

    contact: () => (
      <div className="text-xs space-y-2">
        <SectionTitle>Contact</SectionTitle>
        <ContactRow label="Email" accent="green">
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-blue hover:text-sky hover:underline"
          >
            {portfolioData.email}
          </a>
        </ContactRow>
        <ContactRow label="GitHub" accent="mauve">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover:text-sky hover:underline"
          >
            {portfolioData.github}
          </a>
        </ContactRow>
        <ContactRow label="LinkedIn" accent="sky">
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover:text-sky hover:underline"
          >
            {portfolioData.linkedin}
          </a>
        </ContactRow>
      </div>
    ),

    resume: () => (
      <div className="text-xs space-y-2">
        <SectionTitle>Resume</SectionTitle>
        <a
          href={portfolioData.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-surface0 border border-surface1 px-3 py-1.5 text-fg transition-colors hover:bg-surface1 hover:border-mauve"
        >
          <span className="text-peach">↧</span> Open resume ({portfolioData.resume})
        </a>
      </div>
    ),

    whoami: () => (
      <div className="text-xs text-fg">
        <span className="text-green">{portfolioData.name}</span>{" "}
        <span className="text-overlay">—</span> {portfolioData.title}
      </div>
    ),

    ls: () => (
      <div className="text-xs grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1">
        {[
          "about",
          "skills",
          "projects",
          "experiences",
          "education",
          "contact",
          "resume",
        ].map((item) => (
          <span key={item} className="text-green">
            {item}
            <span className="text-overlay">.md</span>
          </span>
        ))}
      </div>
    ),

    date: () => <div className="text-xs text-fg">{new Date().toString()}</div>,

    echo: (args) => <div className="text-xs text-fg">{args.join(" ")}</div>,

    history: () => (
      <div className="text-xs text-fg space-y-0.5">
        {commandHistory.length === 0 ? (
          <div className="text-overlay">No commands in history yet.</div>
        ) : (
          commandHistory.map((cmd, i) => (
            <div key={i}>
              <span className="text-overlay mr-3">{i + 1}</span>
              {cmd}
            </div>
          ))
        )}
      </div>
    ),

    sudo: (args) => (
      <div className="text-xs text-red">
        {args.length > 0
          ? "Nice try. This incident will be reported. 🚨"
          : "usage: sudo <command>"}
      </div>
    ),
  };

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setInput("");
      return;
    }

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = name.toLowerCase();

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput("");

    if (cmd === "clear") {
      setHistory([{ command: "", output: banner }]);
      return;
    }

    let output: React.ReactNode;
    if (commands[cmd]) {
      output = commands[cmd](args);
    } else {
      const suggestions = Object.keys(commands).filter(
        (c) => c.startsWith(cmd) || cmd.startsWith(c)
      );
      output = (
        <div className="text-xs">
          <span className="text-red">Command not found: {cmd}.</span>{" "}
          {suggestions.length > 0 ? (
            <span className="text-muted">
              Did you mean{" "}
              {suggestions.map((s, i) => (
                <span key={s}>
                  <CommandLink cmd={s} onRun={runCommand} />
                  {i < suggestions.length - 1 ? ", " : ""}
                </span>
              ))}
              ?
            </span>
          ) : (
            <span className="text-muted">
              Type <CommandLink cmd="help" onRun={runCommand} /> for available
              commands.
            </span>
          )}
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const matches = Object.keys(commands).filter((c) =>
        c.startsWith(partial)
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const lcp = matches.reduce((prefix, cur) => {
          let i = 0;
          while (i < prefix.length && prefix[i] === cur[i]) i++;
          return prefix.slice(0, i);
        });
        setInput(lcp);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="app-min-h w-full bg-gradient-to-br from-crust via-mantle to-base flex items-center justify-center sm:p-6">
      <div className="flex flex-col w-full app-h sm:h-[86vh] sm:max-w-4xl bg-base/95 backdrop-blur sm:rounded-xl overflow-hidden border border-surface0 shadow-window">
        {/* Title bar */}
        <div className="relative flex items-center bg-mantle px-4 py-3 pt-safe sm:pt-3 border-b border-surface0">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red" />
            <span className="w-3 h-3 rounded-full bg-yellow" />
            <span className="w-3 h-3 rounded-full bg-green" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-muted text-xs flex items-center gap-2">
            <span className="text-overlay">◈</span>
            canonflow@127.0.0.1: ~
          </div>
        </div>

        {/* Output */}
        <div
          ref={terminalRef}
          className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-6 fade-in">
              {entry.command && (
                <div className="mb-2">
                  <Prompt />
                  <span className="text-xs ml-2">{entry.command}</span>
                </div>
              )}
              <div className={entry.command ? "ml-1" : ""}>{entry.output}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-surface0 bg-mantle/50 pb-safe">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 text-xs"
          >
            <Prompt />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-fg caret-block"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          </form>
          {/* Status / hints bar */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-surface0/60 text-[0.65rem] text-overlay">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green inline-block animate-pulse" />
              online
            </span>
            <span className="hidden sm:inline">
              <kbd className="text-muted">Tab</kbd> autocomplete ·{" "}
              <kbd className="text-muted">↑↓</kbd> history ·{" "}
              <kbd className="text-muted">help</kbd> for commands
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #45475a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6c7086;
        }
        .caret-block {
          caret-color: #cba6f7;
          caret-shape: block;
        }
        .fade-in {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function Prompt() {
  return (
    <span className="text-xs whitespace-nowrap select-none">
      <span className="text-green">canonflow</span>
      <span className="text-overlay"> in </span>
      <span className="text-sky">~</span>
      <span className="text-mauve"> ❯</span>
    </span>
  );
}

function SkillChip({ name }: { name: string }) {
  const meta = skillMeta[name];
  const Icon = meta?.icon ?? FiBox;
  const color = meta?.color ?? "#a6adc8";
  return (
    <span className="inline-flex items-center gap-1.5 bg-surface0 border border-surface1 rounded-md px-2.5 py-1 text-fg transition-all hover:bg-surface1 hover:border-surface2 hover:-translate-y-0.5">
      <Icon
        style={{ color }}
        className="text-[0.95rem] shrink-0"
        aria-hidden
      />
      {name}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-mauve">#</span>
      <span className="text-sky font-semibold tracking-wide">{children}</span>
      <span className="flex-1 h-px bg-surface0" />
    </div>
  );
}

function ContactRow({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={`${accentText[accent]} min-w-[4.5rem]`}>{label}</span>
      <span className="text-overlay">:</span>
      {children}
    </div>
  );
}

function CommandLink({
  cmd,
  onRun,
}: {
  cmd: string;
  onRun: (cmd: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onRun(cmd);
      }}
      className="text-yellow hover:text-peach hover:underline focus:outline-none focus:underline"
    >
      {cmd}
    </button>
  );
}
