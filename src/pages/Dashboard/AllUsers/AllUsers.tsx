import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'


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
    axiosSecure.patch(`users/admin/${user._id}`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an ${role}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRemoveAdmin = (user: User, role: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove the role?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
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
    <div className="overflow-x-auto md:ml-20 my-10 md:w-full">
      <h1 className="text-3xl lg:text-5xl font-bold uppercase text-center p-10">
        All Users
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>User Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: User, index: number) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user?.imgURL} alt="" />
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleUpdateRole(user, "admin")}
                  className="btn btn-accent btn-sm"
                  disabled={user?.role === "admin"}
                >
                  Make Admin
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleRemoveAdmin(user, "normalUser")}
                  className="btn btn-error btn-sm"
                  disabled={user?.role === "normalUser"}
                >
                  Remove Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
