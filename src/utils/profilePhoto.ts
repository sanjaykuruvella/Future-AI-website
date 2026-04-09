export function normalizeProfilePhoto(profilePhoto?: string | null): string {
  if (!profilePhoto) {
    return "";
  }

  const trimmedPhoto = String(profilePhoto).trim();
  if (!trimmedPhoto) {
    return "";
  }

  if (trimmedPhoto.startsWith("data:image/")) {
    return trimmedPhoto;
  }

  const compactPhoto = trimmedPhoto.replace(/\s+/g, "");
  if (/^[A-Za-z0-9+/=]+$/.test(compactPhoto)) {
    return `data:image/jpeg;base64,${compactPhoto}`;
  }

  return trimmedPhoto;
}
export const USER_PROFILE_UPDATED_EVENT = "user-profile-updated";

export function saveUserToStorage(user: Record<string, unknown>) {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(
    new CustomEvent(USER_PROFILE_UPDATED_EVENT, {
      detail: user,
    })
  );
}
