import {
  CreateListFn,
  DeleteListFn,
  GetEditList,
  GetPageList,
  UpdateListFn,
} from "@/api/functions/cms.api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";

import { Cookies } from "react-cookie";
import toast from "react-hot-toast";

export const useCreateListMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  return useMutation({
    mutationFn: CreateListFn,
    onSuccess: (res) => {
      console.log("ListCreation Mutation Response:", res);
      if (res) {
        toast.success(res.message);
      } else {
        toast.error("Failed! Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("Create List Mutation Error:", error);
      toast.error("Failed. Please try again.");
    },
  });
};

export const listQuery = () => {
  return useQuery({
    queryKey: ["LIST"],
    queryFn: GetPageList,
  });
};

export const useUpdateListMutation = (): UseMutationResult<
  any,
  unknown,
  { payload: any; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: UpdateListFn,
    onSuccess: (res) => {
      console.log("Update Mutation Response:", res);
      if (res) {
        toast.success(res.message);
      } else {
        toast.error("Failed! Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("Update List Mutation Error:", error);
      toast.error("Failed. Please try again.");
    },
  });
};

export const editQuery = (id: string) => {
  return useQuery({
    queryKey: ["EDIT", id],
    queryFn: () => GetEditList(id),
  });
};

export const useDeleteListMutation = (): UseMutationResult<
  any,
  unknown,
  string,
  unknown
> => {
  return useMutation({
    mutationFn: (id: string) => DeleteListFn(id as any),
    onSuccess: (res) => {
      console.log("Delete Mutation Response:", res);
      if (res) {
        toast.success("deleted succesfull");
      } else {
        toast.error("Failed! Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("Delete List Mutation Error:", error);
      toast.error("Failed. Please try again.");
    },
  });
};
