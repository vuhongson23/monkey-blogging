import { db } from "components/firebase/firebase-config";
import Layout from "components/layout/Layout";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Heading from "components/layout/Heading";
import PostItem from "components/module/post/PostItem";

const AuthorPage = () => {
  const [posts, setPosts] = useState([]);
  const [userInfor, setUserInfor] = useState({});
  const params = useParams();
  console.log("🚀 ~ AuthorPage ~ params:", params);
  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("user.username", "==", params.slug)
      );
      onSnapshot(colRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);
  useEffect(() => {
    async function fetchUserInfo() {
      const colRef = query(
        collection(db, "users"),
        where("username", "==", params.slug)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setUserInfor(doc.data());
        });
      });
    }
    fetchUserInfo();
  }, [params.slug]);
  if (!params.slug) return <PageNotFound></PageNotFound>;
  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="pt-10">
          <Heading>
            Bài viết của <strong>{userInfor.fullname}</strong>
          </Heading>
        </div>
        <div className="grid-layout grid-layout--primary">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
