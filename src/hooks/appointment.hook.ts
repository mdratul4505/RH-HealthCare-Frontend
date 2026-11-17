import {
  bookAppointment,
  payAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointmentsAdmin,
  getSingleAppointment,
  submitPrescription,
  BookAppointmentPayload,
} from "@/api/appointment.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBookAppointment() {
  return useMutation({
    mutationFn: (payload: BookAppointmentPayload) => bookAppointment(payload),
  });
}

export function usePayAppointment() {
  return useMutation({
    mutationFn: (appointmentId: string) => payAppointment(appointmentId),
  });
}

export function useGetMyAppointments() {
  return useQuery({
    queryKey: ["my-appointments"],
    queryFn: getMyAppointments,
  });
}

export function useGetDoctorAppointments() {
  return useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: getDoctorAppointments,
  });
}

export function useGetAllAppointmentsAdmin() {
  return useQuery({
    queryKey: ["admin-appointments"],
    queryFn: getAllAppointmentsAdmin,
  });
}

export function useGetSingleAppointment(appointmentId: string) {
  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getSingleAppointment(appointmentId),
    enabled: !!appointmentId,
  });
}

export function useSubmitPrescription() {
  return useMutation({
    mutationFn: submitPrescription,
  });
}
