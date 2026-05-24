const brandIcons: Record<string, string> = {
  "Vue.js": "vuedotjs",
  "React": "react",
  "Laravel": "laravel",
  "Leaflet": "leaflet",
  "Node.js": "nodedotjs",
  "Socket.IO": "socketdotio",
  "PostgreSQL": "postgresql",
  "Sequelize": "sequelize",
  "Twilio": "twilio",
  "WhatsApp": "whatsapp",
  "Android Studio": "androidstudio",
  "Google Calendar": "googlecalendar",
  "Expo": "expo",
};

const genericIcons: Record<string, string> = {
  "email": "email",
  "gps": "gps",
  "map": "map",
  "ai": "ai",
  "mobile": "mobile",
  "dashboard": "dashboard",
  "code": "code",
};

const genericMap: [string, string][] = [
  ["App Móvil", "mobile"],
  ["Mobile App", "mobile"],
  ["Dashboard Web", "dashboard"],
  ["Web Dashboard", "dashboard"],
  ["Servicios GPS", "gps"],
  ["GPS services", "gps"],
  ["GPS", "gps"],
  ["Mapas", "map"],
  ["Maps", "map"],
  ["Mapa", "map"],
  ["Servicios de correo", "email"],
  ["Email services", "email"],
  ["Correo", "email"],
  ["Servicios de IA", "ai"],
  ["AI services", "ai"],
  ["IA", "ai"],
];

export function getSkillIcon(skill: string): string | undefined {
  if (brandIcons[skill]) return `/icons/${brandIcons[skill]}.svg`;
  for (const [key, value] of Object.entries(brandIcons)) {
    if (skill.includes(key)) return `/icons/${value}.svg`;
  }
  for (const [pattern, icon] of genericMap) {
    if (skill.includes(pattern)) return `/icons/${icon}.svg`;
  }
  return undefined;
}
