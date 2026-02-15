# GitHub Profile Viewer

A sleek and modern GitHub profile viewer built with Next.js, React, and Chart.js. Explore user profiles, repositories, and language statistics with an intuitive interface and responsive design.

![Preview](/screenshot.png)

## Features

- **User Profile Display**: View detailed GitHub user information including avatar, name, bio, location, company, and statistics
- **Language Statistics**: Interactive charts showing programming language usage across all repositories
- **Repository Listing**: Browse through user's public repositories with star counts, forks, and descriptions
- **Username Validation**: Real-time validation of GitHub usernames before fetching data
- **Rate Limit Handling**: Displays current GitHub API rate limit status
- **Error Handling**: Comprehensive error handling for invalid users, API failures, and rate limits
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Dark/Light Theme**: Support for theme switching (via next-themes)
- **Toast Notifications**: User-friendly notifications for search status and errors

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Chart.js for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Font**: Barlow (Google Fonts)
- **Notifications**: Sonner for toast messages

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gh-profile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a valid GitHub username in the search field
2. Click "Search" to validate and fetch the user's profile
3. View the user's profile information, language statistics, and repositories
4. Navigate back to search for another user

## API Endpoints

### GET `/api/[username]`

Fetches comprehensive GitHub user data including:
- User profile information
- Language usage statistics
- Repository data
- API rate limit status

**Parameters:**
- `username` (string): GitHub username

**Response:**
```json
{
  "userData": {
    "avatar_url": "string",
    "name": "string",
    "login": "string",
    "html_url": "string",
    "company": "string",
    "location": "string",
    "created_at": "string",
    "public_repos": number,
    "followers": number,
    "following": number
  },
  "langData": [
    {
      "label": "string",
      "value": number,
      "color": "string"
    }
  ],
  "repoData": [
    {
      "id": number,
      "name": "string",
      "html_url": "string",
      "description": "string",
      "language": "string",
      "stargazers_count": number,
      "forks": number,
      "size": number,
      "fork": boolean
    }
  ],
  "error": null | { "active": boolean, "type": number },
  "rateLimit": { "remaining": number, "limit": number }
}
```

## Project Structure

```
src/
├── app/
│   ├── api/[username]/
│   │   └── route.ts          # API endpoint for user data
│   ├── [username]/
│   │   └── page.tsx          # Dynamic user profile page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page with search
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── Charts.tsx            # Language statistics charts
│   ├── Error.tsx             # Error display component
│   ├── RateLimit.tsx         # Rate limit status
│   ├── Repos.tsx             # Repository listing
│   ├── SearchForm.tsx        # Main search form
│   ├── user-info.tsx         # User profile display
│   └── ...
├── actions/
│   └── user.ts               # GitHub API actions
├── hook/
│   └── use-github-user.ts    # Custom hook for data fetching
├── lib/
│   └── utils.ts              # Utility functions
├── types/
│   └── user-items.ts         # TypeScript interfaces
└── utils/
    ├── build-chart.ts        # Chart configuration
    ├── lang-colors.ts        # Language color mappings
    └── index.ts
```

## GitHub API

This application uses the GitHub REST API v3. The following endpoints are utilized:

- `GET /users/{username}` - User profile information
- `GET /users/{username}/repos` - User's repositories
- `GET /repos/{owner}/{repo}/languages` - Repository language statistics
- `GET /rate_limit` - API rate limit status

**Rate Limits**: 60 requests per hour for unauthenticated requests, 5000 for authenticated requests.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **ESLint**: Configured for Next.js with TypeScript
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (via ESLint)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform supporting Next.js:

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing user data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Next.js](https://nextjs.org/) for the amazing framework
