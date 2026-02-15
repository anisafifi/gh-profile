// Custom hook for managing GitHub user data

import { useState, useEffect } from 'react';
import { fetchUserData, fetchLangData, fetchRepoData, fetchRateLimit } from '@/actions/user';
import { UserData, LangDataItem, RepoDataItem, ErrorState, RateLimit } from '@/types/user-items';
// ---------------------------------------------------------------

/**
 * Custom hook to manage GitHub user profile data
 * @param username - GitHub username to fetch data for
 * @returns Object containing all user data and loading states
 */
export const useGitHubUser = (username: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [langData, setLangData] = useState<LangDataItem[] | null>(null);
  const [repoData, setRepoData] = useState<RepoDataItem[] | null>(null);
  const [error, setError] = useState<ErrorState>({ active: false, type: 200 });
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);

  useEffect(() => {
    if (!username) return;

    // Fetch rate limit first
    fetchRateLimit(setRateLimit, setError);

    // Fetch user data
    fetchUserData(username, setUserData, setError);

    // Fetch language statistics
    fetchLangData(username, setLangData, setError);

    // Fetch repository data
    fetchRepoData(username, setRepoData, setError);
  }, [username]);

  return {
    userData,
    langData,
    repoData,
    error,
    rateLimit,
  };
};