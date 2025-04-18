import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, studentsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { BiSort } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { FaFilter, FaPlus, FaRegEye, FaSort } from "react-icons/fa6";

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },

  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: string;
  class: string;
  address: string;
};

const StudentsListPage = () => {
  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item?.phone}</td>
      <td className="hidden lg:table-celll">{item?.email}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/lists/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#C3EBFA]">
              <FaRegEye className="w-5 h-5 fill-blue-400" />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
            //   <FaTrashAlt className="w-5 h-5 fill-red-300" />
            // </button>\
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
    
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/**top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <FaFilter />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              <BiSort />
            </button>
            {role === "admin" && (
              //   <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAE27C]">
              //   <FaPlus />
              // </button>
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/**list */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      {/**pagination */}
      <Pagination />
    </div>
  );
};

export default StudentsListPage;
