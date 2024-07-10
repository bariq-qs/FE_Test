import { useMutation } from "@tanstack/react-query";
import api from "../config/api";
import { TReqAuthLogin, TResAuthLogin } from "./auth-model";

const endpoint = "/auth";

class AuthServices {
  login(payload: TReqAuthLogin): Promise<TResAuthLogin> {
    return api.post(`${endpoint}/login`, payload).then((res) => res.data);
  }
}

const authServices = new AuthServices();

export const useAuthLogin = () => {
  return useMutation({
    mutationFn: (payload: TReqAuthLogin) => authServices.login(payload),
  });
};
