import { ActionDelete, ActionEdit } from "components/action";
import { Button } from "components/button";
import { db } from "components/firebase/firebase-config";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";

const USER_PER_PAGE = 1;

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleLoadMoreUser = async () => {
    const colRef = collection(db, "users");
    const nextRef = query(
      colRef,
      startAfter(lastDoc || 0),
      limit(USER_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = userFilter
        ? query(
            colRef,
            where("username", ">=", userFilter),
            where("username", "<=", userFilter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [userFilter]);

  const renderRoleUser = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Modirator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const renderStatusUser = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };
  const handleDeleteUser = (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };
  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user?.id}>{user?.id.slice(0, 5) + "..."}</td>
        <td>
          <div className="flex gap-x-2">
            <img
              src={user.avatar}
              alt=""
              className="w-11 h-11 rounded-full flex-shrink-0 object-cover"
            />
            <div className="flex-1">
              <h3>{user?.fullname}</h3>
              <time className="text-sm text-gray-400">
                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user?.email}>{user?.email.slice(0, 8) + "..."}</td>
        <td>{renderStatusUser(Number(user?.status))}</td>
        <td>{renderRoleUser(Number(user?.role))}</td>
        <td>
          <div className="flex gap-x-3 items-center">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  const handleFilterUser = debounce((e) => {
    setUserFilter(e.target.value);
  }, 500);
  return (
    <>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          className="px-6 py-3 border border-gray-400 rounded-lg"
          placeholder="Search user..."
          onChange={handleFilterUser}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
      {total > userList.length && (
        <div className="mt-10">
          <Button className="mx-auto" onClick={handleLoadMoreUser}>
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default UserTable;
