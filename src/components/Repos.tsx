'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Star,
  GitFork
} from "lucide-react";

import FlipMove from 'react-flip-move';
import { langColors } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RepoDataItem {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks: number;
  size: number;
  fork: boolean;
}

interface ReposProps {
  repoData: RepoDataItem[];
}

const Repos: React.FC<ReposProps> = ({ repoData }) => {
  const [topRepos, setTopRepos] = useState<RepoDataItem[]>([]);
  const [sortType, setSortType] = useState<'stars' | 'forks' | 'size'>('stars');

  const getTopRepos = (type: 'stars' | 'forks' | 'size') => {
    const LIMIT = 12;
    const map = {
      stars: 'stargazers_count' as const,
      forks: 'forks' as const,
      size: 'size' as const,
    };
    const sortProperty = map[type];
    const sorted = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);

    setTopRepos(sorted);
  };

  useEffect(() => {
    if (repoData.length) {
      getTopRepos('stars');
    }
  }, [repoData]);

  useEffect(() => getTopRepos(sortType), [sortType]);

  const sortTypes: ('stars' | 'forks' | 'size')[] = ['stars', 'forks', 'size'];

  return (
    <section className="px-20 py-12 max-w-300 mx-auto md:px-8 md:py-8 sm:px-4 sm:py-4">
      <div>
        <header className="flex items-center mb-8">
          <h2 className="inline-block m-0 text-[1.75rem] pb-1.5 md:text-[1.5rem] font-bold">Top Repos</h2>
          <div className="dropdown-wrapper flex items-center text-base text-grey ml-4">
            <span className="label mr-4">by</span>
            <Tabs value={sortType} onValueChange={(value) => setSortType(value as 'stars' | 'forks' | 'size')} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                {sortTypes.map((type) => (
                  <TabsTrigger key={type} value={type} className="text-sm font-medium cursor-pointer">
                    {type.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </header>

        <div className="repo-list">
          {topRepos.length > 0 ? (
            <FlipMove typeName="ul" className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
              {topRepos.map(repo => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full transition-all duration-200 hover:shadow-xl focus:shadow-xl">
                    <Card className="h-full bg-white border border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="pb-1">
                        <CardTitle className="flex items-center text-darkGrey text-xl font-mono font-bold tracking-[-0.5px]">
                          <FolderGit2 size={16} className="mr-2 min-w-4 text-blue" />
                          <span className="overflow-hidden text-ellipsis">{repo.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{repo.description || 'Description not available.'}</p>
                        <div className="repo__stats flex justify-between text-xs text-grey mt-auto">
                          <div className="repo__stats--left flex grow">
                            <span className="flex items-center mr-3">
                              <div
                                className="language rounded-full w-2.5 h-2.5 mr-1"
                                style={{ backgroundColor: langColors[repo.language] }}
                              />
                              {repo.language}
                            </span>
                            <span className="flex items-center mr-3">
                              <Star size={16} className="mr-1" />
                              {repo.stargazers_count.toLocaleString()}
                            </span>
                            <span className="flex items-center mr-3">
                              <GitFork size={16} className="mr-1" />
                              {repo.forks.toLocaleString()}
                            </span>
                          </div>
                          <div className="repo__stats--right">
                            <span>{repo.size.toLocaleString()} KB</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </li>
              ))}
            </FlipMove>
          ) : (
            <p>No available repositories!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Repos;