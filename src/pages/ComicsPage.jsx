import React from "react";
import ComicsList from "../components/comicsList/ComicsList";
import AppBanner from "../components/appBanner/AppBanner";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <div>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </div>
  );
};

export default ComicsPage;
