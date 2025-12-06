import { lazy, Suspense } from "react";
import { Main } from "@/shared/layouts";
import { NotFoundPage } from "@/shared/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header, Sidebar, Loader, Select } from "@/shared/components";

const Device = lazy(() => import("@/device/index"));
const Subscription = lazy(() => import("@/subscription/index"));

function App() {
  return (
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
  );
}

export default App;
