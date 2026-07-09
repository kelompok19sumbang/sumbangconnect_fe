'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PendidikanChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-80 text-xs md:text-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} angle={-45} textAnchor="end" tick={{fill: '#6b7280'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
          <Tooltip 
            cursor={{fill: '#f3f4f6'}} 
            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
          />
          <Bar dataKey="jumlah" fill="#093720" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}