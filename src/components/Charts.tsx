'use client';

import React, { useState, useEffect, useRef } from 'react';
import { buildChart, langColors, backgroundColor, borderColor } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LangDataItem {
  label: string;
  value: number;
  color: string;
}

interface RepoDataItem {
  name: string;
  stargazers_count: number;
  fork: boolean;
  language: string;
}

interface ChartsProps {
  langData: LangDataItem[];
  repoData: RepoDataItem[];
}

export function Charts({ langData, repoData }: ChartsProps) {
  const [langChartData, setLangChartData] = useState<number[] | null>(null);
  const [starChartData, setStarChartData] = useState<number[] | null>(null);
  const [thirdChartData, setThirdChartData] = useState<number[] | null>(null);

  const langChartRef = useRef<HTMLCanvasElement>(null);
  const starChartRef = useRef<HTMLCanvasElement>(null);
  const thirdChartRef = useRef<HTMLCanvasElement>(null);

  // Create chart with langData
  const initLangChart = () => {
    if (!langChartRef.current) return;
    const ctx = langChartRef.current.getContext('2d');
    if (!ctx) return;

    const labels = langData.map(lang => lang.label);
    const data = langData.map(lang => lang.value);

    setLangChartData(data);

    if (data.length > 0) {
      const backgroundColors = langData.map(
        ({ color }) => `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`,
      );
      const borderColors = langData.map(lang => `${lang.color}`);
      const chartType: 'pie' = 'pie';
      const axes = false;
      const legend = true;
      const config = { ctx, chartType, labels, data, backgroundColor: backgroundColors, borderColor: borderColors, axes, legend };
      buildChart(config);
    }
  };

  // Create Most Starred chart
  const initStarChart = () => {
    if (!starChartRef.current) return;
    const ctx = starChartRef.current.getContext('2d');
    if (!ctx) return;

    const LIMIT = 5;
    const sortProperty = 'stargazers_count';
    const mostStarredRepos = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map(repo => repo.name);
    const data = mostStarredRepos.map(repo => repo[sortProperty]);

    setStarChartData(data);

    if (data.length > 0) {
      const chartType: 'bar' = 'bar';
      const axes = true;
      const legend = false;
      const config = { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend };
      buildChart(config);
    }
  };

  // Create Stars per language chart
  const initThirdChart = () => {
    if (!thirdChartRef.current) return;
    const ctx = thirdChartRef.current.getContext('2d');
    if (!ctx) return;

    const filteredRepos = repoData.filter(repo => !repo.fork && repo.stargazers_count > 0);
    const uniqueLangs = new Set(filteredRepos.map(repo => repo.language));
    const labels = Array.from(uniqueLangs.values()).filter(l => l);
    const data = labels.map(lang => {
      const repos = filteredRepos.filter(repo => repo.language === lang);
      const starsArr = repos.map(r => r.stargazers_count);
      const starSum = starsArr.reduce((a, b) => a + b, 0);
      return starSum;
    });

    setThirdChartData(data);

    if (data.length > 0) {
      const chartType: 'doughnut' = 'doughnut';
      const axes = false;
      const legend = true;
      const borderColors = labels.map(label => langColors[label] || '#cccccc');
      const backgroundColors = borderColors.map(color => `${color}B3`);
      const config = { ctx, chartType, labels, data, backgroundColor: backgroundColors, borderColor: borderColors, axes, legend };
      buildChart(config);
    }
  };

  useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
      initStarChart();
      initThirdChart();
    }
  }, [langData, repoData]);

  const chartSize = 300;
  const langChartError = !(langChartData && langChartData.length > 0);
  const starChartError = !(starChartData && starChartData.length > 0);
  const thirdChartError = !(thirdChartData && thirdChartData.length > 0);

  return (
    <section className="px-20 py-12 max-w-300 mx-auto md:px-8 md:py-8 sm:px-4 sm:py-4">
       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-lg w-full">
          <CardHeader className="pb-2">
            <CardTitle className="inline-block m-0 text-[1.75rem] pb-1.5 md:text-[1.5rem] font-bold">
              Top Languages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="chart-container flex justify-center">
              {langChartError && <p className="text-grey2">Nothing to see here!</p>}
              <canvas ref={langChartRef} width={chartSize} height={chartSize} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg w-full">
          <CardHeader className="pb-2">
            <CardTitle className="inline-block m-0 text-[1.75rem] pb-1.5 md:text-[1.5rem] font-bold">
              Most Starred
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="chart-container flex justify-center">
              {starChartError && <p className="text-grey2">Nothing to see here!</p>}
              <canvas ref={starChartRef} width={chartSize} height={chartSize} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg w-full">
          <CardHeader className="pb-2">
            <CardTitle className="inline-block m-0 text-[1.75rem] pb-1.5 md:text-[1.5rem] font-bold">
              Stars per Language
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="chart-container flex justify-center">
              {thirdChartError && <p className="text-grey2">Nothing to see here!</p>}
              <canvas ref={thirdChartRef} width={chartSize} height={chartSize} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};