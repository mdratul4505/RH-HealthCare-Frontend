import apiClient from "@/lib/apiClient";
import { DoctorApplicationPayload, VerifyAccountPayload } from "@/types";

export function applyAsDoctor(payload: DoctorApplicationPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));
  formData.append("resume", payload.resume);

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctor/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
}

export function verifyDoctorAccount(payload: VerifyAccountPayload) {
  return apiClient("/doctor/apply-as-doctor/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function getAllDoctorsPublic() {
  return apiClient("/doctor/public/all-doctors");
}

export function getAvailableDoctorsToday() {
  return apiClient("/doctor/public/available-today");
}

export function getSingleDoctorPublic(doctorId: string) {
  return apiClient(`/doctor/public/${doctorId}`);
}
