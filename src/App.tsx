import { lazy, Suspense } from "react";
import { Main } from "@/shared/layouts";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage, NotFoundPage } from "@/shared/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header, Sidebar, Loader, Select } from "@/shared/components";

const Device = lazy(() => import("@/device/index"));
const Subscription = lazy(() => import("@/subscription/index"));

function App() {
  const handleError = (error: Error, info: unknown) => {
    console.error("Component stack:", info);
    console.error("Error caught by boundary:", error);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={handleError}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Main>
            <Header />
            <div className="main-container">
              <Sidebar />

              <div className="content-container">
                <Select />
                <Routes>
                  <Route path="/" element={<Subscription />} />
                  <Route path="/device" element={<Device />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
            <Footer />
          </Main>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
