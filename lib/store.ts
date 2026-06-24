import { RoomDesign, SAMPLE_PROJECTS } from "./data";

const STORAGE_KEY = "renovision_projects";
const FAVORITES_KEY = "renovision_favorites";

export function getProjects(): RoomDesign[] {
  if (typeof window === "undefined") return SAMPLE_PROJECTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PROJECTS));
    return SAMPLE_PROJECTS;
  }
  return JSON.parse(stored);
}

export function saveProject(project: RoomDesign): void {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(id: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return idx < 0;
}

export function generateId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// Room photos stored separately (base64) to keep project JSON small
export function saveRoomPhoto(projectId: string, dataUrl: string): void {
  localStorage.setItem(`renovision_photo_${projectId}`, dataUrl);
}

export function getRoomPhoto(projectId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`renovision_photo_${projectId}`);
}

export function deleteRoomPhoto(projectId: string): void {
  localStorage.removeItem(`renovision_photo_${projectId}`);
}

// Resize image to max 900px wide and return base64
export function resizeImage(file: File, maxWidth = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
