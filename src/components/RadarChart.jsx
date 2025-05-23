'use client';

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function RadarChart({ data, keys }) {
  const colors = ['#facc15', '#34d399', '#60a5fa']; // You, Match 1, Match 2

  return (
    <div className='w-full h-[360px]'>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsRadarChart data={data}>
          <PolarGrid stroke='#999' />
          <PolarAngleAxis dataKey='trait' stroke='#fff' />
          <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} />
          {keys.map((key, index) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.4}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: '#fff',
            }}
          />
          <Legend verticalAlign='bottom' wrapperStyle={{ color: 'white' }} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
