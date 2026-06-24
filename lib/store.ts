import { KamerOntwerp, VOORBEELD_PROJECTEN } from "./data";

const STORAGE_KEY = "renovision_projecten";
const FAVORITES_KEY = "renovision_favorieten";

export function getProjects(): KamerOntwerp[] {
  if (typeof window === "undefined") return VOORBEELD_PROJECTEN;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(VOORBEELD_PROJECTEN));
    return VOORBEELD_PROJECTEN;
  }
  const projects = JSON.parse(stored) as KamerOntwerp[];
  // Ensure English aliases are always set
  return projects.map((p) => ({
    ...p,
    name: p.name ?? p.naam,
    style: p.style ?? p.stijl,
    wallColor: p.wallColor ?? p.muurKleur,
    floorColor: p.floorColor ?? p.vloerKleur,
    furniture: p.furniture ?? p.meubels,
    createdAt: p.createdAt ?? p.aangemaakt,
  }));
}

export function saveProject(project: KamerOntwerp): void {
  // Sync all aliases before saving
  const normalized = {
    ...project,
    naam: project.naam ?? project.name ?? "Mijn kamer",
    stijl: project.stijl ?? project.style ?? "Japandi",
    muurKleur: project.muurKleur ?? project.wallColor ?? "#f8f6f2",
    vloerKleur: project.vloerKleur ?? project.floorColor ?? "#c8a96e",
    meubels: project.meubels ?? project.furniture ?? [],
    aangemaakt: project.aangemaakt ?? project.createdAt ?? new Date().toISOString().split("T")[0],
    name: project.name ?? project.naam,
    style: project.style ?? project.stijl,
    wallColor: project.wallColor ?? project.muurKleur,
    floorColor: project.floorColor ?? project.vloerKleur,
    furniture: project.furniture ?? project.meubels,
    createdAt: project.createdAt ?? project.aangemaakt,
  };
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) projects[idx] = normalized;
  else projects.unshift(normalized);
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
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return idx < 0;
}

export function generateId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function saveRoomPhoto(projectId: string, dataUrl: string): void {
  localStorage.setItem(`renovision_foto_${projectId}`, dataUrl);
}

export function getRoomPhoto(projectId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`renovision_foto_${projectId}`);
}

export function deleteRoomPhoto(projectId: string): void {
  localStorage.removeItem(`renovision_foto_${projectId}`);
}

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
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
