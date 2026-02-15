'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';

import { useGitHubUser } from '@/hook/use-github-user';
import RateLimit from '@/components/RateLimit';
import {Charts} from '@/components/Charts';
import Repos from '@/components/Repos';
import Error from '@/components/Error';
import { UserInfo } from '@/components/user-info';
import { GitHubContributionChart } from '@/components/GitHubContributionChart';

const UserContent = () => {
  const params = useParams();
  const username = params.username as string;

  // Use the custom hook to manage all GitHub data
  const { userData, langData, repoData, error, rateLimit } = useGitHubUser(username);

  return (
    <main>

      {error && error.active ? (
        <Error error={error} />
      ) : (
        <>
          {/* <Head title={`${username ? `OctoProfile | ${username}` : 'OctoProfile'}`} /> */}

          {/* <Corner /> */}

          {userData && <UserInfo userData={userData} />}

          {/* GitHub Contribution Chart */}
          {userData && userData.login && (
            <GitHubContributionChart username={userData.login} style={{ margin: '2rem 0' }} />
          )}

          {langData && repoData && <Charts langData={langData} repoData={repoData} />}

          {repoData && <Repos repoData={repoData} />}

        </>
      )}

    </main>
  );
};

export default function User() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserContent />
    </Suspense>
  );
};