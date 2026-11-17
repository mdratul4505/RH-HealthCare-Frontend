import {
  applyAsDoctor,
  verifyDoctorAccount,
  getAllDoctorsPublic,
  getAvailableDoctorsToday,
  getSingleDoctorPublic,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useVerifyDoctorAccount() {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
}

export function useGetAllDoctorsPublic() {
  return useQuery({
    queryKey: ["public-doctors"],
    queryFn: getAllDoctorsPublic,
    retry: 1,
  });
}

export function useGetAvailableDoctorsToday() {
  return useQuery({
    queryKey: ["available-doctors-today"],
    queryFn: getAvailableDoctorsToday,
    retry: 1,
  });
}

export function useGetSingleDoctorPublic(doctorId: string) {
  return useQuery({
    queryKey: ["public-doctor", doctorId],
    queryFn: () => getSingleDoctorPublic(doctorId),
    enabled: !!doctorId,
    retry: 1,
  });
}
