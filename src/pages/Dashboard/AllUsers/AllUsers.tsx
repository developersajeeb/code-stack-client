import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import notUser from "../../../assets/icons/user-not.png";
import { LuUsers2 } from "react-icons/lu";
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { useState } from 'react'

interface User {
  role: string;
  imgURL: string | undefined;
  _id: string;
  name: string;
  email: string;
}

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const fetchUsers = async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  };

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery(["users"], fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <input className='border border-gray-300 rounded-md w-full py-3 px-5 mt-2 focus:border-primary-color text-sm font-normal' type="text" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search by name, email, admin, normalUser" />
    );
  };

  const header = renderHeader();

  const imageBodyTemplate = (users: { imgURL: any; }) => {
    return <img src={users?.imgURL || notUser} alt='' className="mask rounded-full w-12 h-12 object-cover" />;
  };

  const actionAdmin = (rowData: User) => {

    const handleUpdateRole = (user: User, role: string) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to make this user an admin?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#33B89F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Do it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`users/admin/${user._id}`, { role }).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Success!',
                text: `You successfully made ${user.name} an admin!`,
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            }
          });
        }
      })
    };

    return (
      rowData.role === 'admin' ?
        <button className="px-3 py-1 text-gray-400 font-medium rounded-md bg-slate-300 border-2 border-gray-300" disabled>Already Admin</button>
        :
        <button onClick={() => handleUpdateRole(rowData, "admin")} className="bg-button-small">Make Admin</button>
    );
  };

  const actionUser = (rowData: User) => {

    const handleRemoveAdmin = (user: User, role: string) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to remove this user from admin?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#33B89F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {

          axiosSecure.patch(`users/normalUser/${user._id}`, { role: "normalUser" }).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                'Removed!',
                `${user.name} is a ${role}`,
                'success'
              )
            }
          });
        }
      })
    }

    return (
      rowData.role === 'normalUser' ?
        <button className="px-3 py-1 text-gray-400 font-medium rounded-md bg-slate-300 border-2 border-gray-300" disabled>Not Admin</button>
        :
        <button onClick={() => handleRemoveAdmin(rowData, "normalUser")} className="bg-button-small">Remove Admin</button>
    );
  };



  return (
    <main>
      <div className="text-center">
        <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Users</span>
        <h2 className='text-3xl font-semibold text-gray-800 leading-snug mb-2 mt-4'>Manage Users</h2>
        <div className="divider text-gray-400 w-72 mx-auto"><LuUsers2 size={45} /></div>
      </div>

      <div className="card mt-10">
        <DataTable value={users} paginator rows={8} rowsPerPageOptions={[10, 25, 50]} tableStyle={{ minWidth: '50rem' }} filters={filters} 
          globalFilterFields={['name', 'email', 'role']} header={header} emptyMessage="No users found.">
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column field="name" header="Name" style={{ width: '25%' }}></Column>
          <Column field="email" header="Email" style={{ width: '25%' }}></Column>
          <Column field="role" header="Admin action" body={actionAdmin}></Column>
          <Column field="role" header="User action" body={actionUser}></Column>
        </DataTable>
      </div>
    </main>
  );
};

export default AllUsers;
