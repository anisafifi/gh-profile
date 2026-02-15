import React from 'react';

interface GitHubContributionChartProps {
  username: string;
  style?: React.CSSProperties;
  className?: string;
}

export const GitHubContributionChart: React.FC<GitHubContributionChartProps> = ({ username, style, className }) => {
  if (!username) return null;
  const chartUrl = `https://ghchart.rshah.org/${username}`;
  return (
    <div style={{ width: '100%', overflowX: 'auto', ...style }} className={`flex justify-center ${className}`}>
      <img
        src={chartUrl}
        alt={`${username}'s GitHub contribution chart`}
        style={{ maxWidth: '100%', height: 'auto', minWidth: 600 }}
        loading="lazy"
      />
    </div>
  );
};
