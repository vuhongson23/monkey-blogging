import React, { useEffect } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "components/image/ImageUpload";
import { Field, FieldCheckboxes } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Radio } from "components/checkbox";
import { userRole, userStatus } from "utils/constants";
import { useForm } from "react-hook-form";
import { Button } from "components/button";
import useFirebaseImage from "components/hooks/useFirebaseImage";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "components/firebase/firebase-config";
import { toast } from "react-toastify";
import { TextAreaBox } from "components/textarea";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const imageURL = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageURL);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, progress, setImage, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update profile user successfully!!!");
    } catch (error) {
      console.log(error);
      toast.error("Can not update profile user!!!");
    }
  };
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageURL);
  }, [imageURL, setImage]);
  useEffect(() => {
    async function fetchData() {
      const cofRef = doc(db, "users", userId);
      const dataUser = await getDoc(cofRef);
      reset(dataUser && dataUser.data());
    }
    fetchData();
  }, [reset, userId]);
  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update user"
        desc={`Update user with ID: ${userId}`}
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
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENING}
                value={userStatus.PENING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Description</Label>
            <TextAreaBox name="description" control={control}></TextAreaBox>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
