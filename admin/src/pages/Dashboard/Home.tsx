/* import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard"; */
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | Sovio Cusco Admin Dashboard"
        description="Este es el dashboard de la plataforma Sovio Cusco"
      />
      <PageBreadcrumb pageTitle="" />
      <div className="flex h-96 w-full justify-center items-center">
        <img
          className="dark:hidden"
          src="/images/logo/logo y eslogan opcion 2_positivo.webp"
          alt="Logo"
          width={300}
          height={100}
        />
        <img
          className="hidden dark:block"
          src="/images/logo/logo y eslogan opcion 2_negativo.webp"
          alt="Logo"
          width={300}
          height={100}
        />
      </div>
      {/* <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div> */}
    </>
  );
}
