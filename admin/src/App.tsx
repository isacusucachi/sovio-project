import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import IncomingTests from "./pages/IncomingTests/IncomingTests";
import EvaluatedTests from "./pages/EvaluatedTests/EvaluatedTest";
import VocationalTestReport from "./pages/VocationalTestReport/VocationalTestReport";
import Users from "./pages/Users/Users";
import Reports from "./pages/Reports/Reports";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />

            {/* Rutas protegidas para admin y moderator */}
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "moderator"]} />}
            >
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />

                {/* Incoming Tests */}
                <Route
                  path="/incoming-tests/:page"
                  element={<IncomingTests />}
                />

                {/* Evaluated Tests */}
                <Route
                  path="/evaluated-tests/:page"
                  element={<EvaluatedTests />}
                />

                {/* Report */}
                <Route path="/report/:id" element={<VocationalTestReport />} />

                <Route path="/reports/:page" element={<Reports />} />

                {/* Others Page */}
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />

                {/* Forms */}
                <Route path="/form-elements" element={<FormElements />} />

                {/* UI Elements */}
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />

                {/* Charts */}
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />

                {/* Admin Users */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/users/:page" element={<Users />} />
                </Route>
              </Route>
            </Route>

            {/* Página de acceso denegado */}
            <Route path="/unauthorized" element={<NotFound />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
