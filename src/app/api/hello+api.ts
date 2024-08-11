export function GET() {
  return Response.json({ message: `Random math: ${Math.random()}` });
}
