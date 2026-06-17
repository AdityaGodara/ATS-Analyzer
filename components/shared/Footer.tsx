"use client";

import { Zap, ExternalLink, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ATS Hero</span>
            </div>
            <p className="max-w-sm text-sm text-slate-500 leading-relaxed">
              A free, privacy-first resume ATS analyzer and career match platform. 
              All analysis happens in your browser — we never see your data.
            </p>

            {/* Assignment Required Button */}
            <div className="mt-6">
              <a
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-all hover:scale-105"
              >
                Built for Digital Heroes
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Creator */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Creator
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-0.5">Full Name</p>
                <p className="text-white font-medium">Aditya Godara</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-0.5">Email</p>
                <a
                  href="mailto:adityagodara03@gmail.com"
                  className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
                >
                  adityagodara03@gmail.com
                </a>
              </div>
              <div className="flex gap-3 pt-1">
                <a
                  href="https://github.com/AdityaGodara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300 transition-all"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/adityagodara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Built With
            </h4>
            <div className="space-y-1.5 text-sm text-slate-500">
              {[
                "Next.js 15",
                "TypeScript",
                "Tailwind CSS",
                "shadcn/ui",
                "pdfjs-dist",
                "Framer Motion",
                "Recharts",
                "jsPDF",
              ].map((tech) => (
                <div key={tech} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} ATS Hero · Built by Aditya Godara
          </p>
          <p className="text-xs text-slate-700">
            All resume data is processed locally in your browser. Nothing is stored or transmitted.
          </p>
        </div>
      </div>
    </footer>
  );
}
