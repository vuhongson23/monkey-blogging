import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "components/image/ImageUpload";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "components/firebase/firebase-config";
import useFirebaseImage from "components/hooks/useFirebaseImage";
// import { toast } from "react-toastify";

const UserProfile = () => {
  const params = useParams();
  const { control, reset, setValue, getValues, handleSubmit } = useForm({
    mode: "onChange",
  });
  const imageURL = getValues("avatar");
  const { image, progress, setImage, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, deleteAvatar);
  const handleUpdateUser = async (values) => {
    console.log("🚀 ~ handleUpdateUser ~ values:", values);
    // try {
    //   const colRef = doc(db, "users", params.slug);
    //   await updateDoc(colRef, {
    //     ...values,
    //     avatar: image,
    //   });
    //   toast.success("Update profile user successfully!!!");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Can not update profile user!!!");
    // }
  };
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", params.slug);
      const dataUser = await getDoc(docRef);
      console.log("🚀 ~ fetchData ~ dataUser:", dataUser.data());
      reset(dataUser && dataUser.data());
    }
    fetchData();
  }, [params.slug, reset]);
  async function deleteAvatar() {
    const colRef = doc(db, "users", params.slug);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button type="submit" kind="primary" className="mx-auto w-[200px]">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
