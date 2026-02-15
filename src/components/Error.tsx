import React from 'react';

import Head from './Head';
import Corner from './Corner';
import { GithubIcon } from 'lucide-react'


interface ErrorProps {
  error: {
    type: number;
  };
}

const Error: React.FC<ErrorProps> = ({ error }) => (
  <div className="flex flex-col items-center justify-center bg-black bg-linear-to-b from-black to-darkGrey text-offWhite h-screen pb-[20vh] text-[1.5rem]">
    <Head title="OctoProfile" />
    <Corner />
    <GithubIcon size={24} className="text-blue mb-12" />
    <h1>OctoProfile</h1>

    {error && (
      <div>
        {error.type === 403 ? (
          <p className="text-base">
            Oh no, you hit the{' '}
            <a
              href="https://developer.github.com/v3/rate_limit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightblue hover:underline focus:underline">
              rate limit
            </a>
            ! Try again later.
          </p>
        ) : error.type === 404 ? (
          <p className="text-base">User not found!</p>
        ) : (
          <p className="text-base">Oh no! Something went wrong. Try again later!</p>
        )}
      </div>
    )}
  </div>
);

export default Error;