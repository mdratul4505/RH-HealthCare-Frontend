import {
  bookAppointment,
  payAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointmentsAdmin,
  getSingleAppointment,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBookAppointment() {
  return useMutation({
    mutationFn: bookAppointment,
  });
}

export function usePayAppointment() {
  return useMutation({
    mutationFn: payAppointment,
  });
}

export function useGetMyAppointments() {
  return useQuery({
    queryKey: ["my-appointments"],
    queryFn: getMyAppointments,
    retry: 1,
  });
}

export function useGetDoctorAppointments() {
  return useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: getDoctorAppointments,
    retry: 1,
  });
}

export function useGetAllAppointmentsAdmin() {
  return useQuery({
    queryKey: ["admin-appointments"],
    queryFn: getAllAppointmentsAdmin,
    retry: 1,
  });
}

export function useGetSingleAppointment(appointmentId: string) {
  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getSingleAppointment(appointmentId),
    enabled: !!appointmentId,
    retry: 1,
  });
}
