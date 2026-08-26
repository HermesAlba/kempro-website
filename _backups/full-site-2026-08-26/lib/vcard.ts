export function buildKemproVCard(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Kempro;;;",
    "FN:Kempro",
    "ORG:Kempro",
    "TEL;TYPE=CELL,VOICE:+573104623473",
    "ADR;TYPE=WORK:;;Calle 7 Sur #42 - 70\\, Barrio El Poblado;Medellín;Antioquia;;Colombia",
    "EMAIL;TYPE=INTERNET:marketing@kemprocol.com",
    "END:VCARD",
  ];
  return lines.join("\r\n");
}
