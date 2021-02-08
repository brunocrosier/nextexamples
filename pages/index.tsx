import { GetStaticProps } from "next";
import { GridLayout } from "../components/GridLayout";

export const getStaticProps: GetStaticProps = async () => {
  const raw = await fetch(
    "https://api.github.com/repos/vercel/next.js/contents/examples?ref=canary",
    {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    }
  );

  const data = await raw.json();

  const arrayOfSanitizedNameObjects: { sanitizedName: string }[] = data.map(
    (repo) => {
      repo.sanitizedName = repo.name;

      // sanitize name by removing the "with-" prefix
      if (/^with-/.test(repo.sanitizedName)) {
        repo.sanitizedName = repo.sanitizedName.replace("with-", "");
      }

      return {
        sanitizedName: repo.sanitizedName,
      };
    }
  );

  // sort the repos alphabetically by the sanitized name
  arrayOfSanitizedNameObjects?.sort((a, b) =>
    a.sanitizedName > b.sanitizedName
      ? 1
      : b.sanitizedName > a.sanitizedName
      ? -1
      : 0
  );

  return {
    props: {
      data: arrayOfSanitizedNameObjects,
    },
    revalidate: 60 * 60 * 10, // 10 Hours
  };
};

export default function Home({ data }) {
  // we pass "null" for to the sanitizedName prop, as this is the homepage
  return <GridLayout data={data} sanitizedName={null} />;
}
