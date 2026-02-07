"use client";

import { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/config/portfolio";
import { Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type HistoryEntry = {
  command: string;
  output: React.ReactNode;
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const initialMessage = (
    <div>
      <pre className="text-[#88C0D0] text-[0.42rem] sm:text-[0.6rem] mb-4">
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
      <div>
        <div className="text-[#D8DEE9]">{portfolioData.title}</div>
        <div className="text-[#D8DEE9] mb-4 text-xs">
          Welcome to my corner of the internet! I'm glad you're here. -{" "}
          {portfolioData.name} (v1.0.0)
        </div>
      </div>
      <div className="text-xs text-[#D8DEE9] mb-4">
        Type <span className="text-[#EBCB8B]">help</span> to see available
        commands
      </div>
      <hr />
    </div>
  );

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: initialMessage,
      },
    ]);
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  const commands: Record<string, () => React.ReactNode> = {
    help: () => (
      <div className="space-y-1 text-xs">
        <div className="text-[#88C0D0] mb-2">Available Commands:</div>
        <div>
          <span className="text-[#EBCB8B]">about</span> - Learn more about me
        </div>
        <div>
          <span className="text-[#EBCB8B]">skills</span> - View my technical
          skills
        </div>
        <div>
          <span className="text-[#EBCB8B]">projects</span> - See my projects
        </div>
        <div>
          <span className="text-[#EBCB8B]">experiences</span> - View my work
          experiences
        </div>
        <div>
          <span className="text-[#EBCB8B]">education</span> - See my education
        </div>
        <div>
          <span className="text-[#EBCB8B]">contact</span> - Get my contact
          information
        </div>
        <div>
          <span className="text-[#EBCB8B]">resume</span> - View my resume
        </div>
        <div>
          <span className="text-[#EBCB8B]">clear</span> - Clear the terminal
        </div>
      </div>
    ),

    about: () => (
      <div className="space-y-2 text-xs">
        <div className="text-[#88C0D0] text-2xl mb-3">About Me</div>
        <div className="text-[#D8DEE9] whitespace-pre-line leading-relaxed">
          {portfolioData.about}
        </div>
      </div>
    ),

    skills: () => (
      // <div className="space-y-2 text-xs">
      //   <div className="text-cyan-400">Languages</div>
      //   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      //     {portfolioData.programmingLanguages.map((skill, i) => (
      //       <div key={i} className="text-gray-300">
      //         • {skill}
      //       </div>
      //     ))}
      //   </div>
      // </div>
      <div className="space-y-2.5 text-xs">
        {/* Languages */}
        <div className="grid grid-cols-1 gap-y-2">
          <div className="text-[#88C0D0] text-md">LANGUAGES</div>
          <div className="md:col-span-3">
            {portfolioData.programmingLanguages.map((skill, i) => (
              <span
                key={i}
                className="inline-block mr-2 mb-1 bg-[#5E81AC]/50 text-[#ECEFF4] px-2 py-1 font-bold rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Backends */}
        <div className="grid grid-cols-1 gap-y-2">
          <div className="text-[#88C0D0] text-md">BACKEND</div>
          <div className="md:col-span-3">
            {portfolioData.backends.map((skill, i) => (
              <span
                key={i}
                className="inline-block mr-2 mb-1 bg-[#5E81AC]/50 text-[#ECEFF4] px-2 py-1 font-bold rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="grid grid-cols-1 gap-y-2">
          <div className="text-[#88C0D0] text-md">DATABASE</div>
          <div className="md:col-span-3">
            {portfolioData.databases.map((skill, i) => (
              <span
                key={i}
                className="inline-block mr-2 mb-1 bg-[#5E81AC]/50 text-[#ECEFF4] px-2 py-1 font-bold rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* DevOps */}
        <div className="grid grid-cols-1 gap-y-2">
          <div className="text-[#88C0D0] text-md">INFRA</div>
          <div className="md:col-span-3">
            {portfolioData.infra.map((skill, i) => (
              <span
                key={i}
                className="inline-block mr-2 mb-1 bg-[#5E81AC]/50 text-[#ECEFF4] px-2 py-1 font-bold rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Version Control */}
        <div className="grid grid-cols-1 gap-y-2">
          <div className="text-[#88C0D0] text-md">VERSION CONTROL</div>
          <div className="md:col-span-3">
            {portfolioData.versionControl.map((skill, i) => (
              <span
                key={i}
                className="inline-block mr-2 mb-1 bg-[#5E81AC]/50 text-[#ECEFF4] px-2 py-1 font-bold rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* TOOLS */}
        <div className="grid grid-cols-1 gap-y-2">
          <div className="text-[#88C0D0] text-md">TOOLS</div>
          <div className="md:col-span-3">
            {portfolioData.tools.map((skill, i) => (
              <span
                key={i}
                className="inline-block mr-2 mb-1 bg-[#5E81AC]/50 text-[#ECEFF4] px-2 py-1 font-bold rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),

    projects: () => (
      <div className="space-y-4 text-xs">
        <div className="text-[#88C0D0]">Projects</div>
        {portfolioData.projects.map((project, i) => (
          <div key={i} className="space-y-1 border-l-2 border-[#5E81AC] pl-4">
            <div className="text-[#EBCB8B]">{project.name}</div>
            <div className="text-[#D8DEE9] leading-relaxed">
              {project.description}
            </div>
            <div className="text-[#4C566A]">
              Tech: {project.tech.join(", ")}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#81A1C1] hover:underline"
            >
              {project.link}
            </a>
          </div>
        ))}
      </div>
    ),

    experiences: () => (
      <div className="space-y-4 text-xs">
        <div className="text-[#88C0D0]">Work Experience</div>
        {portfolioData.experience.map((exp, i) => (
          <div key={i} className="space-y-1 border-l-2 border-[#5E81AC] pl-4">
            <div className="text-[#EBCB8B]">{exp.role}</div>
            <div className="text-[#4C566A]">
              {exp.company} | {exp.period}
            </div>
            <div className="text-[#D8DEE9] leading-relaxed">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    ),

    education: () => (
      <div className="space-y-4 text-xs">
        <div className="text-[#88C0D0]">Education</div>
        {portfolioData.education.map((edu, i) => (
          <div key={i} className="space-y-1">
            <div className="text-[#EBCB8B]">{edu.degree}</div>
            <div className="text-[#D8DEE9]">{edu.school}</div>
            <div className="text-[#4C566A]">{edu.year}</div>
          </div>
        ))}
      </div>
    ),

    contact: () => (
      <div className="space-y-2 text-xs">
        <div className="text-[#88C0D0]">Contact Information</div>
        <div className="text-[#D8DEE9]">
          Email:{" "}
          <a
            href={`mailto:${portfolioData.email}`}
            className="text-[#81A1C1] hover:underline"
          >
            {portfolioData.email}
          </a>
        </div>
        <div className="text-[#D8DEE9]">
          GitHub:{" "}
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#81A1C1] hover:underline"
          >
            {portfolioData.github}
          </a>
        </div>
        <div className="text-[#D8DEE9]">
          LinkedIn:{" "}
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#81A1C1] hover:underline"
          >
            {portfolioData.linkedin}
          </a>
        </div>
      </div>
    ),

    resume: () => (
      <div className="space-y-2 text-xs">
        <div className="text-[#88C0D0]">Resume</div>
        <div className="text-[#D8DEE9]">
          <a
            href={portfolioData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#81A1C1] hover:underline"
          >
            {portfolioData.resume}
          </a>
        </div>
      </div>
    ),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();

    if (!cmd) {
      setInput("");
      return;
    }

    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([{ command: "", output: initialMessage }]);
      setInput("");
      return;
    }

    const output = commands[cmd] ? (
      commands[cmd]()
    ) : (
      <div className="text-[#BF616A] text-xs">
        Command not found: {cmd}. Type &apos;help&apos; for available commands.
      </div>
    );

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
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
    <div
      className="h-svh flex flex-col bg-[#2E3440] overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-[#3B4252] px-4 py-3 border-b border-[#434C5E]">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#BF616A]"></div>
            <div className="w-3 h-3 rounded-full bg-[#EBCB8B]"></div>
            <div className="w-3 h-3 rounded-full bg-[#A3BE8C]"></div>
          </div>
          <div className="text-[#D8DEE9] text-xs ml-4">
            canonflow@127.0.0.1:~
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="py-4 px-6 pb-0 mb-4">{initialMessage}</div>

        <div
          ref={terminalRef}
          className="flex-1 p-4 pt-0 overflow-y-auto custom-scrollbar"
        >
          {history.slice(1).map((entry, i) => (
            <div key={i} className="mb-6 px-2">
              {entry.command && (
                <div className="flex gap-2 mb-2 text-xs">
                  <span className="text-[#D8DEE9]">
                    canonflow@<span className="text-[#B48EAD]">127.0.0.1</span>:
                    <span className="text-[#88C0D0] mx-0.5">~</span>$
                  </span>
                  <span className="text-[#D8DEE9]">{entry.command}</span>
                </div>
              )}
              <div className="ml-4">{entry.output}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-[#434C5E]">
        <form onSubmit={handleSubmit} className="flex gap-2 text-xs">
          <span className="text-[#D8DEE9]">
            canonflow@<span className="text-[#B48EAD]">127.0.0.1</span>:
            <span className="text-[#88C0D0] mx-0.5">~</span>$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#D8DEE9] caret-block"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2e3440;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #5e81ac;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #81a1c1;
        }
        .caret-block {
          caret-color: #88c0d0;
          caret-shape: block;
        }
      `}</style>
    </div>
  );
}
