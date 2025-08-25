import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user.service";
import { IUser } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("please input your fullname"),
  username: yup.string().required("please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("please input your email"),
  password: yup
    .string()
    .min(8, "Minimal 8 Character")
    .required("please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords not match")
    .required("please input your confirm password"),
  role: yup.string().required("please input your role"),
});

const useAddUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addUser = async (payload: IUser) => {
    const res = await userServices.addUser(payload);
    return res;
  };

  const {
    mutate: mutateAddUser,
    isPending: isPendingMutateAddUser,
    isSuccess: isSuccessMutateAddUser,
  } = useMutation({
    mutationFn: addUser,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add User",
      });
      reset();
    },
  });

  const handleAddUser = (data: IUser) => mutateAddUser(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
  };
};

export default useAddUserModal;
