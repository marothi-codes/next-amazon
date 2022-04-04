import { useRouter } from "next/router";

function ArticlePage() {
  const router = useRouter();
  const newsId = router.query.newsId;

  return <h1>Article Slug: {newsId}</h1>;
}

export default ArticlePage;
