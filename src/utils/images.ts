export function getProjectImagePath(projectId: string, filename?: string): string {
  if (filename) {
    return `/images/projects/${projectId}/${filename}`;
  }
  return `/images/projects/${projectId}/`;
}

export function getHeroImagePath(): string {
  return "/images/personal/photo.webp";
}

export function imageExists(_path: string): boolean {
  return false;
}
