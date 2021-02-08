import { GridLayout } from "@/components/GridLayout";
import { GetStaticPaths, GetStaticProps } from "next";

const ArticlePage = ({ data, sanitizedName }) => {
  return <GridLayout data={data} sanitizedName={sanitizedName} />;
};

export default ArticlePage;

export const getStaticProps: GetStaticProps = async ({
  params: { sanitizedName },
}) => {
  const raw = await fetch(
    "https://api.github.com/repos/vercel/next.js/contents/examples?ref=canary",
    {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    }
  );

  const data = await raw.json();

  data.forEach((repo) => {
    repo.sanitizedName = repo.name;

    // sanitize name by removing the "with-" prefix
    if (/^with-/.test(repo.sanitizedName)) {
      repo.sanitizedName = repo.sanitizedName.replace("with-", "");
    }

    // delete unnecessary keys from the repo object
    [
      "path",
      "sha",
      "size",
      "url",
      "git_url",
      "download_url",
      "type",
      "_links",
    ].forEach((key) => delete repo[key]);
  });

  const thisRepo = data.find((repo) => repo.sanitizedName === sanitizedName);

  const rawPackageJson = await fetch(
    `https://raw.githubusercontent.com/vercel/next.js/canary/examples/${thisRepo.name}/package.json`
  );

  if (rawPackageJson.status === 200) {
    const packageJson = await rawPackageJson.json();
    const { dependencies, devDependencies } = packageJson;

    if (dependencies) {
      const dependenciesAsArray = Object.keys(dependencies).filter(
        (dependency) => !["next", "react", "react-dom"].includes(dependency)
      );
      thisRepo.dependencies = dependenciesAsArray;
    }

    if (devDependencies) {
      const devDependenciesAsArray = Object.keys(devDependencies);
      thisRepo.devDependencies = devDependenciesAsArray;
    }
  }

  const rawReadmeMd = await fetch(
    `https://raw.githubusercontent.com/vercel/next.js/canary/examples/${thisRepo.name}/README.md`
  );

  if (rawReadmeMd.status === 200) {
    const readmeMd = await rawReadmeMd.text();

    // run some regex to fix external links
    const content = readmeMd
      ?.replace(
        /\]\(\./g,
        `](https://github.com/vercel/next.js/raw/canary/examples/${thisRepo.name}`
      )
      ?.replace(/\]\(\//g, `](https://github.com/vercel/next.js/raw/canary/`)
      ?.replace(
        /src=".\//g,
        `src="https://raw.githubusercontent.com/vercel/next.js/canary/examples/${thisRepo.name}/`
      );

    thisRepo.content = content;
  }

  return {
    props: { sanitizedName, data },
    revalidate: 60 * 60 * 10, // 10 Hours
  };
};

// This function is called on the server to determine which routes should be built at /example/[sanitizedName]
export const getStaticPaths: GetStaticPaths = async () => {
  const raw = await fetch(
    "https://api.github.com/repos/vercel/next.js/contents/examples?ref=canary",
    {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    }
  );

  const data = await raw.json();

  const paths = data.map((repo) => {
    repo.sanitizedName = repo.name;

    if (/^with-/.test(repo.sanitizedName)) {
      repo.sanitizedName = repo.sanitizedName.replace("with-", "");
    }

    return {
      params: {
        sanitizedName: repo.sanitizedName,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
