import { db } from "components/firebase/firebase-config";
import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import PostItem from "components/module/post/PostItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({});
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
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
    async function fetchCategory() {
      const colRef = query(
        collection(db, "categories"),
        where("slug", "==", params.slug)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setCategoryInfo(doc.data());
        });
      });
    }
    fetchCategory();
  }, [params.slug]);
  if (!params.slug) return <PageNotFound></PageNotFound>;
  if (posts.length <= 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="pt-10">
          <Heading>
            Danh mục <strong>{categoryInfo.name}</strong>
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

export default CategoryPage;
