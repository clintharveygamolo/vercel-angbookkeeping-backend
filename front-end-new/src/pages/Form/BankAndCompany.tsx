import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BanksTable from '../../components/Tables/BanksTable';
import CompaniesTable from '../../components/Tables/CompanyTable';
import DefaultLayout from '../../layout/DefaultLayout';

const BankandCompany = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tables" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-10">
                    <BanksTable />
                </div>
                <div className="flex flex-col gap-10">
                    <CompaniesTable />
                </div>
            </div>

        </DefaultLayout>
    );
};

export default BankandCompany;