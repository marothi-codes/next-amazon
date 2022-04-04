import { Fragment } from "react";
import Link from "next/link";

function NewsPage() {
  return (
    <Fragment>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="/news/next-js-is-a-great-framework">
            Next.js is a Great Framework
          </Link>
        </li>
        <li>
          <Link href="/news/yet-another-article">Yet Another Article</Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
