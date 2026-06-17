"use client";

import { motion } from "framer-motion";
import { Upload, FileText, Sparkles, CheckCircle, AlertCircle, X } from "lucide-react";
import { useRef, useState, useCallback } from "react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export default function DropZone({ onFileSelect, isAnalyzing }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = (file: File) => {
    setError(null);
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10 MB.");
      return;
    }
    setUploadedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSet(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSet(file);
  };

  const clearFile = () => {
    setUploadedFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedFile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 group
            ${isDragOver
              ? "border-violet-500 bg-violet-500/10 scale-[1.02]"
              : "border-slate-700 bg-slate-900/50 hover:border-violet-500/60 hover:bg-slate-900"
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleInputChange}
          />

          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 ${isDragOver ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

          <motion.div
            animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
              <Upload className="h-9 w-9 text-white" />
            </div>
          </motion.div>

          <h3 className="relative mb-2 text-xl font-semibold text-white">
            {isDragOver ? "Drop your resume here!" : "Upload Your Resume"}
          </h3>
          <p className="relative mb-4 text-sm text-slate-400">
            Drag & drop your PDF resume or click to browse
          </p>

          <div className="relative flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> PDF Only
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span>Max 10 MB</span>
            <span className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Instant Analysis
            </span>
          </div>

          {/* Browse Button */}
          <div className="relative mt-6">
            <span className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-violet-500/30 group-hover:bg-violet-500 transition-colors">
              Browse File
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white truncate">{uploadedFile.name}</p>
              <p className="mt-0.5 text-sm text-slate-400">{formatSize(uploadedFile.size)}</p>
              {isAnalyzing && (
                <div className="mt-3">
                  <div className="mb-1.5 flex items-center gap-2 text-xs text-violet-400">
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                    Analyzing your resume...
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              )}
            </div>
            {!isAnalyzing && (
              <button
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
