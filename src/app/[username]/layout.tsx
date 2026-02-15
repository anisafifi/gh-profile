import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import UserProfilePage from './page';

interface Props {
  params: Promise<{ username: string }>;
}

// Generate metadata for each user profile page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  // Validate username format
  if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
    return {
      title: 'Invalid Username | GitHub Profile Viewer',
      description: 'The provided username is invalid. Please enter a valid GitHub username.',
    };
  }

  try {
    // Fetch user data for metadata
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'GitHub-Profile-Viewer/1.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          title: `${username} - User Not Found | GitHub Profile Viewer`,
          description: `The GitHub user "${username}" could not be found. Please check the username and try again.`,
        };
      }
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    const userData = await response.json();

    const title = `${userData.name || userData.login} (@${userData.login}) | GitHub Profile Viewer`;
    const description = userData.bio
      ? `${userData.bio} | ${userData.public_repos} repositories, ${userData.followers} followers. Explore ${userData.login}'s GitHub profile with detailed statistics and insights.`
      : `${userData.login} has ${userData.public_repos} public repositories and ${userData.followers} followers on GitHub. View detailed profile statistics, repository insights, and programming language usage.`;

    return {
      title,
      description,
      keywords: [
        userData.login,
        userData.name,
        'GitHub profile',
        'developer',
        'repositories',
        'programming',
        'open source',
        ...(userData.location ? [userData.location] : []),
        ...(userData.company ? [userData.company] : []),
      ].filter(Boolean),
      authors: [
        {
          name: userData.name || userData.login,
          url: userData.html_url,
        },
      ],
      openGraph: {
        title,
        description,
        url: `https://gh-profile-viewer.vercel.app/${username}`, // Replace with your actual domain
        siteName: 'GitHub Profile Viewer',
        images: [
          {
            url: userData.avatar_url,
            width: 400,
            height: 400,
            alt: `${userData.name || userData.login}'s GitHub avatar`,
          },
          {
            url: '/og-image.png', // Fallback image
            width: 1200,
            height: 630,
            alt: 'GitHub Profile Viewer',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `${userData.name || userData.login} | GitHub Profile`,
        description: description.slice(0, 200),
        images: [userData.avatar_url],
        creator: userData.twitter_username ? `@${userData.twitter_username}` : undefined,
      },
      alternates: {
        canonical: `https://gh-profile-viewer.vercel.app/${username}`, // Replace with your actual domain
      },
      other: {
        'profile:username': userData.login,
        'profile:first_name': userData.name?.split(' ')[0],
        'profile:last_name': userData.name?.split(' ').slice(1).join(' '),
        'profile:gender': 'unknown',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `${username} | GitHub Profile Viewer`,
      description: `View ${username}'s GitHub profile with repositories, statistics, and programming language insights.`,
    };
  }
}

// Generate static params for popular users (optional optimization)
export async function generateStaticParams() {
  // You could pre-generate pages for popular GitHub users here
  return [];
}

export default function Page({ params }: Props) {
  return <UserProfilePage />;
}