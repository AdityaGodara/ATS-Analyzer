"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { motion } from "framer-motion";
import type { CareerRole } from "@/types";

interface CareerMatchChartProps {
  matches: CareerRole[];
}

const BAR_COLORS = [
  "#6366f1", "#8b5cf6", "#a78bfa", "#7c3aed", "#9333ea",
  "#64748b", "#475569", "#334155",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
      <p className="font-semibold text-white">{label}</p>
      <p className="text-violet-400">{payload[0].value}% Match</p>
    </div>
  );
};

export default function CareerMatchChart({ matches }: CareerMatchChartProps) {
  const top8 = matches.slice(0, 8);

  const data = top8.map((r) => ({
    name: r.title.replace(" Developer", " Dev").replace(" Engineer", " Eng"),
    match: r.matchPercentage,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="h-64 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 4 }} barSize={28}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#94a3b8", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
          <Bar dataKey="match" radius={[6, 6, 0, 0]}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
