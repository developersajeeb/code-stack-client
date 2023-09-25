import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import notUser from "../../../assets/icons/user-not.png";
import { LuUsers2 } from "react-icons/lu";

interface User {
  role: string;
  imgURL: string | undefined;
  _id: string;
  name: string;
  email: string;
}

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

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
    <main>
      <div className="text-center">
        <span className='bg-indigo-50 px-5 py-2 text-color-second rounded-md font-medium'>Users</span>
        <h2 className='text-3xl font-semibold text-gray-800 leading-snug mb-2 mt-4'>Manage Users</h2>
        <div className="divider text-gray-400 w-72 mx-auto"><LuUsers2 size={45} /></div>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User, index: number) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center">
                    <div className="avatar">
                      <div className="mask rounded-full w-12 h-12">
                        <img src={user?.imgURL || notUser} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {
                    user?.role === "admin" ?
                      <button className="px-3 py-1 text-gray-400 font-medium rounded-md bg-slate-300 border-2 border-gray-300" disabled>Already Admin</button>
                      :
                      <button onClick={() => handleUpdateRole(user, "admin")} className="bg-button-small">Make Admin</button>
                  }
                </td>
                <td>
                  {
                    user?.role === "normalUser" ?
                      <button className="px-3 py-1 text-gray-400 font-medium rounded-md bg-slate-300 border-2 border-gray-300" disabled>Not Admin</button>
                      :
                      <button onClick={() => handleRemoveAdmin(user, "normalUser")} className="bg-button-small">Remove Admin</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AllUsers;
