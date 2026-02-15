// GitHub API action modules

import GhPolyglot from 'gh-polyglot';
import { UserData, LangDataItem, RepoDataItem, ErrorState, RateLimit } from '@/types/user-items';
// ---------------------------------------------------------------

/**
 * Fetches user data from GitHub API
 * @param username - GitHub username
 * @returns Promise with data and error
 */
export async function getUserData(username: string): Promise<{ data: UserData | null; error: ErrorState | null }> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.status === 404) {
      return { data: null, error: { active: true, type: 404 } };
    }
    if (response.status === 403) {
      return { data: null, error: { active: true, type: 403 } };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { data: null, error: { active: true, type: 400 } };
  }
}

/**
 * Fetches language statistics from GitHub API
 * @param username - GitHub username
 * @returns Promise with data and error
 */
export async function getLangData(username: string): Promise<{ data: LangDataItem[] | null; error: ErrorState | null }> {
  try {
    // First get repos to aggregate languages
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!reposResponse.ok) {
      return { data: null, error: { active: true, type: reposResponse.status } };
    }
    const repos = await reposResponse.json();

    const langStats: { [key: string]: number } = {};
    let totalBytes = 0;

    // Get language data for each repo
    for (const repo of repos) {
      if (repo.language) {
        const langResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
        if (langResponse.ok) {
          const langData = await langResponse.json();
          for (const [lang, bytes] of Object.entries(langData)) {
            langStats[lang] = (langStats[lang] || 0) + (bytes as number);
            totalBytes += bytes as number;
          }
        }
      }
    }

    // Convert to the expected format
    const langData: LangDataItem[] = Object.entries(langStats)
      .map(([label, value]) => ({
        label,
        value: Math.round((value / totalBytes) * 100), // percentage
        color: getLanguageColor(label),
      }))
      .sort((a, b) => b.value - a.value);

    return { data: langData, error: null };
  } catch (error) {
    console.error('Error fetching lang data:', error);
    return { data: null, error: { active: true, type: 400 } };
  }
}

/**
 * Gets color for a programming language
 * @param language - Programming language name
 * @returns Color hex code
 */
export function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    // Add more as needed
  };
  return colors[language] || '#586069'; // Default gray
}

/**
 * Fetches repository data from GitHub API
 * @param username - GitHub username
 * @returns Promise with data and error
 */
export async function getRepoData(username: string): Promise<{ data: RepoDataItem[] | null; error: ErrorState | null }> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (response.status === 404) {
      return { data: null, error: { active: true, type: 404 } };
    }
    if (response.status === 403) {
      return { data: null, error: { active: true, type: 403 } };
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching repo data:', error);
    return { data: null, error: { active: true, type: 200 } };
  }
}

/**
 * Fetches GitHub API rate limit information
 * @returns Promise with rate limit data or null
 */
export async function getRateLimit(): Promise<{ remaining: number; limit: number } | null> {
  try {
    const response = await fetch('https://api.github.com/rate_limit');
    const json = await response.json();
    return json.resources.core;
  } catch (error) {
    console.error('Error fetching rate limit:', error);
    return null;
  }
}

/**
 * Fetches user data from GitHub API (callback version)
 * @param username - GitHub username
 * @param onSuccess - Callback for successful fetch
 * @param onError - Callback for error handling
 */
export const fetchUserData = async (
  username: string,
  onSuccess: (data: UserData) => void,
  onError: (error: ErrorState) => void
): Promise<void> => {
  if (!username) return;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (response.status === 404) {
      return onError({ active: true, type: 404 });
    }
    
    if (response.status === 403) {
      return onError({ active: true, type: 403 });
    }
    
    const json = await response.json();
    onSuccess(json);
  } catch (error) {
    onError({ active: true, type: 400 });
    console.error('Error fetching user data:', error);
  }
};

/**
 * Fetches language statistics using gh-polyglot
 * @param username - GitHub username
 * @param onSuccess - Callback for successful fetch
 * @param onError - Callback for error handling
 */
export const fetchLangData = (
  username: string,
  onSuccess: (data: LangDataItem[]) => void,
  onError: (error: ErrorState) => void
): void => {
  if (!username) return;

  const me = new GhPolyglot(`${username}`);
  me.userStats((err: any, stats: LangDataItem[]) => {
    if (err) {
      console.error('Error fetching language data:', err);
      onError({ active: true, type: 400 });
      return;
    }
    onSuccess(stats);
  });
};

/**
 * Fetches repository data from GitHub API
 * @param username - GitHub username
 * @param onSuccess - Callback for successful fetch
 * @param onError - Callback for error handling
 */
export const fetchRepoData = async (
  username: string,
  onSuccess: (data: RepoDataItem[]) => void,
  onError: (error: ErrorState) => void
): Promise<void> => {
  if (!username) return;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    
    if (response.status === 404) {
      return onError({ active: true, type: 404 });
    }
    
    if (response.status === 403) {
      return onError({ active: true, type: 403 });
    }
    
    const json = await response.json();
    onSuccess(json);
  } catch (error) {
    onError({ active: true, type: 200 });
    console.error('Error fetching repo data:', error);
  }
};

/**
 * Fetches GitHub API rate limit information
 * @param onSuccess - Callback for successful fetch
 * @param onError - Callback for error handling
 */
export const fetchRateLimit = async (
  onSuccess: (rateLimit: RateLimit) => void,
  onError: (error: ErrorState) => void
): Promise<void> => {
  try {
    const response = await fetch(`https://api.github.com/rate_limit`);
    const json = await response.json();
    const rateLimitData = json.resources.core;
    
    onSuccess(rateLimitData);
    
    if (rateLimitData.remaining < 1) {
      onError({ active: true, type: 403 });
    }
  } catch (error) {
    console.error('Error fetching rate limit:', error);
  }
};