import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableZero from '../components/Tables/TableZero';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableZero />
      </div>

    </DefaultLayout>
  );
};

export default Tables;

/* <div className="flex flex-col gap-10">
        <TableZero />
        <TableOne />
        <TableTwo />
        <TableThree />
      </div> */