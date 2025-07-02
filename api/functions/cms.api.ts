import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import {
  CreateProps,
  DeletesProps,
  DetailsProps,
  ListResponse,
} from "@/typeScript/cms.interface";

type UpdateListInput = {
  id: string;
  payload: string;
};
export const CreateListFn: MutationFunction<CreateProps, unknown> = async (
  payload
) => {
  try {
    const { data } = await axiosInstance.post(endPoints.pages.create, payload);
    console.log("Create List API Response:", data);
    return data;
  } catch (error) {
    console.log("Contact Form Error", error);
  }
};

export const GetPageList: QueryFunction<ListResponse> = async () => {
  const res = await axiosInstance.get(endPoints.pages.list);
  console.log(res, "profile res");
  return res.data;
};

export const UpdateListFn: MutationFunction<
  DetailsProps,
  UpdateListInput
> = async (input) => {
  const { id, payload } = input;

  try {
    const { data } = await axiosInstance.put(
      `${endPoints.pages.update}/${id}`,
      payload
    );
    console.log("Update List API Response:", data);
    return data;
  } catch (error) {
    console.log("Contact Form Error", error);
    throw error; // so React Query can catch it properly
  }
};

export const GetEditList = async (id: string) => {
  try {
    const res = await axiosInstance.get(`${endPoints.pages.details}/${id}`);
    console.log(res, "profile res");
    return res.data;
  } catch (error) {}
};

export const DeleteListFn: MutationFunction<unknown, DeletesProps> = async (
  id
) => {
  try {
    const { data } = await axiosInstance.delete(
      `${endPoints.pages.delete}/${id}`
    );
    console.log("Delete List API Response:", data);
    return data;
  } catch (error) {
    console.log("Delete List Error:", error);
    throw error;
  }
};
