import StyledApp from "./app.style";
import CategoriesModule from "./components/categories-module/categories-module";
import FilterDisclaimer from "./components/filter-disclaimer/filter-disclaimer";
import IgnoreController from "./components/ignore-controller/ignore-controller";
import InsightsModule from "./components/insights-module/insights-module";
import MonthlyModule from "./components/monthly-module/monthly-module";
import RawList from "./components/raw-list/raw-list";
import TotalsModule from "./components/totals-module/totals-module";
import UploadFiles from "./components/upload-files/upload-files";

const App = () => {
  return (
    <StyledApp>
      <UploadFiles />
      <IgnoreController />
      <FilterDisclaimer />
      <TotalsModule />
      <RawList />
      <MonthlyModule />
      <InsightsModule />
      <CategoriesModule />
    </StyledApp>
  );
}

export default App;
