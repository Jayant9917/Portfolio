export type GitHubContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubStats = {
  username: string;
  profileUrl: string;
  totalContributions: number | null;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  topLanguages: string[];
  recentlyUpdated: string | null;
  contributions: GitHubContributionDay[];
};

type GitHubUserResponse = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

type GitHubRepoResponse = {
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string | null;
};

const GITHUB_USERNAME = "Jayant9917";
const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "jayant-portfolio",
};

function parseContributions(html: string) {
  const totalMatch = html.match(
    />\s*([\d,]+)\s*contributions\s*in the last year\s*</i,
  );
  const totalContributions = totalMatch
    ? Number.parseInt(totalMatch[1].replace(/,/g, ""), 10)
    : null;

  const contributions = Array.from(
    html.matchAll(
      /<td[^>]*data-date="([^"]+)"[^>]*?(?:data-count="(\d+)")?[^>]*?(?:data-level="([0-4])")?[^>]*><\/td>\s*(?:<tool-tip[^>]*>([^<]*)<\/tool-tip>)?/g,
    ),
  )
    .map((match) => {
      const tooltipText = match[4] ?? "";
      const tooltipCountMatch = tooltipText.match(/^([\d,]+)\s+contributions?\s+/i);

      return {
        date: match[1],
        count: match[2]
          ? Number.parseInt(match[2], 10)
          : tooltipCountMatch
            ? Number.parseInt(tooltipCountMatch[1].replace(/,/g, ""), 10)
            : 0,
        level: match[3] ? Number.parseInt(match[3], 10) : 0,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return { totalContributions, contributions };
}

function getTopLanguages(repos: GitHubRepoResponse[]) {
  const counts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([language]) => language);
}

export async function getGitHubStats(
  username = GITHUB_USERNAME,
): Promise<GitHubStats> {
  const fallback: GitHubStats = {
    username,
    profileUrl: `https://github.com/${username}`,
    totalContributions: null,
    publicRepos: 0,
    followers: 0,
    totalStars: 0,
    totalForks: 0,
    topLanguages: [],
    recentlyUpdated: null,
    contributions: [],
  };

  try {
    const [userResponse, reposResponse, contributionsResponse] =
      await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers: GITHUB_HEADERS,
          next: { revalidate: 60 * 60 * 6 },
        }),
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          {
            headers: GITHUB_HEADERS,
            next: { revalidate: 60 * 60 * 6 },
          },
        ),
        fetch(`https://github.com/users/${username}/contributions`, {
          headers: { "User-Agent": "jayant-portfolio" },
          next: { revalidate: 60 * 60 * 6 },
        }),
      ]);

    if (!userResponse.ok || !reposResponse.ok) return fallback;

    const user = (await userResponse.json()) as GitHubUserResponse;
    const repos = (await reposResponse.json()) as GitHubRepoResponse[];
    const sourceRepos = repos.filter((repo) => !repo.fork);
    const contributionData = contributionsResponse.ok
      ? parseContributions(await contributionsResponse.text())
      : { totalContributions: null, contributions: [] };

    const recentlyUpdated =
      repos
        .map((repo) => repo.pushed_at)
        .filter(Boolean)
        .sort()
        .at(-1) ?? null;

    return {
      username: user.login,
      profileUrl: user.html_url,
      totalContributions: contributionData.totalContributions,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars: sourceRepos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0,
      ),
      totalForks: sourceRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      topLanguages: getTopLanguages(sourceRepos),
      recentlyUpdated,
      contributions: contributionData.contributions,
    };
  } catch {
    return fallback;
  }
}
