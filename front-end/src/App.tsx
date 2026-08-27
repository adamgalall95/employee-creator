import { BrowserRouter, Route, Routes } from "react-router";
import { EmployeesCreatePage } from "./pages/EmployeesCreatePage";
import { EmployeesListPage } from "./pages/EmployeesListPage";
import { EmployeesUpdatePage } from "./pages/EmployeesUpdatePage";

export function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#17191c]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeesListPage></EmployeesListPage>} />
          <Route
            path="/form"
            element={<EmployeesCreatePage></EmployeesCreatePage>}
          />
          <Route
            path="/employees/:id/edit"
            element={<EmployeesUpdatePage></EmployeesUpdatePage>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
